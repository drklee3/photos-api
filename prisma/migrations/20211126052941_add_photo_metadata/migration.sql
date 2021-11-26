/*
  Warnings:

  - Added the required column `height` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MimeType" AS ENUM ('PNG', 'JPG', 'SVG', 'WEBP', 'WEBM', 'AVIF', 'GIF', 'MP4');

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "exif" JSONB NOT NULL DEFAULT E'{}',
ADD COLUMN     "fileName" TEXT,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "mimetype" "MimeType" NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;
