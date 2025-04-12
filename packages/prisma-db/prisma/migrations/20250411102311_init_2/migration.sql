-- CreateTable
CREATE TABLE "boilerplate_schema"."JWKS" (
    "_id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JWKS_pkey" PRIMARY KEY ("_id")
);
