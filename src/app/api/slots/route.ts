import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";
import { generateCandidateSlots } from "@/lib/slots";

export async function GET() {
  try {
    const taken = await prisma.booking.findMany({
      where: { status: "confirmed" },
      select: { startsAt: true },
    });
    const takenKeys = new Set(taken.map((t) => t.startsAt.toISOString()));
    const candidates = generateCandidateSlots(48);
    const slots = candidates
      .filter((d) => !takenKeys.has(d.toISOString()))
      .slice(0, 24)
      .map((d) => ({ startsAt: d.toISOString() }));

    return NextResponse.json({ slots });
  } catch (e) {
    return prismaErrorResponse(e);
  }
}
