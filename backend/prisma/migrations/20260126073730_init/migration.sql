-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER', 'FREELANCER');

-- CreateEnum
CREATE TYPE "public"."FreelancerStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "phone" VARCHAR(15) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL,
    "passwordToken" VARCHAR(255),
    "passwordTokenExpirationDate" TIMESTAMP(3),
    "verificationToken" VARCHAR(255),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Token" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "ip" VARCHAR(255) NOT NULL,
    "userAgent" VARCHAR(255) NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Freelancer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "public"."FreelancerStatus" NOT NULL DEFAULT 'PENDING',
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "primaryProfessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Freelancer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FreelancerLocation" (
    "id" TEXT NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "accuracy" INTEGER,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FreelancerLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profession" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "professionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FreelancerSkill" (
    "id" TEXT NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FreelancerSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "budget" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,
    "freelancerId" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "website" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "verified_resend_domain" VARCHAR(55) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Token_refreshToken_key" ON "public"."Token"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Freelancer_userId_key" ON "public"."Freelancer"("userId");

-- CreateIndex
CREATE INDEX "FreelancerLocation_latitude_longitude_idx" ON "public"."FreelancerLocation"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "FreelancerLocation_freelancerId_recordedAt_idx" ON "public"."FreelancerLocation"("freelancerId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Profession_name_key" ON "public"."Profession"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_professionId_key" ON "public"."Skill"("name", "professionId");

-- CreateIndex
CREATE UNIQUE INDEX "FreelancerSkill_freelancerId_skillId_key" ON "public"."FreelancerSkill"("freelancerId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "public"."Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_website_key" ON "public"."Company"("website");

-- CreateIndex
CREATE UNIQUE INDEX "Company_phone_key" ON "public"."Company"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "public"."Company"("email");

-- AddForeignKey
ALTER TABLE "public"."Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Freelancer" ADD CONSTRAINT "Freelancer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Freelancer" ADD CONSTRAINT "Freelancer_primaryProfessionId_fkey" FOREIGN KEY ("primaryProfessionId") REFERENCES "public"."Profession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FreelancerLocation" ADD CONSTRAINT "FreelancerLocation_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "public"."Freelancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "public"."Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FreelancerSkill" ADD CONSTRAINT "FreelancerSkill_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "public"."Freelancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FreelancerSkill" ADD CONSTRAINT "FreelancerSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "public"."Freelancer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
