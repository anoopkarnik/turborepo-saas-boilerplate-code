/*
  Warnings:

  - You are about to drop the column `creditsCost` on the `ExecutionPhase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "scrapeflow_schema"."ExecutionPhase" DROP COLUMN "creditsCost",
ADD COLUMN     "creditsConsumed" INTEGER;
