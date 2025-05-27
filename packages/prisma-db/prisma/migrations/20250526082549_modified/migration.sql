/*
  Warnings:

  - You are about to drop the column `gistId` on the `Issue` table. All the data in the column will be lost.
  - Added the required column `gist` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "github_schema"."Issue" DROP COLUMN "gistId",
ADD COLUMN     "gist" TEXT NOT NULL;
