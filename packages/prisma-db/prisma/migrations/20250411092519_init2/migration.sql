/*
  Warnings:

  - You are about to drop the column `deuserAgent` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `ResetPasswordToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "boilerplate_schema"."Session" DROP COLUMN "deuserAgent",
ADD COLUMN     "userAgent" TEXT;

-- DropTable
DROP TABLE "boilerplate_schema"."ResetPasswordToken";

-- DropTable
DROP TABLE "boilerplate_schema"."VerificationToken";

-- CreateTable
CREATE TABLE "boilerplate_schema"."Verification" (
    "_id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("_id")
);
