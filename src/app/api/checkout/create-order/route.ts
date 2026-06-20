import { NextResponse } from "next/server";
import { z } from "zod";
import { getProductsBySlugs } from "@/lib/products";
import { createOrder } from "@/lib/paypal";
import { centsToPayPalValue } from "@/lib/money";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { isPayPalConfigured } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  items: z
    .array(z.object({ slug: z.string().min(1).max(120) }))
    .min(1)
    .max(50),
});

export async function POST(req: Request) {
  const rl = rateLimit(`create-order:${clientIp(req)}`, 20, 60_000);
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

  // Dedupe slugs — digital goods are quantity 1 each.
  const slugs = [...new Set(parsed.data.items.map((i) => i.slug))];

  // SOURCE OF TRUTH: prices come from the DB, never from the client.
  const products = await getProductsBySlugs(slugs);
  if (products.length === 0) {
    return NextResponse.json(
      { error: "None of those items are available." },
      { status: 400 },
    );
  }

  const currency = products[0]!.currency;
  const totalCents = products.reduce((sum, p) => sum + p.priceCents, 0);

  try {
    const order = await createOrder({
      totalValue: centsToPayPalValue(totalCents),
      currency,
      items: products.map((p) => ({
        name: p.name,
        unitAmount: centsToPayPalValue(p.priceCents),
        quantity: 1,
        sku: p.slug,
      })),
    });
    return NextResponse.json({ id: order.id });
  } catch (err) {
    console.error("create-order error:", err);
    return NextResponse.json(
      { error: "Could not create the PayPal order." },
      { status: 502 },
    );
  }
}
