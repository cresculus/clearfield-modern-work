import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";

/** Railway / uptime checks: verifies DB connectivity and migrations applied. */
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return prismaErrorResponse(e);
  }
}
