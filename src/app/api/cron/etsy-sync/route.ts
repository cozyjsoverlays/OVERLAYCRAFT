import { NextRequest, NextResponse } from "next/server";
import { isEtsyConfigured } from "@/lib/env";
import { runEtsySync } from "@/lib/etsy-sync";

// Vercel Cron calls this with Authorization: Bearer <CRON_SECRET>
// vercel.json: { "crons": [{ "path": "/api/cron/etsy-sync", "schedule": "0 6 * * *" }] }
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");

  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isEtsyConfigured) {
    return NextResponse.json({ skipped: true, reason: "Etsy not configured" });
  }

  try {
    const result = await runEtsySync();
    return NextResponse.json({ cron: true, ...result });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ cron: true, error: message }, { status: 500 });
  }
}
