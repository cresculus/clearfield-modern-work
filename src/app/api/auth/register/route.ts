import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";
import { createSession } from "@/lib/auth";
import { hashPassword, validatePassword } from "@/lib/password";

function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; password?: string; fullName?: string; company?: string };
    const email = normalizeEmail(body.email);
    const password = typeof body.password === "string" ? body.password : "";
    if (!email) return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    const pwErr = validatePassword(password);
    if (pwErr) return NextResponse.json({ error: pwErr }, { status: 400 });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return NextResponse.json({ error: "Email already registered." }, { status: 409 });

    const passwordHash = await hashPassword(password);
    const bootstrapAdmin = process.env.ADMIN_BOOTSTRAP_EMAIL?.toLowerCase() === email;

    const user = await prisma.$transaction(async (tx) => {
      let account = await tx.bookingAccount.findUnique({ where: { email } });
      if (!account) {
        account = await tx.bookingAccount.create({
          data: {
            email,
            fullName: typeof body.fullName === "string" ? body.fullName.trim() || null : null,
            company: typeof body.company === "string" ? body.company.trim() || null : null,
            creditBalance: 1,
          },
        });
        await tx.creditLedger.create({
          data: { clientId: account.id, delta: 1, reason: "welcome_free_credit" },
        });
      }

      return tx.user.create({
        data: {
          email,
          passwordHash,
          role: bootstrapAdmin ? "ADMIN" : "USER",
          bookingAccountId: account.id,
        },
      });
    });

    await createSession(user.id, {
      ipAddress: req.headers.get("x-forwarded-for") ?? undefined,
      userAgent: req.headers.get("user-agent") ?? undefined,
    });

    return NextResponse.json({ ok: true, role: user.role });
  } catch (e) {
    return prismaErrorResponse(e);
  }
}

