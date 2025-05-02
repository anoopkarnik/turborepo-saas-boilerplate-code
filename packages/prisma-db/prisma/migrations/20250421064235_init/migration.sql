-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "aicompanion_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "boilerplate_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "github_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "photoai_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "scrapeflow_schema";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateEnum
CREATE TYPE "aicompanion_schema"."Role" AS ENUM ('user', 'system');

-- CreateEnum
CREATE TYPE "boilerplate_schema"."AccountAccess" AS ENUM ('TRIAL', 'PRO', 'ENTERPRISE', 'UNLIMITED');

-- CreateEnum
CREATE TYPE "photoai_schema"."ModelyTypeEnum" AS ENUM ('Man', 'Woman', 'Others');

-- CreateEnum
CREATE TYPE "photoai_schema"."EthnicityEnum" AS ENUM ('White', 'Black', 'Asian_American', 'East_Asian', 'South_East_Asian', 'South_Asian', 'Middle_Eastern', 'Pacific_Islander', 'Hispanic');

-- CreateEnum
CREATE TYPE "photoai_schema"."EyeColorEnum" AS ENUM ('Brown', 'Blue', 'Gray', 'Hazel');

-- CreateEnum
CREATE TYPE "photoai_schema"."ModelTrainingStatusEnum" AS ENUM ('Pending', 'Generated', 'Failed');

-- CreateEnum
CREATE TYPE "photoai_schema"."OutputStatusEnum" AS ENUM ('Pending', 'Generated', 'Failed');

