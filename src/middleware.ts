import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "cozy-admin";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

async function verifySessionToken(token: string, secret: string): Promise<boolean> {
  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    // base64url → Uint8Array
    const sigBytes = Uint8Array.from(
      atob(sig.replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0),
    );
    const valid = await crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(payload));
    if (!valid) return false;

    const issued = parseInt(payload, 10);
    if (isNaN(issued) || Date.now() - issued > SESSION_TTL_MS) return false;
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin") || pathname.startsWith("/api/etsy");
  const isCronApi = pathname.startsWith("/api/cron");

  // Endpoints that must be reachable WITHOUT a session (they establish/clear it).
  const isPublicAuthRoute =
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout";

  if (!isAdminPage && !isAdminApi) return NextResponse.next();
  if (isPublicAuthRoute || isCronApi) return NextResponse.next();

  const secret =
    process.env.SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "dev-session-secret";
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  const authed = token ? await verifySessionToken(token, secret) : false;

  if (!authed) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/etsy/:path*", "/api/cron/:path*"],
};
