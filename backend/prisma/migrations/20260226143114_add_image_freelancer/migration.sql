-- CreateTable
CREATE TABLE "public"."Image" (
    "id" TEXT NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "imageKey" VARCHAR(255) NOT NULL,
    "altText" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Image_freelancerId_createdAt_idx" ON "public"."Image"("freelancerId", "createdAt");

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "public"."Freelancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
