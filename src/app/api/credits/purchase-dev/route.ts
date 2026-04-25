import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";

const PACKS: Record<string, number> = {
  starter: 3,
  bench: 8,
  field: 20,
};

/**
 * Development / manual top-up when Stripe is not wired yet.
 * POST { "email", "pack": "starter" | "bench" | "field", "secret": "<DEV_PURCHASE_SECRET>" }
 */
export async function POST(req: Request) {
  try {
    const secret = process.env.DEV_PURCHASE_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "DEV_PURCHASE_SECRET is not configured." },
        { status: 503 },
      );
    }

    const body = (await req.json()) as {
      email?: string;
      pack?: string;
      secret?: string;
    };

    if (body.secret !== secret) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    const pack = body.pack ?? "";
    const delta = PACKS[pack];
    if (!delta) {
      return NextResponse.json(
        { error: `Unknown pack. Use one of: ${Object.keys(PACKS).join(", ")}.` },
        { status: 400 },
      );
    }

    const account = await prisma.bookingAccount.findUnique({ where: { email } });
    if (!account) {
      return NextResponse.json(
        { error: "Account not found — register with this email on the book flow first." },
        { status: 404 },
      );
    }

    const updated = await prisma.$transaction(async (tx) => {
      await tx.creditLedger.create({
        data: {
          clientId: account.id,
          delta,
          reason: `purchase_dev_${pack}`,
        },
      });
      return tx.bookingAccount.update({
        where: { id: account.id },
        data: { creditBalance: { increment: delta } },
      });
    });

    return NextResponse.json({
      email: updated.email,
      creditBalance: updated.creditBalance,
      added: delta,
    });
  } catch (e) {
    return prismaErrorResponse(e);
  }
}
