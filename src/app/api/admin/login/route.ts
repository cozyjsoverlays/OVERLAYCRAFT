import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { verifyAdminPassword, createSessionToken, SESSION_COOKIE } from "@/lib/admin-auth";

const Body = z.object({ password: z.string().min(1) });

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  if (!rateLimit(`admin-login:${ip}`, 5, 15 * 60 * 1000).ok) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }

  let body: { password: string };
  try {
    body = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!verifyAdminPassword(body.password)) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60,
    path: "/",
  });
  return res;
}
