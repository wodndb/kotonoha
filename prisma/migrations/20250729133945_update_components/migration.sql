/*
  Warnings:

  - The `components` column on the `Word` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Word" DROP COLUMN "components",
ADD COLUMN     "components" JSONB[];
