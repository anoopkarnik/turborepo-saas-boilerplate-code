/*
  Warnings:

  - You are about to drop the column `trialEmbedding` on the `SourceCodeEmbedding` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "github_schema"."SourceCodeEmbedding" DROP COLUMN "trialEmbedding";
