import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const [accounts, users, bookings, subscribers, purchases] = await Promise.all([
      prisma.bookingAccount.count(),
      prisma.user.count(),
      prisma.booking.count(),
      prisma.emailSubscriber.count({ where: { unsubscribedAt: null } }),
      prisma.purchase.count({ where: { status: "PAID" } }),
    ]);
    return NextResponse.json({ accounts, users, bookings, subscribers, purchases });
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

