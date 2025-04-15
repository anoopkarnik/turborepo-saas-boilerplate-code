/*
  Warnings:

  - You are about to drop the `JWKS` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "boilerplate_schema"."JWKS";

-- CreateTable
CREATE TABLE "boilerplate_schema"."jwks" (
    "_id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jwks_pkey" PRIMARY KEY ("_id")
);
