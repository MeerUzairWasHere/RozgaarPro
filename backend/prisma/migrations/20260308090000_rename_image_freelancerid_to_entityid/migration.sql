ALTER TABLE "public"."Image" DROP CONSTRAINT IF EXISTS "Image_freelancerId_fkey";
DROP INDEX IF EXISTS "Image_freelancerId_createdAt_idx";

ALTER TABLE "public"."Image" RENAME COLUMN "freelancerId" TO "entityId";

CREATE INDEX "Image_entityId_createdAt_idx" ON "public"."Image"("entityId", "createdAt");

ALTER TABLE "public"."Image"
ADD CONSTRAINT "Image_entityId_fkey"
FOREIGN KEY ("entityId") REFERENCES "public"."Freelancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
