import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";

const DEFAULT_PACKS = [
  { slug: "starter", title: "Starter pack", credits: 3, priceCents: 45000, displayOrder: 1 },
  { slug: "bench", title: "Bench pack", credits: 8, priceCents: 112000, displayOrder: 2 },
  { slug: "field", title: "Field pack", credits: 20, priceCents: 250000, displayOrder: 3 },
] as const;

export async function GET() {
  try {
    let packs = await prisma.creditPack.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });

    // Ensure first-time environments can buy credits immediately without running admin seed.
    if (packs.length === 0) {
      for (const pack of DEFAULT_PACKS) {
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

