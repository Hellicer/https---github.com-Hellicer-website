-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('online', 'beta', 'archived');

-- CreateEnum
CREATE TYPE "ProjectStack" AS ENUM ('frontend', 'backend', 'fullstack');

-- CreateTable
CREATE TABLE "GithubProject" (
    "id" TEXT NOT NULL,
    "githubId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL,
    "stack" "ProjectStack" NOT NULL,
    "tech" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubProject_githubId_key" ON "GithubProject"("githubId");
