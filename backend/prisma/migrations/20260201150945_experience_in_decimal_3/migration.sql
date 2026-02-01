/*
  Warnings:

  - You are about to alter the column `experience` on the `Freelancer` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(4,1)`.

*/
-- AlterTable
ALTER TABLE "public"."Freelancer" ALTER COLUMN "experience" SET DATA TYPE DECIMAL(4,1);
