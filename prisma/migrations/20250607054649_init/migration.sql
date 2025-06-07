-- CreateEnum
CREATE TYPE "CharType" AS ENUM ('KANJI', 'HIRAGANA', 'KATAKANA');

-- CreateEnum
CREATE TYPE "StudyStatus" AS ENUM ('LEARNING', 'REVIEWING', 'MASTERED', 'SKIP');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWord" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "wordId" INTEGER NOT NULL,
    "studyStatus" "StudyStatus" NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" TEXT,
    "reading" TEXT,
    "partOfSpeech" TEXT,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordComponent" (
    "id" SERIAL NOT NULL,
    "wordId" INTEGER NOT NULL,
    "char" TEXT NOT NULL,
    "reading" TEXT,
    "type" "CharType" NOT NULL,

    CONSTRAINT "WordComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meaning" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Meaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordMeaning" (
    "wordId" INTEGER NOT NULL,
    "meaningId" INTEGER NOT NULL,

    CONSTRAINT "WordMeaning_pkey" PRIMARY KEY ("wordId","meaningId")
);

-- CreateTable
CREATE TABLE "Example" (
    "id" SERIAL NOT NULL,
    "wordId" INTEGER NOT NULL,
    "sentence" TEXT NOT NULL,
    "translation" TEXT NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordSynonym" (
    "wordId" INTEGER NOT NULL,
    "synonymId" INTEGER NOT NULL,

    CONSTRAINT "WordSynonym_pkey" PRIMARY KEY ("wordId","synonymId")
);

-- CreateTable
CREATE TABLE "WordAntonym" (
    "wordId" INTEGER NOT NULL,
    "antonymId" INTEGER NOT NULL,

    CONSTRAINT "WordAntonym_pkey" PRIMARY KEY ("wordId","antonymId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserWord_userId_wordId_key" ON "UserWord"("userId", "wordId");

-- AddForeignKey
ALTER TABLE "UserWord" ADD CONSTRAINT "UserWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWord" ADD CONSTRAINT "UserWord_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordComponent" ADD CONSTRAINT "WordComponent_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordMeaning" ADD CONSTRAINT "WordMeaning_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordMeaning" ADD CONSTRAINT "WordMeaning_meaningId_fkey" FOREIGN KEY ("meaningId") REFERENCES "Meaning"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordSynonym" ADD CONSTRAINT "WordSynonym_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordSynonym" ADD CONSTRAINT "WordSynonym_synonymId_fkey" FOREIGN KEY ("synonymId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordAntonym" ADD CONSTRAINT "WordAntonym_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordAntonym" ADD CONSTRAINT "WordAntonym_antonymId_fkey" FOREIGN KEY ("antonymId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
