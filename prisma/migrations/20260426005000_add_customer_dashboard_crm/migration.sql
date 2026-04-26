-- Add CRM-style customer dashboard tables.
-- Idempotent and safe for partial migration states.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'CustomerActivityType') THEN
    CREATE TYPE "CustomerActivityType" AS ENUM ('NOTE', 'CONVERSATION', 'MEETING');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "CustomerProfile" (
  "id" TEXT NOT NULL,
  "ownerUserId" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT,
  "company" TEXT,
  "status" TEXT NOT NULL DEFAULT 'lead',
  "consultedAt" TIMESTAMP(3),
  "nextFollowUpAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CustomerProfile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "CustomerActivity" (
  "id" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "type" "CustomerActivityType" NOT NULL DEFAULT 'NOTE',
  "subject" TEXT,
  "body" TEXT NOT NULL,
  "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CustomerActivity_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "CustomerProfile_ownerUserId_createdAt_idx"
  ON "CustomerProfile"("ownerUserId", "createdAt");
CREATE INDEX IF NOT EXISTS "CustomerActivity_customerId_occurredAt_idx"
  ON "CustomerActivity"("customerId", "occurredAt");

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CustomerProfile_ownerUserId_fkey') THEN
    ALTER TABLE "CustomerProfile" ADD CONSTRAINT "CustomerProfile_ownerUserId_fkey"
      FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CustomerActivity_customerId_fkey') THEN
    ALTER TABLE "CustomerActivity" ADD CONSTRAINT "CustomerActivity_customerId_fkey"
      FOREIGN KEY ("customerId") REFERENCES "CustomerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
