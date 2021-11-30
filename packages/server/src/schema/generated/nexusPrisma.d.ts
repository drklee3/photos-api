import * as Typegen from '@kenchi/nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    first?: boolean
    last?: boolean
    before?: boolean
    after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime' | 'Json'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Album: Prisma.Album
  UserOnAlbum: Prisma.UserOnAlbum
  Photo: Prisma.Photo
  PhotoOnAlbum: Prisma.PhotoOnAlbum
  Like: Prisma.Like
  Comment: Prisma.Comment
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'username' | 'password' | 'albums' | 'sharedAlbums' | 'photos' | 'comments' | 'Like'
      ordering: 'id' | 'email' | 'username' | 'password' | 'albums' | 'sharedAlbums' | 'photos' | 'comments' | 'Like'
    }
    albums: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'description' | 'visibility' | 'viewCount' | 'author' | 'authorId' | 'createdAt' | 'updatedAt' | 'photos' | 'members'
      ordering: 'id' | 'title' | 'description' | 'visibility' | 'viewCount' | 'author' | 'authorId' | 'createdAt' | 'updatedAt' | 'photos' | 'members'
    }
    userOnAlbums: {
      filtering: 'AND' | 'OR' | 'NOT' | 'album' | 'albumId' | 'user' | 'userId' | 'role' | 'addedAt'
      ordering: 'album' | 'albumId' | 'user' | 'userId' | 'role' | 'addedAt'
    }
    photos: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'updatedAt' | 'title' | 'description' | 'author' | 'authorId' | 'fileName' | 'width' | 'height' | 'size' | 'mimetype' | 'exif' | 'blurHash' | 'albums'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'title' | 'description' | 'author' | 'authorId' | 'fileName' | 'width' | 'height' | 'size' | 'mimetype' | 'exif' | 'blurHash' | 'albums'
    }
    photoOnAlbums: {
      filtering: 'AND' | 'OR' | 'NOT' | 'album' | 'albumId' | 'photo' | 'photoId' | 'addedAt' | 'comments' | 'likes'
      ordering: 'album' | 'albumId' | 'photo' | 'photoId' | 'addedAt' | 'comments' | 'likes'
    }
    likes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'author' | 'authorId' | 'createdAt' | 'photo' | 'PhotoOnAlbumAlbumId' | 'PhotoOnAlbumPhotoId'
      ordering: 'id' | 'author' | 'authorId' | 'createdAt' | 'photo' | 'PhotoOnAlbumAlbumId' | 'PhotoOnAlbumPhotoId'
    }
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'content' | 'author' | 'authorId' | 'createdAt' | 'updatedAt' | 'photo' | 'PhotoOnAlbumAlbumId' | 'PhotoOnAlbumPhotoId'
      ordering: 'id' | 'content' | 'author' | 'authorId' | 'createdAt' | 'updatedAt' | 'photo' | 'PhotoOnAlbumAlbumId' | 'PhotoOnAlbumPhotoId'
    }
  },
  User: {
    albums: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'description' | 'visibility' | 'viewCount' | 'author' | 'authorId' | 'createdAt' | 'updatedAt' | 'photos' | 'members'
      ordering: 'id' | 'title' | 'description' | 'visibility' | 'viewCount' | 'author' | 'authorId' | 'createdAt' | 'updatedAt' | 'photos' | 'members'
    }
    sharedAlbums: {
      filtering: 'AND' | 'OR' | 'NOT' | 'album' | 'albumId' | 'user' | 'userId' | 'role' | 'addedAt'
      ordering: 'album' | 'albumId' | 'user' | 'userId' | 'role' | 'addedAt'
    }
    photos: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'updatedAt' | 'title' | 'description' | 'author' | 'authorId' | 'fileName' | 'width' | 'height' | 'size' | 'mimetype' | 'exif' | 'blurHash' | 'albums'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'title' | 'description' | 'author' | 'authorId' | 'fileName' | 'width' | 'height' | 'size' | 'mimetype' | 'exif' | 'blurHash' | 'albums'
    }
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'content' | 'author' | 'authorId' | 'createdAt' | 'updatedAt' | 'photo' | 'PhotoOnAlbumAlbumId' | 'PhotoOnAlbumPhotoId'
      ordering: 'id' | 'content' | 'author' | 'authorId' | 'createdAt' | 'updatedAt' | 'photo' | 'PhotoOnAlbumAlbumId' | 'PhotoOnAlbumPhotoId'
    }
    Like: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'author' | 'authorId' | 'createdAt' | 'photo' | 'PhotoOnAlbumAlbumId' | 'PhotoOnAlbumPhotoId'
      ordering: 'id' | 'author' | 'authorId' | 'createdAt' | 'photo' | 'PhotoOnAlbumAlbumId' | 'PhotoOnAlbumPhotoId'
    }
  }
  Album: {
    photos: {
      filtering: 'AND' | 'OR' | 'NOT' | 'album' | 'albumId' | 'photo' | 'photoId' | 'addedAt' | 'comments' | 'likes'
      ordering: 'album' | 'albumId' | 'photo' | 'photoId' | 'addedAt' | 'comments' | 'likes'
    }
    members: {
      filtering: 'AND' | 'OR' | 'NOT' | 'album' | 'albumId' | 'user' | 'userId' | 'role' | 'addedAt'
      ordering: 'album' | 'albumId' | 'user' | 'userId' | 'role' | 'addedAt'
    }
  }
  UserOnAlbum: {

  }
  Photo: {
    albums: {
      filtering: 'AND' | 'OR' | 'NOT' | 'album' | 'albumId' | 'photo' | 'photoId' | 'addedAt' | 'comments' | 'likes'
      ordering: 'album' | 'albumId' | 'photo' | 'photoId' | 'addedAt' | 'comments' | 'likes'
    }
  }
  PhotoOnAlbum: {
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'content' | 'author' | 'authorId' | 'createdAt' | 'updatedAt' | 'photo' | 'PhotoOnAlbumAlbumId' | 'PhotoOnAlbumPhotoId'
      ordering: 'id' | 'content' | 'author' | 'authorId' | 'createdAt' | 'updatedAt' | 'photo' | 'PhotoOnAlbumAlbumId' | 'PhotoOnAlbumPhotoId'
    }
    likes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'author' | 'authorId' | 'createdAt' | 'photo' | 'PhotoOnAlbumAlbumId' | 'PhotoOnAlbumPhotoId'
      ordering: 'id' | 'author' | 'authorId' | 'createdAt' | 'photo' | 'PhotoOnAlbumAlbumId' | 'PhotoOnAlbumPhotoId'
    }
  }
  Like: {

  }
  Comment: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    album: 'Album'
    albums: 'Album'
    userOnAlbum: 'UserOnAlbum'
    userOnAlbums: 'UserOnAlbum'
    photo: 'Photo'
    photos: 'Photo'
    photoOnAlbum: 'PhotoOnAlbum'
    photoOnAlbums: 'PhotoOnAlbum'
    like: 'Like'
    likes: 'Like'
    comment: 'Comment'
    comments: 'Comment'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'AffectedRowsOutput'
    deleteOneUser: 'User'
    deleteManyUser: 'AffectedRowsOutput'
    upsertOneUser: 'User'
    createOneAlbum: 'Album'
    updateOneAlbum: 'Album'
    updateManyAlbum: 'AffectedRowsOutput'
    deleteOneAlbum: 'Album'
    deleteManyAlbum: 'AffectedRowsOutput'
    upsertOneAlbum: 'Album'
    createOneUserOnAlbum: 'UserOnAlbum'
    updateOneUserOnAlbum: 'UserOnAlbum'
    updateManyUserOnAlbum: 'AffectedRowsOutput'
    deleteOneUserOnAlbum: 'UserOnAlbum'
    deleteManyUserOnAlbum: 'AffectedRowsOutput'
    upsertOneUserOnAlbum: 'UserOnAlbum'
    createOnePhoto: 'Photo'
    updateOnePhoto: 'Photo'
    updateManyPhoto: 'AffectedRowsOutput'
    deleteOnePhoto: 'Photo'
    deleteManyPhoto: 'AffectedRowsOutput'
    upsertOnePhoto: 'Photo'
    createOnePhotoOnAlbum: 'PhotoOnAlbum'
    updateOnePhotoOnAlbum: 'PhotoOnAlbum'
    updateManyPhotoOnAlbum: 'AffectedRowsOutput'
    deleteOnePhotoOnAlbum: 'PhotoOnAlbum'
    deleteManyPhotoOnAlbum: 'AffectedRowsOutput'
    upsertOnePhotoOnAlbum: 'PhotoOnAlbum'
    createOneLike: 'Like'
    updateOneLike: 'Like'
    updateManyLike: 'AffectedRowsOutput'
    deleteOneLike: 'Like'
    deleteManyLike: 'AffectedRowsOutput'
    upsertOneLike: 'Like'
    createOneComment: 'Comment'
    updateOneComment: 'Comment'
    updateManyComment: 'AffectedRowsOutput'
    deleteOneComment: 'Comment'
    deleteManyComment: 'AffectedRowsOutput'
    upsertOneComment: 'Comment'
  },
  User: {
    id: 'String'
    email: 'String'
    username: 'String'
    password: 'String'
    albums: 'Album'
    sharedAlbums: 'UserOnAlbum'
    photos: 'Photo'
    comments: 'Comment'
    Like: 'Like'
  }
  Album: {
    id: 'String'
    title: 'String'
    description: 'String'
    visibility: 'Visibility'
    viewCount: 'Int'
    author: 'User'
    authorId: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    photos: 'PhotoOnAlbum'
    members: 'UserOnAlbum'
  }
  UserOnAlbum: {
    album: 'Album'
    albumId: 'String'
    user: 'User'
    userId: 'String'
    role: 'AlbumRole'
    addedAt: 'DateTime'
  }
  Photo: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    title: 'String'
    description: 'String'
    author: 'User'
    authorId: 'String'
    fileName: 'String'
    width: 'Int'
    height: 'Int'
    size: 'Int'
    mimetype: 'MimeType'
    exif: 'Json'
    blurHash: 'String'
    albums: 'PhotoOnAlbum'
  }
  PhotoOnAlbum: {
    album: 'Album'
    albumId: 'String'
    photo: 'Photo'
    photoId: 'String'
    addedAt: 'DateTime'
    comments: 'Comment'
    likes: 'Like'
  }
  Like: {
    id: 'String'
    author: 'User'
    authorId: 'String'
    createdAt: 'DateTime'
    photo: 'PhotoOnAlbum'
    PhotoOnAlbumAlbumId: 'String'
    PhotoOnAlbumPhotoId: 'String'
  }
  Comment: {
    id: 'String'
    content: 'String'
    author: 'User'
    authorId: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    photo: 'PhotoOnAlbum'
    PhotoOnAlbumAlbumId: 'String'
    PhotoOnAlbumPhotoId: 'String'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Album: Typegen.NexusPrismaFields<'Album'>
  UserOnAlbum: Typegen.NexusPrismaFields<'UserOnAlbum'>
  Photo: Typegen.NexusPrismaFields<'Photo'>
  PhotoOnAlbum: Typegen.NexusPrismaFields<'PhotoOnAlbum'>
  Like: Typegen.NexusPrismaFields<'Like'>
  Comment: Typegen.NexusPrismaFields<'Comment'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  