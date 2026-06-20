import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Dev-only placeholder hit when STORAGE_* env vars are absent. The storage stub
 * points signed URLs here so the full purchase → download flow can be exercised
 * locally without real cloud storage. In production (storage configured) this
 * route is never reached.
 */
export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key") ?? "unknown";
  const body = [
    "CozyOverlays — placeholder download",
    "",
    `This stands in for the real .zip at storage key: ${key}`,
    "",
    "Configure STORAGE_ENDPOINT / STORAGE_BUCKET / STORAGE_ACCESS_KEY_ID /",
    "STORAGE_SECRET_ACCESS_KEY and upload your packs to serve real files.",
  ].join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${key.replace(/[^a-z0-9._-]/gi, "_")}.txt"`,
    },
  });
}
