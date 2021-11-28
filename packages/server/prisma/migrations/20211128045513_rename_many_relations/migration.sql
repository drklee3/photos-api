/*
  Warnings:

  - You are about to drop the column `photosOnAlbumsAlbumId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `photosOnAlbumsPhotoId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `photosOnAlbumsAlbumId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `photosOnAlbumsPhotoId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the `PhotosOnAlbums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersOnAlbums` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `PhotoOnAlbumAlbumId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PhotoOnAlbumPhotoId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PhotoOnAlbumAlbumId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PhotoOnAlbumPhotoId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_photosOnAlbumsAlbumId_photosOnAlbumsPhotoId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_photosOnAlbumsAlbumId_photosOnAlbumsPhotoId_fkey";

-- DropForeignKey
ALTER TABLE "PhotosOnAlbums" DROP CONSTRAINT "PhotosOnAlbums_albumId_fkey";

-- DropForeignKey
ALTER TABLE "PhotosOnAlbums" DROP CONSTRAINT "PhotosOnAlbums_photoId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnAlbums" DROP CONSTRAINT "UsersOnAlbums_albumId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnAlbums" DROP CONSTRAINT "UsersOnAlbums_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "photosOnAlbumsAlbumId",
DROP COLUMN "photosOnAlbumsPhotoId",
ADD COLUMN     "PhotoOnAlbumAlbumId" TEXT NOT NULL,
ADD COLUMN     "PhotoOnAlbumPhotoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "photosOnAlbumsAlbumId",
DROP COLUMN "photosOnAlbumsPhotoId",
ADD COLUMN     "PhotoOnAlbumAlbumId" TEXT NOT NULL,
ADD COLUMN     "PhotoOnAlbumPhotoId" TEXT NOT NULL;

-- DropTable
DROP TABLE "PhotosOnAlbums";

-- DropTable
DROP TABLE "UsersOnAlbums";

-- CreateTable
CREATE TABLE "UserOnAlbum" (
    "albumId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "AlbumRole" NOT NULL DEFAULT E'VIEWER',
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserOnAlbum_pkey" PRIMARY KEY ("albumId","userId")
);

-- CreateTable
CREATE TABLE "PhotoOnAlbum" (
    "albumId" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhotoOnAlbum_pkey" PRIMARY KEY ("albumId","photoId")
);

-- AddForeignKey
ALTER TABLE "UserOnAlbum" ADD CONSTRAINT "UserOnAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnAlbum" ADD CONSTRAINT "UserOnAlbum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoOnAlbum" ADD CONSTRAINT "PhotoOnAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoOnAlbum" ADD CONSTRAINT "PhotoOnAlbum_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_PhotoOnAlbumAlbumId_PhotoOnAlbumPhotoId_fkey" FOREIGN KEY ("PhotoOnAlbumAlbumId", "PhotoOnAlbumPhotoId") REFERENCES "PhotoOnAlbum"("albumId", "photoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_PhotoOnAlbumAlbumId_PhotoOnAlbumPhotoId_fkey" FOREIGN KEY ("PhotoOnAlbumAlbumId", "PhotoOnAlbumPhotoId") REFERENCES "PhotoOnAlbum"("albumId", "photoId") ON DELETE RESTRICT ON UPDATE CASCADE;
