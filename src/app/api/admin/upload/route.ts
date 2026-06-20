import { NextRequest, NextResponse } from "next/server";
import { getStorage } from "@/lib/storage";
import { z } from "zod";

const ALLOWED_TYPES = ["application/pdf", "application/zip"] as const;

const Query = z.object({
  key: z.string().min(1).max(200),
  contentType: z.enum(ALLOWED_TYPES).default("application/zip"),
});

// Returns a presigned PUT URL so the browser can upload directly to R2/S3.
export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);
  let q: z.infer<typeof Query>;
  try {
    q = Query.parse(params);
  } catch {
    return NextResponse.json({ error: "key is required" }, { status: 400 });
  }

  // Restrict upload keys to the packs/ prefix to prevent path traversal,
  // and to the supported deliverable extensions.
  if (!q.key.startsWith("packs/")) {
    return NextResponse.json({ error: "Key must start with packs/" }, { status: 400 });
  }
  if (!/\.(pdf|zip)$/i.test(q.key)) {
    return NextResponse.json({ error: "File must be .pdf or .zip" }, { status: 400 });
  }

  const uploadUrl = await getStorage().getSignedUploadUrl(q.key, q.contentType, 300);
  return NextResponse.json({ uploadUrl, key: q.key });
}
