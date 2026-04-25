import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "cf_session";
const SESSION_TTL_DAYS = 30;
export const OWNER_ADMIN_EMAIL = "brandon.sardelli@gmail.com";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function createSession(userId: string, meta?: { ipAddress?: string; userAgent?: string }) {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = sha256(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  await prisma.userSession.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      ipAddress: meta?.ipAddress,
      userAgent: meta?.userAgent,
    },
  });

  const c = await cookies();
  c.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearSession() {
  const c = await cookies();
  const token = c.get(COOKIE_NAME)?.value;
  if (token) {
    await prisma.userSession.updateMany({
      where: { tokenHash: sha256(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
  c.delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const c = await cookies();
  const token = c.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await prisma.userSession.findUnique({
    where: { tokenHash: sha256(token) },
    include: { user: { include: { account: true } } },
  });
  if (!session || session.revokedAt || session.expiresAt.getTime() < Date.now()) return null;
  if (!session.user.isActive) return null;

  return session.user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  const isOwner = user.email.toLowerCase() === OWNER_ADMIN_EMAIL;
  if (!isOwner) throw new Error("FORBIDDEN");
  return user;
}

export function isOwnerEmail(email: string) {
  return email.trim().toLowerCase() === OWNER_ADMIN_EMAIL;
}

