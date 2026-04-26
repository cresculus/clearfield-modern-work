import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";
import { MARKET_RATE_PACKS } from "@/lib/agent-operator-offers";

export async function POST() {
  try {
    await requireAdmin();

    const results = [];
    for (const pack of MARKET_RATE_PACKS) {
      const updated = await prisma.creditPack.upsert({
        where: { slug: pack.slug },
        update: { ...pack, isActive: true },
        create: { ...pack, isActive: true },
      });
      results.push(updated);
    }

    return NextResponse.json({ ok: true, packs: results });
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }
    return prismaErrorResponse(e);
  }
}
