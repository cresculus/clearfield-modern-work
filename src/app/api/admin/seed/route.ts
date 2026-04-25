import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";
import { hashPassword } from "@/lib/password";

/**
 * One-time bootstrap helper.
 * Protect by ADMIN_SEED_SECRET and run manually in production.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { secret?: string };
    const secret = process.env.ADMIN_SEED_SECRET;
    if (!secret || body.secret !== secret) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const defaults = [
      { slug: "starter", title: "Starter pack", credits: 3, priceCents: 45000, displayOrder: 1 },
      { slug: "bench", title: "Bench pack", credits: 8, priceCents: 112000, displayOrder: 2 },
      { slug: "field", title: "Field pack", credits: 20, priceCents: 250000, displayOrder: 3 },
    ];
    for (const p of defaults) {
      await prisma.creditPack.upsert({
        where: { slug: p.slug },
        update: p,
        create: p,
      });
    }

    const adminEmail = process.env.ADMIN_BOOTSTRAP_EMAIL?.toLowerCase();
    const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;
    if (adminEmail && adminPassword) {
      const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
      if (!existing) {
        const account = await prisma.bookingAccount.upsert({
          where: { email: adminEmail },
          update: {},
          create: { email: adminEmail, creditBalance: 0, emailOptIn: false },
        });
        await prisma.user.create({
          data: {
            email: adminEmail,
            passwordHash: await hashPassword(adminPassword),
            role: "ADMIN",
            bookingAccountId: account.id,
          },
        });
      }
    }
    return NextResponse.json({ ok: true, seededPacks: defaults.length, adminBootstrapped: Boolean(adminEmail && adminPassword) });
  } catch (e) {
    return prismaErrorResponse(e);
  }
}

