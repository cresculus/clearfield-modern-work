import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const packs = await prisma.creditPack.findMany({ orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }] });
    return NextResponse.json({ packs });
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

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = (await req.json()) as {
      slug?: string;
      title?: string;
      credits?: number;
      priceCents?: number;
      displayOrder?: number;
    };
    const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const credits = Number(body.credits ?? 0);
    const priceCents = Number(body.priceCents ?? 0);
    const displayOrder = Number(body.displayOrder ?? 0);
    if (!slug || !title || credits <= 0 || priceCents < 0) {
      return NextResponse.json({ error: "slug, title, credits, priceCents required." }, { status: 400 });
    }

    const pack = await prisma.creditPack.upsert({
      where: { slug },
      update: { title, credits, priceCents, displayOrder, isActive: true },
      create: { slug, title, credits, priceCents, displayOrder, isActive: true },
    });
    return NextResponse.json({ ok: true, pack });
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

