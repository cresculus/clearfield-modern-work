import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

/**
 * Use bracket access so Next.js is less likely to inline a missing DATABASE_URL
 * at build time; Railway injects it at runtime on the server.
 */
function createPrisma() {
  const url = process.env["DATABASE_URL"];
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    ...(url ? { datasources: { db: { url } } } : {}),
  });
}

/** Reuse one client per Node worker (dev and production). */
export const prisma = globalForPrisma.prisma ?? createPrisma();
globalForPrisma.prisma = prisma;
