import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";

function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; fullName?: string; source?: string };
    const email = normalizeEmail(body.email);
    if (!email) return NextResponse.json({ error: "Valid email required." }, { status: 400 });

    const row = await prisma.emailSubscriber.upsert({
      where: { email },
      update: {
        fullName: typeof body.fullName === "string" ? body.fullName.trim() || null : null,
        unsubscribedAt: null,
      },
      create: {
        email,
        fullName: typeof body.fullName === "string" ? body.fullName.trim() || null : null,
        source: typeof body.source === "string" && body.source.trim() ? body.source.trim() : "site",
      },
    });
    return NextResponse.json({ ok: true, id: row.id });
  } catch (e) {
    return prismaErrorResponse(e);
  }
}

