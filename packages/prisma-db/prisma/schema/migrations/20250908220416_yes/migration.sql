/*
  Warnings:

  - The values [CANCELED] on the enum `AgentMeetingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "meetai_schema"."AgentMeetingStatus_new" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED', 'PROCESSING');
ALTER TABLE "meetai_schema"."Meetings" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "meetai_schema"."Meetings" ALTER COLUMN "status" TYPE "meetai_schema"."AgentMeetingStatus_new" USING ("status"::text::"meetai_schema"."AgentMeetingStatus_new");
ALTER TYPE "meetai_schema"."AgentMeetingStatus" RENAME TO "AgentMeetingStatus_old";
ALTER TYPE "meetai_schema"."AgentMeetingStatus_new" RENAME TO "AgentMeetingStatus";
DROP TYPE "meetai_schema"."AgentMeetingStatus_old";
ALTER TABLE "meetai_schema"."Meetings" ALTER COLUMN "status" SET DEFAULT 'UPCOMING';
COMMIT;
