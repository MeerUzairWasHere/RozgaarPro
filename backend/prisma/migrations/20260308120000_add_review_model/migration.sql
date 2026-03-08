CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Review_userId_freelancerId_key" ON "public"."Review"("userId", "freelancerId");
CREATE INDEX "Review_freelancerId_createdAt_idx" ON "public"."Review"("freelancerId", "createdAt");
CREATE INDEX "Review_userId_idx" ON "public"."Review"("userId");

ALTER TABLE "public"."Review"
ADD CONSTRAINT "Review_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."Review"
ADD CONSTRAINT "Review_freelancerId_fkey"
FOREIGN KEY ("freelancerId") REFERENCES "public"."Freelancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."Review"
ADD CONSTRAINT "Review_rating_check" CHECK ("rating" >= 1 AND "rating" <= 5);
