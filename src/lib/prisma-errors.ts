import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * Map Prisma failures to HTTP responses so deploy issues are visible without server logs.
 */
export function prismaErrorResponse(e: unknown, fallbackStatus = 500) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2021") {
      return NextResponse.json(
        {
          error:
            "Database tables are missing. Run migrations against this database (e.g. ensure `npm run build` runs `prisma migrate deploy` with DATABASE_URL at build time).",
          code: e.code,
        },
        { status: 503 },
      );
    }
  }

  if (e instanceof Prisma.PrismaClientInitializationError) {
    return NextResponse.json(
      {
        error: "Database connection failed. Check DATABASE_URL on the Railway service.",
        code: e.errorCode ?? "INIT",
      },
      { status: 503 },
    );
  }

  console.error(e);
  return NextResponse.json({ error: "Server error." }, { status: fallbackStatus });
}
