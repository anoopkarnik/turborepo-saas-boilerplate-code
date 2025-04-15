/*
  Warnings:

  - You are about to drop the column `thumbNail` on the `PhotoModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "photoai_schema"."PhotoModel" DROP COLUMN "thumbNail",
ADD COLUMN     "thumbnail" TEXT;
