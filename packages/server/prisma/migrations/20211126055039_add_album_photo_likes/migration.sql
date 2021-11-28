-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "photosOnAlbumsAlbumId" TEXT NOT NULL,
    "photosOnAlbumsPhotoId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_photosOnAlbumsAlbumId_photosOnAlbumsPhotoId_fkey" FOREIGN KEY ("photosOnAlbumsAlbumId", "photosOnAlbumsPhotoId") REFERENCES "PhotosOnAlbums"("albumId", "photoId") ON DELETE RESTRICT ON UPDATE CASCADE;
