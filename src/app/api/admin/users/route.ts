import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";

export async function GET() {
  try {
    await requireAdmin();
    const users = await prisma.user.findMany({
      orderBy: [{ createdAt: "desc" }],
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        isActive: true,
      },
    });
    return NextResponse.json({ users });
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

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = (await req.json()) as { email?: string; role?: "USER" | "ADMIN" };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const role = body.role === "ADMIN" ? "ADMIN" : "USER";
    if (!email) {
      return NextResponse.json({ error: "email required." }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) {
      return NextResponse.json({ error: "User not found for that email." }, { status: 404 });
    }
    const updated = await prisma.user.update({
      where: { id: existing.id },
      data: { role },
      select: { id: true, email: true, role: true, createdAt: true, isActive: true },
    });
    return NextResponse.json({ ok: true, user: updated });
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
