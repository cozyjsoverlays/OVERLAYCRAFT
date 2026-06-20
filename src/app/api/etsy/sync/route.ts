import { NextResponse } from "next/server";
import { isEtsyConfigured } from "@/lib/env";
import { runEtsySync } from "@/lib/etsy-sync";

export async function POST() {
  if (!isEtsyConfigured) {
    return NextResponse.json({ error: "Etsy not configured" }, { status: 503 });
  }
  try {
    const result = await runEtsySync();
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
