import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";

export async function GET() {
  try {
    const packs = await prisma.creditPack.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json({
      packs: packs.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        credits: p.credits,
        priceCents: p.priceCents,
      })),
    });
  } catch (e) {
    return prismaErrorResponse(e);
  }
}

