import { NextRequest, NextResponse } from "next/server";

// Dev-only stub: accepts any PUT and returns 200 so the upload UI can be
// exercised without real cloud storage credentials.
export async function PUT(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const key = req.nextUrl.searchParams.get("key") ?? "unknown";
  return new NextResponse(`Stub upload accepted for key: ${key}`, { status: 200 });
}
