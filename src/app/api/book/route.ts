import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { addSessionMinutes, generateCandidateSlots } from "@/lib/slots";

function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; startsAt?: string };
    const email = normalizeEmail(body.email);
    const startsAtRaw = body.startsAt;
    if (!email || typeof startsAtRaw !== "string") {
      return NextResponse.json({ error: "Email and startsAt required." }, { status: 400 });
    }

    const startsAt = new Date(startsAtRaw);
    if (Number.isNaN(startsAt.getTime())) {
      return NextResponse.json({ error: "Invalid time." }, { status: 400 });
    }

    const allowed = new Set(
      generateCandidateSlots(200).map((d) => d.toISOString()),
    );
    if (!allowed.has(startsAt.toISOString())) {
      return NextResponse.json({ error: "That slot is not offered." }, { status: 400 });
    }

    const client = await prisma.client.findUnique({ where: { email } });
    if (!client) {
      return NextResponse.json({ error: "Unknown email — start on the book page." }, { status: 400 });
    }
    if (client.creditBalance < 1) {
      return NextResponse.json(
        { error: "No credits left. Purchase a credit pack to continue." },
        { status: 402 },
      );
    }

    const endsAt = addSessionMinutes(startsAt);

    try {
      const result = await prisma.$transaction(async (tx) => {
        const fresh = await tx.client.findUnique({ where: { id: client.id } });
        if (!fresh || fresh.creditBalance < 1) {
          throw new Error("NO_CREDIT");
        }

        const priorCount = await tx.booking.count({
          where: { clientId: fresh.id, status: "confirmed" },
        });
        const kind = priorCount === 0 ? "intro" : "paid";

        const booking = await tx.booking.create({
          data: {
            clientId: fresh.id,
            startsAt,
            endsAt,
            kind,
            status: "confirmed",
          },
        });

        await tx.client.update({
          where: { id: fresh.id },
          data: { creditBalance: { decrement: 1 } },
        });

        await tx.creditLedger.create({
          data: {
            clientId: fresh.id,
            delta: -1,
            reason: "booking_session",
          },
        });

        return booking;
      });

      const updated = await prisma.client.findUniqueOrThrow({ where: { id: client.id } });

      return NextResponse.json({
        booking: {
          id: result.id,
          startsAt: result.startsAt.toISOString(),
          endsAt: result.endsAt.toISOString(),
          kind: result.kind,
        },
        creditBalance: updated.creditBalance,
      });
    } catch (e) {
      if (e instanceof Error && e.message === "NO_CREDIT") {
        return NextResponse.json({ error: "No credits left." }, { status: 402 });
      }
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        return NextResponse.json(
          { error: "That time was just taken. Pick another slot." },
          { status: 409 },
        );
      }
      throw e;
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
