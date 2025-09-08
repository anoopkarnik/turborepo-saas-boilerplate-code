-- CreateEnum
CREATE TYPE "meetai_schema"."AgentMeetingStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELED', 'PROCESSING');

-- CreateTable
CREATE TABLE "meetai_schema"."Meetings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "meetai_schema"."AgentMeetingStatus" NOT NULL DEFAULT 'UPCOMING',
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,

    CONSTRAINT "Meetings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "meetai_schema"."Meetings" ADD CONSTRAINT "Meetings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "boilerplate_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetai_schema"."Meetings" ADD CONSTRAINT "Meetings_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "meetai_schema"."Agents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
