import { NextResponse } from "next/server";
import crypto from "crypto";
import { env, isEtsyConfigured } from "@/lib/env";

export async function GET() {
  if (!isEtsyConfigured) {
    return NextResponse.json({ error: "Etsy not configured" }, { status: 503 });
  }

  const verifier = crypto.randomBytes(32).toString("base64url");
  const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: env.etsyClientId!,
    redirect_uri: env.etsyRedirectUri ?? `${env.siteUrl}/api/etsy/oauth/callback`,
    scope: env.etsyOauthScopes,
    state: crypto.randomBytes(16).toString("hex"),
    code_challenge: challenge,
    code_challenge_method: "S256",
  });

  const res = NextResponse.redirect(
    `https://www.etsy.com/oauth/connect?${params.toString()}`,
  );

  // Store verifier in a short-lived httpOnly cookie
  res.cookies.set("etsy-pkce-verifier", verifier, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 300, // 5 minutes
    path: "/",
  });

  return res;
}
