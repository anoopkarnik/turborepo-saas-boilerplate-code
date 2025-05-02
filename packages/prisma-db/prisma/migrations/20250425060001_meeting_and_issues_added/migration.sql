-- CreateEnum
CREATE TYPE "github_schema"."MeetingStatus" AS ENUM ('PROCESSING', 'COMPLETED');

-- CreateTable
CREATE TABLE "github_schema"."Meeting" (
    "_id" TEXT NOT NULL,
    "meetingUrl" TEXT NOT NULL,
    "status" "github_schema"."MeetingStatus" NOT NULL DEFAULT 'PROCESSING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "github_schema"."Issue" (
    "_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "gistId" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "github_schema"."Meeting" ADD CONSTRAINT "Meeting_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "github_schema"."GithubProject"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "github_schema"."Issue" ADD CONSTRAINT "Issue_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "github_schema"."Meeting"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
