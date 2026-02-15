-- CreateEnum
CREATE TYPE "public"."AvailabilityStatus" AS ENUM ('AVAILABLE', 'BUSY', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "public"."Freelancer" ADD COLUMN     "availability" "public"."AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE';
