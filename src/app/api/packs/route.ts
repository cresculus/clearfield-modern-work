import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";
import { MARKET_RATE_PACKS } from "@/lib/agent-operator-offers";

export async function GET() {
  try {
    let packs = await prisma.creditPack.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });

    // Ensure first-time environments can buy credits immediately without running admin seed.
    if (packs.length === 0) {
      for (const pack of MARKET_RATE_PACKS) {
        await prisma.creditPack.upsert({
          where: { slug: pack.slug },
          update: pack,
          create: pack,
        });
      }
      packs = await prisma.creditPack.findMany({
        where: { isActive: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
      });
    }

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

