-- Raise baseline credit-pack pricing to market-rate AI Agent Operator consulting.
-- Idempotent upsert by slug.

DO $$
BEGIN
  IF to_regclass('"CreditPack"') IS NOT NULL THEN
    INSERT INTO "CreditPack" ("id", "slug", "title", "credits", "priceCents", "isActive", "displayOrder", "createdAt", "updatedAt")
    VALUES
      (md5(random()::text || clock_timestamp()::text), 'starter', 'Starter pack', 3, 90000, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (md5(random()::text || clock_timestamp()::text), 'bench', 'Bench pack', 8, 224000, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (md5(random()::text || clock_timestamp()::text), 'field', 'Field pack', 20, 520000, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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
