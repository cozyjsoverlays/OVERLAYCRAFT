import { NextRequest, NextResponse } from "next/server";
import { env, isEtsyConfigured } from "@/lib/env";
import { encrypt } from "@/lib/encrypt";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  if (!isEtsyConfigured) {
    return NextResponse.redirect(new URL("/admin/etsy?error=not_configured", req.url));
  }

  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    const msg = error ?? "missing_code";
    return NextResponse.redirect(new URL(`/admin/etsy?error=${msg}`, req.url));
  }

  const verifier = req.cookies.get("etsy-pkce-verifier")?.value;
  if (!verifier) {
    return NextResponse.redirect(new URL("/admin/etsy?error=missing_verifier", req.url));
  }

  // Exchange code for tokens
  const tokenRes = await fetch("https://api.etsy.com/v3/public/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: env.etsyClientId!,
      redirect_uri: env.etsyRedirectUri ?? `${env.siteUrl}/api/etsy/oauth/callback`,
      code,
      code_verifier: verifier,
    }),
  });

  if (!tokenRes.ok) {
    console.error("Etsy token exchange failed:", await tokenRes.text());
    return NextResponse.redirect(new URL("/admin/etsy?error=token_exchange", req.url));
  }

  const tokens = (await tokenRes.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };

  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

  // Upsert the single EtsyAuth row
  const existing = await prisma.etsyAuth.findFirst();
  if (existing) {
    await prisma.etsyAuth.update({
      where: { id: existing.id },
      data: {
        accessToken: encrypt(tokens.access_token),
        refreshToken: encrypt(tokens.refresh_token),
        accessTokenExpiresAt: expiresAt,
        shopId: env.etsyShopId!,
      },
    });
  } else {
    await prisma.etsyAuth.create({
      data: {
        accessToken: encrypt(tokens.access_token),
        refreshToken: encrypt(tokens.refresh_token),
        accessTokenExpiresAt: expiresAt,
        shopId: env.etsyShopId!,
      },
    });
  }

  const res = NextResponse.redirect(new URL("/admin/etsy?connected=1", req.url));
  res.cookies.set("etsy-pkce-verifier", "", { maxAge: 0, path: "/" });
  return res;
}
