import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getProductsBySlugs } from "@/lib/products";
import { captureOrder } from "@/lib/paypal";
import { payPalValueToCents } from "@/lib/money";
import { createDownloadToken } from "@/lib/tokens";
import { getEmailSender } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { env, isPayPalConfigured } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN_TTL_HOURS = 72;
const MAX_DOWNLOADS = 5;

const Body = z.object({
  paypalOrderId: z.string().min(1).max(64),
  items: z.array(z.object({ slug: z.string().min(1).max(120) })).min(1).max(50),
  email: z.string().email().max(254).optional(),
});

interface DownloadOut {
  name: string;
  url: string;
}

function downloadUrl(token: string): string {
  return `${env.siteUrl}/api/download/${token}`;
}

export async function POST(req: Request) {
  const rl = rateLimit(`capture:${clientIp(req)}`, 15, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }
  if (!isPayPalConfigured) {
    return NextResponse.json(
      { error: "Payments are not configured on the server." },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { paypalOrderId, items } = parsed.data;

  // ── Idempotency: if we've already fulfilled this PayPal order, return it. ──
  const existing = await prisma.order.findUnique({
    where: { paypalOrderId },
    include: { items: true, downloadTokens: true },
  });
  if (existing && existing.status === "COMPLETED") {
    const downloads: DownloadOut[] = existing.downloadTokens.map((t) => {
      const item = existing.items.find((i) => i.productId === t.productId);
      return { name: item?.nameSnapshot ?? "Your pack", url: downloadUrl(t.token) };
    });
    return NextResponse.json({
      orderId: existing.id,
      email: existing.email,
      downloads,
      alreadyFulfilled: true,
    });
  }

  // ── Recompute the authoritative total from the DB. ──
  const slugs = [...new Set(items.map((i) => i.slug))];
  const products = await getProductsBySlugs(slugs);
  if (products.length === 0) {
    return NextResponse.json({ error: "No valid items." }, { status: 400 });
  }
  const expectedCents = products.reduce((s, p) => s + p.priceCents, 0);
  const currency = products[0]!.currency;

  // ── Capture server-side. ──
  let capture;
  try {
    capture = await captureOrder(paypalOrderId);
  } catch (err) {
    console.error("capture error:", err);
    return NextResponse.json(
      { error: "Payment could not be captured." },
      { status: 502 },
    );
  }

  // ── Verify the payment is real, complete, and for the right amount. ──
  if (capture.status !== "COMPLETED") {
    return NextResponse.json(
      { error: `Payment not completed (status: ${capture.status}).` },
      { status: 402 },
    );
  }
  const capturedCents = capture.capturedValue
    ? payPalValueToCents(capture.capturedValue)
    : -1;
  if (capturedCents !== expectedCents) {
    console.error(
      `Amount mismatch for ${paypalOrderId}: captured ${capturedCents} vs expected ${expectedCents}`,
    );
    return NextResponse.json(
      { error: "Payment amount did not match the order. Contact support." },
      { status: 409 },
    );
  }
  if (capture.currency && capture.currency !== currency) {
    return NextResponse.json(
      { error: "Currency mismatch." },
      { status: 409 },
    );
  }

  const email = parsed.data.email ?? capture.payerEmail;
  if (!email) {
    return NextResponse.json(
      { error: "No email available to deliver the download." },
      { status: 400 },
    );
  }

  const expiresAt = new Date(Date.now() + TOKEN_TTL_HOURS * 3600 * 1000);

  // ── Persist order + items + one download token per product. ──
  const tokensByProduct = products.map((p) => ({
    product: p,
    token: createDownloadToken().token,
  }));

  const order = await prisma.order.create({
    data: {
      paypalOrderId,
      captureId: capture.captureId ?? null,
      email,
      payerName: capture.payerName ?? null,
      amountCents: expectedCents,
      currency,
      status: "COMPLETED",
      items: {
        create: products.map((p) => ({
          productId: p.id,
          nameSnapshot: p.name,
          priceCents: p.priceCents,
        })),
      },
      downloadTokens: {
        create: tokensByProduct.map(({ product, token }) => ({
          token,
          productId: product.id,
          fileKey: product.fileKey,
          expiresAt,
          maxDownloads: MAX_DOWNLOADS,
        })),
      },
    },
  });

  const downloads: DownloadOut[] = tokensByProduct.map(({ product, token }) => ({
    name: product.name,
    url: downloadUrl(token),
  }));

  // ── Deliver by email (best-effort; the success page also shows the links). ──
  try {
    await getEmailSender().sendDownloadEmail({
      to: email,
      orderId: order.id,
      items: tokensByProduct.map(({ product, token }) => ({
        name: product.name,
        priceCents: product.priceCents,
        downloadUrl: downloadUrl(token),
      })),
      expiresInHours: TOKEN_TTL_HOURS,
    });
  } catch (err) {
    console.error("email send failed (order still fulfilled):", err);
  }

  return NextResponse.json({ orderId: order.id, email, downloads });
}
