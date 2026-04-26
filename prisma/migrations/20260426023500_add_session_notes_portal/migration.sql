-- Add session notes for customer-facing dashboard.
-- Idempotent and safe on partially migrated databases.

CREATE TABLE IF NOT EXISTS "SessionNote" (
  "id" TEXT NOT NULL,
  "clientId" TEXT NOT NULL,
  "bookingId" TEXT,
  "subject" TEXT,
  "body" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SessionNote_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "SessionNote_clientId_createdAt_idx"
  ON "SessionNote"("clientId", "createdAt");
CREATE INDEX IF NOT EXISTS "SessionNote_bookingId_idx"
  ON "SessionNote"("bookingId");

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SessionNote_clientId_fkey') THEN
    ALTER TABLE "SessionNote" ADD CONSTRAINT "SessionNote_clientId_fkey"
      FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SessionNote_bookingId_fkey') THEN
    ALTER TABLE "SessionNote" ADD CONSTRAINT "SessionNote_bookingId_fkey"
      FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
