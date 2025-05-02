/*
  Warnings:

  - You are about to drop the column `filesReferences` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "github_schema"."Question" DROP COLUMN "filesReferences",
ADD COLUMN     "fileReferences" JSONB;
