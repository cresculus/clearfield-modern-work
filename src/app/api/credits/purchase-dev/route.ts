import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const client = await prisma.client.findUnique({ where: { email } });
    if (!client) {
      return NextResponse.json(
        { error: "Client not found — book once with this email first." },
        { status: 404 },
      );
    }

    const updated = await prisma.$transaction(async (tx) => {
      await tx.creditLedger.create({
        data: {
          clientId: client.id,
          delta,
          reason: `purchase_dev_${pack}`,
        },
      });
      return tx.client.update({
        where: { id: client.id },
        data: { creditBalance: { increment: delta } },
      });
    });

    return NextResponse.json({
      email: updated.email,
      creditBalance: updated.creditBalance,
      added: delta,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
