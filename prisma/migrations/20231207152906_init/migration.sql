-- CreateEnum
CREATE TYPE "LevelSeverity" AS ENUM ('low', 'medium', 'high');

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "level" "LevelSeverity" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "origin" TEXT NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);
