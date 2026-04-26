import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";

export async function GET() {
  try {
    const user = await requireUser();
    const customers = await prisma.customerProfile.findMany({
      where: { ownerUserId: user.id },
      orderBy: [{ updatedAt: "desc" }],
      include: {
        activities: {
          orderBy: [{ occurredAt: "desc" }],
          take: 5,
        },
      },
    });
    return NextResponse.json({ customers });
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
    const body = (await req.json()) as {
      fullName?: string;
      email?: string;
      company?: string;
      status?: string;
      consultedAt?: string | null;
      nextFollowUpAt?: string | null;
    };

    const fullName = body.fullName?.trim();
    if (!fullName) {
      return NextResponse.json({ error: "fullName is required." }, { status: 400 });
    }

    const created = await prisma.customerProfile.create({
      data: {
        ownerUserId: user.id,
        fullName,
        email: body.email?.trim() || null,
        company: body.company?.trim() || null,
        status: body.status?.trim() || "lead",
        consultedAt: body.consultedAt ? new Date(body.consultedAt) : null,
        nextFollowUpAt: body.nextFollowUpAt ? new Date(body.nextFollowUpAt) : null,
      },
    });
    return NextResponse.json({ ok: true, customer: created });
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    return prismaErrorResponse(e);
  }
}
