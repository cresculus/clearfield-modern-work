-- Seed default credit packs for environments where admin seed was never run.
-- Idempotent: safe to run multiple times.

DO $$
BEGIN
  IF to_regclass('"CreditPack"') IS NOT NULL THEN
    INSERT INTO "CreditPack" ("id", "slug", "title", "credits", "priceCents", "isActive", "displayOrder", "createdAt", "updatedAt")
    VALUES
      (md5(random()::text || clock_timestamp()::text), 'starter', 'Starter pack', 3, 45000, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (md5(random()::text || clock_timestamp()::text), 'bench', 'Bench pack', 8, 112000, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (md5(random()::text || clock_timestamp()::text), 'field', 'Field pack', 20, 250000, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT ("slug") DO UPDATE
      SET
        "title" = EXCLUDED."title",
        "credits" = EXCLUDED."credits",
        "priceCents" = EXCLUDED."priceCents",
        "isActive" = EXCLUDED."isActive",
        "displayOrder" = EXCLUDED."displayOrder",
        "updatedAt" = CURRENT_TIMESTAMP;
  END IF;
END $$;