-- CreateTable
CREATE TABLE "aicompanion_schema"."Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aicompanion_schema"."Companion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "seed" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Companion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aicompanion_schema"."Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "role" "aicompanion_schema"."Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boilerplate_schema"."User" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "bannedReason" TEXT,
    "banExpires" INTEGER,
    "access" "boilerplate_schema"."AccountAccess" NOT NULL DEFAULT 'TRIAL',
    "creditsUsed" INTEGER NOT NULL DEFAULT 0,
    "creditsTotal" INTEGER NOT NULL DEFAULT 20,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "boilerplate_schema"."Account" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "idToken" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "boilerplate_schema"."Session" (
    "_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "impersonatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "boilerplate_schema"."Verification" (
    "_id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "boilerplate_schema"."jwks" (
    "_id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jwks_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "boilerplate_schema"."Connection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'New Connection',
    "description" TEXT,
    "connection" TEXT,
    "type" TEXT NOT NULL,
    "details" TEXT NOT NULL DEFAULT '{}',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boilerplate_schema"."Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "href" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boilerplate_schema"."UserFinancial" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFinancial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boilerplate_schema"."UserPurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "github_schema"."GithubProject" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubProject_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "github_schema"."UserToGithubProject" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "githubProjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserToGithubProject_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "github_schema"."GithubCommit" (
    "_id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "commitMessage" TEXT NOT NULL,
    "commitHash" TEXT NOT NULL,
    "commitAuthorName" TEXT NOT NULL,
    "commitAuthorAvatar" TEXT NOT NULL,
    "commitDate" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubCommit_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "github_schema"."SourceCodeEmbedding" (
    "_id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "summaryEmbedding" vector(768),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourceCodeEmbedding_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "photoai_schema"."PhotoAIUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhotoAIUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photoai_schema"."PhotoModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "photoai_schema"."ModelyTypeEnum" NOT NULL,
    "age" INTEGER NOT NULL,
    "ethnicity" "photoai_schema"."EthnicityEnum" NOT NULL,
    "eyeColor" "photoai_schema"."EyeColorEnum" NOT NULL,
    "bald" BOOLEAN NOT NULL,
    "thumbnail" TEXT,
    "triggerWord" TEXT,
    "tensorPath" TEXT,
    "trainingStatus" "photoai_schema"."ModelTrainingStatusEnum" NOT NULL DEFAULT 'Pending',
    "falAiRequestId" TEXT,
    "zipUrl" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhotoModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photoai_schema"."OutputImages" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "status" "photoai_schema"."OutputStatusEnum" NOT NULL DEFAULT 'Pending',
    "falAiRequestId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutputImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photoai_schema"."Packs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "imageUrl1" TEXT NOT NULL DEFAULT '',
    "imageUrl2" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Packs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photoai_schema"."PackPrompts" (
    "id" TEXT NOT NULL,
    "packId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "PackPrompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scrapeflow_schema"."Workflow" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "definition" TEXT NOT NULL,
    "executionPlan" TEXT,
    "creditsCost" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "cron" TEXT,
    "lastRunAt" TIMESTAMP(3),
    "lastRunId" TEXT,
    "lastRunStatus" TEXT,
    "nextRunAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scrapeflow_schema"."WorkflowExecution" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "definition" TEXT NOT NULL DEFAULT '{}',
    "creditsConsumed" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WorkflowExecution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scrapeflow_schema"."ExecutionPhase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "node" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "inputs" TEXT,
    "outputs" TEXT,
    "creditsConsumed" INTEGER,
    "workflowExecutionId" TEXT NOT NULL,

    CONSTRAINT "ExecutionPhase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scrapeflow_schema"."ExecutionLog" (
    "id" TEXT NOT NULL,
    "logLevel" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "executionPhaseId" TEXT NOT NULL,

    CONSTRAINT "ExecutionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Companion_categoryId_idx" ON "aicompanion_schema"."Companion"("categoryId");

-- CreateIndex
CREATE INDEX "Message_companionId_idx" ON "aicompanion_schema"."Message"("companionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "boilerplate_schema"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Connection_userId_name_key" ON "boilerplate_schema"."Connection"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "UserFinancial_userId_key" ON "boilerplate_schema"."UserFinancial"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserToGithubProject_userId_githubProjectId_key" ON "github_schema"."UserToGithubProject"("userId", "githubProjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_userId_name_key" ON "scrapeflow_schema"."Workflow"("userId", "name");

-- AddForeignKey
ALTER TABLE "aicompanion_schema"."Companion" ADD CONSTRAINT "Companion_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "aicompanion_schema"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aicompanion_schema"."Message" ADD CONSTRAINT "Message_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "aicompanion_schema"."Companion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boilerplate_schema"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "boilerplate_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boilerplate_schema"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "boilerplate_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boilerplate_schema"."Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "boilerplate_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boilerplate_schema"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "boilerplate_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "github_schema"."UserToGithubProject" ADD CONSTRAINT "UserToGithubProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "boilerplate_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "github_schema"."UserToGithubProject" ADD CONSTRAINT "UserToGithubProject_githubProjectId_fkey" FOREIGN KEY ("githubProjectId") REFERENCES "github_schema"."GithubProject"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "github_schema"."GithubCommit" ADD CONSTRAINT "GithubCommit_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "github_schema"."GithubProject"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "github_schema"."SourceCodeEmbedding" ADD CONSTRAINT "SourceCodeEmbedding_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "github_schema"."GithubProject"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photoai_schema"."OutputImages" ADD CONSTRAINT "OutputImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "photoai_schema"."PhotoModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photoai_schema"."PackPrompts" ADD CONSTRAINT "PackPrompts_packId_fkey" FOREIGN KEY ("packId") REFERENCES "photoai_schema"."Packs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scrapeflow_schema"."Workflow" ADD CONSTRAINT "Workflow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "boilerplate_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scrapeflow_schema"."WorkflowExecution" ADD CONSTRAINT "WorkflowExecution_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "scrapeflow_schema"."Workflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scrapeflow_schema"."ExecutionPhase" ADD CONSTRAINT "ExecutionPhase_workflowExecutionId_fkey" FOREIGN KEY ("workflowExecutionId") REFERENCES "scrapeflow_schema"."WorkflowExecution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scrapeflow_schema"."ExecutionLog" ADD CONSTRAINT "ExecutionLog_executionPhaseId_fkey" FOREIGN KEY ("executionPhaseId") REFERENCES "scrapeflow_schema"."ExecutionPhase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
