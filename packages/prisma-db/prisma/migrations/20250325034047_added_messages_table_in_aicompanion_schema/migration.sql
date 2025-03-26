-- CreateEnum
CREATE TYPE "aicompanion_schema"."Role" AS ENUM ('user', 'system');

-- CreateTable
CREATE TABLE "aicompanion_schema"."Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "role" "aicompanion_schema"."Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Message_companionId_idx" ON "aicompanion_schema"."Message"("companionId");

-- AddForeignKey
ALTER TABLE "aicompanion_schema"."Message" ADD CONSTRAINT "Message_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "aicompanion_schema"."Companion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
