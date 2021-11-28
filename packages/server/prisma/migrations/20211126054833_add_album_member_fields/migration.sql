/*
  Warnings:

  - You are about to drop the `_Shared` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AlbumRole" AS ENUM ('VIEWER', 'COMMENTOR', 'EDITOR');

-- DropForeignKey
ALTER TABLE "_Shared" DROP CONSTRAINT "_Shared_A_fkey";

-- DropForeignKey
ALTER TABLE "_Shared" DROP CONSTRAINT "_Shared_B_fkey";

-- DropTable
DROP TABLE "_Shared";

-- CreateTable
CREATE TABLE "UsersOnAlbums" (
    "albumId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "AlbumRole" NOT NULL DEFAULT E'VIEWER',
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnAlbums_pkey" PRIMARY KEY ("albumId","userId")
);

-- AddForeignKey
ALTER TABLE "UsersOnAlbums" ADD CONSTRAINT "UsersOnAlbums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnAlbums" ADD CONSTRAINT "UsersOnAlbums_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
