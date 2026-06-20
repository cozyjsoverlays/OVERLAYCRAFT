import crypto from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "cozy-admin";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function getSecret(): string {
  return (
    process.env.SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "dev-session-secret"
  );
}

export function createSessionToken(): string {
  const payload = String(Date.now());
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string): boolean {
  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  try {
    if (
      !crypto.timingSafeEqual(
        Buffer.from(sig, "base64url"),
        Buffer.from(expected, "base64url"),
      )
    ) {
      return false;
    }
  } catch {
    return false;
  }

  const issued = parseInt(payload, 10);
  if (isNaN(issued) || Date.now() - issued > SESSION_TTL_MS) return false;
  return true;
}

/** Server-component helper: returns true when a valid session cookie is present. */
export function getAdminSession(): boolean {
  try {
    const token = cookies().get(SESSION_COOKIE)?.value;
    if (!token) return false;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const adminPw = process.env.ADMIN_PASSWORD ?? "";
  if (!adminPw) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(password), Buffer.from(adminPw));
  } catch {
    return false;
  }
}
