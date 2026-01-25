/*
  Warnings:

  - You are about to drop the column `ProfileApproved` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "ProfileApproved",
ADD COLUMN     "profileApproved" BOOLEAN NOT NULL DEFAULT false;
