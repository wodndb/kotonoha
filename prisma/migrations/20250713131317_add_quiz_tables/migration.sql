/*
  Warnings:

  - You are about to drop the column `wordId` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `partOfSpeech` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the `WordComponent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WordMeaning` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `meaningId` to the `Example` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wordId` to the `Meaning` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasKanji` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuizType" AS ENUM ('MEANING_MATCHING', 'READING_MATCHING', 'FILL_IN_THE_BLANK', 'LISTENING', 'MULTIPLE_CHOICE', 'SHORT_ANSWER');

-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('USER', 'EDITOR', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_wordId_fkey";

-- DropForeignKey
ALTER TABLE "WordComponent" DROP CONSTRAINT "WordComponent_wordId_fkey";

-- DropForeignKey
ALTER TABLE "WordMeaning" DROP CONSTRAINT "WordMeaning_meaningId_fkey";

-- DropForeignKey
ALTER TABLE "WordMeaning" DROP CONSTRAINT "WordMeaning_wordId_fkey";

-- AlterTable
ALTER TABLE "Example" DROP COLUMN "wordId",
ADD COLUMN     "meaningId" INTEGER NOT NULL,
ALTER COLUMN "translation" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Meaning" ADD COLUMN     "partOfSpeech" TEXT,
ADD COLUMN     "wordId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRoleType" NOT NULL DEFAULT 'USER',
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "partOfSpeech",
DROP COLUMN "type",
ADD COLUMN     "components" JSONB,
ADD COLUMN     "hasKanji" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "WordComponent";

-- DropTable
DROP TABLE "WordMeaning";

-- CreateTable
CREATE TABLE "QuizSession" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "score" INTEGER,
    "totalQuestions" INTEGER,

    CONSTRAINT "QuizSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizRecord" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "wordId" INTEGER NOT NULL,
    "quizTypeId" "QuizType" NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responseTime" INTEGER,
    "userAnswer" TEXT,
    "correctAnswer" TEXT,
    "quizSessionId" INTEGER,

    CONSTRAINT "QuizRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuizSession_userId_idx" ON "QuizSession"("userId");

-- CreateIndex
CREATE INDEX "QuizRecord_userId_wordId_quizTypeId_idx" ON "QuizRecord"("userId", "wordId", "quizTypeId");

-- CreateIndex
CREATE INDEX "QuizRecord_quizSessionId_idx" ON "QuizRecord"("quizSessionId");

-- AddForeignKey
ALTER TABLE "Meaning" ADD CONSTRAINT "Meaning_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_meaningId_fkey" FOREIGN KEY ("meaningId") REFERENCES "Meaning"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizRecord" ADD CONSTRAINT "QuizRecord_quizSessionId_fkey" FOREIGN KEY ("quizSessionId") REFERENCES "QuizSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizRecord" ADD CONSTRAINT "QuizRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizRecord" ADD CONSTRAINT "QuizRecord_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
