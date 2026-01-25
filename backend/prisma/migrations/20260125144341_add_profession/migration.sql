-- 1. Add column as nullable
ALTER TABLE "public"."Skill"
ADD COLUMN "profession" VARCHAR(255);

-- 2. Backfill data skill-wise
UPDATE "public"."Skill" SET "profession" = 'Plumber'     WHERE "name" = 'Plumbing';
UPDATE "public"."Skill" SET "profession" = 'Electrician' WHERE "name" = 'Electrical';
UPDATE "public"."Skill" SET "profession" = 'Carpenter'   WHERE "name" = 'Carpentry';
UPDATE "public"."Skill" SET "profession" = 'Painter'     WHERE "name" = 'Painting';
UPDATE "public"."Skill" SET "profession" = 'Cleaner'     WHERE "name" = 'Cleaning';
UPDATE "public"."Skill" SET "profession" = 'Gardener'    WHERE "name" = 'Gardening';
UPDATE "public"."Skill" SET "profession" = 'Mason'       WHERE "name" = 'Masonry';

-- 3. Safety check (optional but recommended)
-- This ensures nothing stays NULL accidentally
UPDATE "public"."Skill"
SET "profession" = 'Unknown'
WHERE "profession" IS NULL;

-- 4. Enforce NOT NULL
ALTER TABLE "public"."Skill"
ALTER COLUMN "profession" SET NOT NULL;
