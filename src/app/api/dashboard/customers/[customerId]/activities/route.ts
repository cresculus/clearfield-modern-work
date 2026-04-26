import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { prismaErrorResponse } from "@/lib/prisma-errors";

type Params = { params: Promise<{ customerId: string }> };

export async function POST(req: Request, { params }: Params) {
  try {
    const user = await requireUser();
    const { customerId } = await params;
    const body = (await req.json()) as {
      type?: "NOTE" | "CONVERSATION" | "MEETING";
      subject?: string;
      body?: string;
      occurredAt?: string;
    };

    const customer = await prisma.customerProfile.findFirst({
      where: { id: customerId, ownerUserId: user.id },
    });
    if (!customer) {
      return NextResponse.json({ error: "Customer not found." }, { status: 404 });
    }

    const activityBody = body.body?.trim();
    if (!activityBody) {
      return NextResponse.json({ error: "Activity body is required." }, { status: 400 });
    }

    const created = await prisma.customerActivity.create({
      data: {
        customerId,
        type: body.type ?? "NOTE",
        subject: body.subject?.trim() || null,
        body: activityBody,
        occurredAt: body.occurredAt ? new Date(body.occurredAt) : new Date(),
      },
    });

    return NextResponse.json({ ok: true, activity: created });
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    return prismaErrorResponse(e);
  }
}
