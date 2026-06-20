import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyTokenSignature } from "@/lib/tokens";
import { getStorage } from "@/lib/storage";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { token: string } },
) {
  const rl = rateLimit(`download:${clientIp(req)}`, 60, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const token = params.token;

  // Cheap signature gate before any DB hit.
  if (!verifyTokenSignature(token)) {
    return NextResponse.json({ error: "Invalid token." }, { status: 403 });
  }

  const row = await prisma.downloadToken.findUnique({
    where: { token },
    include: { order: true },
  });

  if (!row) {
    return NextResponse.json({ error: "Unknown token." }, { status: 404 });
  }
  if (row.order.status !== "COMPLETED") {
    return NextResponse.json(
      { error: "This order is not complete." },
      { status: 403 },
    );
  }
  if (row.expiresAt.getTime() < Date.now()) {
    return NextResponse.json(
      { error: "This download link has expired. Contact support to re-issue it." },
      { status: 410 },
    );
  }
  if (row.downloadCount >= row.maxDownloads) {
    return NextResponse.json(
      { error: "Download limit reached for this link." },
      { status: 403 },
    );
  }

  // Mint a fresh short-TTL signed URL each time; never expose a permanent URL.
  let signedUrl: string;
  try {
    signedUrl = await getStorage().getSignedDownloadUrl(row.fileKey, 60);
  } catch (err) {
    console.error("signing error:", err);
    return NextResponse.json(
      { error: "Could not prepare the download right now." },
      { status: 502 },
    );
  }

  // Count the download only once we have a URL to hand back.
  await prisma.downloadToken.update({
    where: { id: row.id },
    data: { downloadCount: { increment: 1 } },
  });

  return NextResponse.redirect(signedUrl, 302);
}
