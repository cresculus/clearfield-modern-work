import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";

export async function GET() {
  try {
    const user = await requireUser();
    const accountId = user.bookingAccountId;

    const [account, bookings, purchases, notes, packs] = await Promise.all([
      prisma.bookingAccount.findUniqueOrThrow({ where: { id: accountId } }),
      prisma.booking.findMany({
        where: { clientId: accountId },
        orderBy: [{ startsAt: "desc" }],
        take: 30,
      }),
      prisma.purchase.findMany({
        where: { bookingAccountId: accountId },
        include: { creditPack: true },
        orderBy: [{ createdAt: "desc" }],
        take: 30,
      }),
      prisma.sessionNote.findMany({
        where: { clientId: accountId },
        orderBy: [{ createdAt: "desc" }],
        include: {
          booking: {
            select: { id: true, startsAt: true, kind: true, status: true },
          },
        },
        take: 30,
      }),
      prisma.creditPack.findMany({
        where: { isActive: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
      }),
    ]);

    const now = Date.now();
    const upcomingBookings = bookings.filter((b) => b.startsAt.getTime() >= now);
    const paidPurchases = purchases.filter((p) => p.status === "PAID");
    const totalSpentCents = paidPurchases.reduce((sum, p) => sum + p.amountCents, 0);

    return NextResponse.json({
      generatedAt: new Date(now).toISOString(),
      account: {
        email: account.email,
        creditBalance: account.creditBalance,
      },
      stats: {
        meetingsBooked: bookings.length,
        meetingsUpcoming: upcomingBookings.length,
        invoices: purchases.length,
        totalSpentCents,
      },
      bookings: bookings.map((b) => ({
        id: b.id,
        startsAt: b.startsAt.toISOString(),
        endsAt: b.endsAt.toISOString(),
        kind: b.kind,
        status: b.status,
      })),
      notes: notes.map((n) => ({
        id: n.id,
        subject: n.subject,
        body: n.body,
        createdAt: n.createdAt.toISOString(),
        booking: n.booking
          ? {
              id: n.booking.id,
              startsAt: n.booking.startsAt.toISOString(),
              kind: n.booking.kind,
              status: n.booking.status,
            }
          : null,
      })),
      invoices: purchases.map((p) => ({
        id: p.id,
        createdAt: p.createdAt.toISOString(),
        status: p.status,
        amountCents: p.amountCents,
        creditsGranted: p.creditsGranted,
        quantity: p.quantity,
        packTitle: p.creditPack.title,
      })),
      packs: packs.map((p) => ({
        id: p.id,
        title: p.title,
        credits: p.credits,
        priceCents: p.priceCents,
      })),
    });
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    return prismaErrorResponse(e);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json()) as { subject?: string; body?: string; bookingId?: string };
    const text = typeof body.body === "string" ? body.body.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const bookingId = typeof body.bookingId === "string" ? body.bookingId.trim() : "";
    if (!text) {
      return NextResponse.json({ error: "Note body is required." }, { status: 400 });
    }

    let normalizedBookingId: string | null = null;
    if (bookingId) {
      const booking = await prisma.booking.findFirst({
        where: { id: bookingId, clientId: user.bookingAccountId },
        select: { id: true },
      });
      if (!booking) {
        return NextResponse.json({ error: "Booking not found for this account." }, { status: 404 });
      }
      normalizedBookingId = booking.id;
    }

    const note = await prisma.sessionNote.create({
      data: {
        clientId: user.bookingAccountId,
        bookingId: normalizedBookingId,
        subject: subject || null,
        body: text,
      },
    });

    return NextResponse.json({ ok: true, note });
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    return prismaErrorResponse(e);
  }
}
