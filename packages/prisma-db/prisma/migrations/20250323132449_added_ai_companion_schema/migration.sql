-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "aicompanion_schema";

-- CreateTable
CREATE TABLE "aicompanion_schema"."Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
