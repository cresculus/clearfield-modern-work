import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";

function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

/** Create-or-fetch account; new emails receive one welcome credit. */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string };
    const email = normalizeEmail(body.email);
    if (!email) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    const existing = await prisma.bookingAccount.findUnique({ where: { email } });
    if (existing) {
      const bookings = await prisma.booking.findMany({
        where: { clientId: existing.id, status: "confirmed" },
        orderBy: { startsAt: "asc" },
        take: 25,
      });
      return NextResponse.json({
        email: existing.email,
        creditBalance: existing.creditBalance,
        isNew: false,
        bookings: bookings.map((b) => ({
          id: b.id,
          startsAt: b.startsAt.toISOString(),
          endsAt: b.endsAt.toISOString(),
          kind: b.kind,
        })),
      });
    }

    const account = await prisma.$transaction(async (tx) => {
      const a = await tx.bookingAccount.create({
        data: {
          email,
          creditBalance: 1,
        },
      });
      await tx.creditLedger.create({
        data: {
          clientId: a.id,
          delta: 1,
          reason: "welcome_free_credit",
        },
      });
      return a;
    });

    return NextResponse.json({
      email: account.email,
      creditBalance: account.creditBalance,
      isNew: true,
      bookings: [] as const,
    });
  } catch (e) {
    return prismaErrorResponse(e);
  }
}
