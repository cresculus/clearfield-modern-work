import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";
import { requireUser } from "@/lib/auth";

/**
 * MVP purchase route: creates a paid/manual purchase and grants credits instantly.
 * Replace with Stripe webhooks for production card processing.
 */
export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json()) as { packId?: string; quantity?: number };
    const packId = typeof body.packId === "string" ? body.packId : "";
    const quantity = Math.max(1, Math.min(50, Number(body.quantity ?? 1)));
    if (!packId) return NextResponse.json({ error: "packId required." }, { status: 400 });

    const pack = await prisma.creditPack.findUnique({ where: { id: packId } });
    if (!pack || !pack.isActive) return NextResponse.json({ error: "Pack not available." }, { status: 404 });

    const creditsGranted = pack.credits * quantity;
    const amountCents = pack.priceCents * quantity;

    const result = await prisma.$transaction(async (tx) => {
      const purchase = await tx.purchase.create({
        data: {
          bookingAccountId: user.bookingAccountId,
          userId: user.id,
          creditPackId: pack.id,
          quantity,
          creditsGranted,
          amountCents,
          status: "PAID",
          provider: "manual",
          notes: "MVP manual purchase route",
        },
      });
      const account = await tx.bookingAccount.update({
        where: { id: user.bookingAccountId },
        data: { creditBalance: { increment: creditsGranted } },
      });
      await tx.creditLedger.create({
        data: { clientId: user.bookingAccountId, delta: creditsGranted, reason: `purchase_${pack.slug}` },
      });
      return { purchase, account };
    });

    return NextResponse.json({
      ok: true,
      purchaseId: result.purchase.id,
      creditBalance: result.account.creditBalance,
      creditsGranted,
      amountCents,
    });
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    return prismaErrorResponse(e);
  }
}

