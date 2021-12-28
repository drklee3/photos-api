/*
  Warnings:

  - Changed the type of `mimetype` on the `Photo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "mimetype",
ADD COLUMN     "mimetype" TEXT NOT NULL;

-- DropEnum
DROP TYPE "MimeType";
