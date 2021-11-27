import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Json: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Album = {
  __typename?: 'Album';
  author: User;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  members: Array<UsersOnAlbums>;
  photos: Array<PhotosOnAlbums>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  viewCount: Scalars['Int'];
  visibility: Visibility;
};


export type AlbumMembersArgs = {
  after?: InputMaybe<UsersOnAlbumsWhereUniqueInput>;
  before?: InputMaybe<UsersOnAlbumsWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type AlbumPhotosArgs = {
  after?: InputMaybe<PhotosOnAlbumsWhereUniqueInput>;
  before?: InputMaybe<PhotosOnAlbumsWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AlbumCreateInput = {
  author: UserCreateNestedOneWithoutAlbumsInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<UsersOnAlbumsCreateNestedManyWithoutAlbumInput>;
  photos?: InputMaybe<PhotosOnAlbumsCreateNestedManyWithoutAlbumInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  viewCount?: InputMaybe<Scalars['Int']>;
  visibility?: InputMaybe<Visibility>;
};

export type AlbumCreateManyAuthorInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  viewCount?: InputMaybe<Scalars['Int']>;
  visibility?: InputMaybe<Visibility>;
};

export type AlbumCreateManyAuthorInputEnvelope = {
  data?: InputMaybe<Array<AlbumCreateManyAuthorInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AlbumCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<AlbumWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AlbumCreateOrConnectWithoutAuthorInput>>;
  create?: InputMaybe<Array<AlbumCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<AlbumCreateManyAuthorInputEnvelope>;
};

export type AlbumCreateNestedOneWithoutMembersInput = {
  connect?: InputMaybe<AlbumWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AlbumCreateOrConnectWithoutMembersInput>;
  create?: InputMaybe<AlbumCreateWithoutMembersInput>;
};

export type AlbumCreateNestedOneWithoutPhotosInput = {
  connect?: InputMaybe<AlbumWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AlbumCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<AlbumCreateWithoutPhotosInput>;
};

export type AlbumCreateOrConnectWithoutAuthorInput = {
  create: AlbumCreateWithoutAuthorInput;
  where: AlbumWhereUniqueInput;
};

export type AlbumCreateOrConnectWithoutMembersInput = {
  create: AlbumCreateWithoutMembersInput;
  where: AlbumWhereUniqueInput;
};

export type AlbumCreateOrConnectWithoutPhotosInput = {
  create: AlbumCreateWithoutPhotosInput;
  where: AlbumWhereUniqueInput;
};

export type AlbumCreateWithoutAuthorInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<UsersOnAlbumsCreateNestedManyWithoutAlbumInput>;
  photos?: InputMaybe<PhotosOnAlbumsCreateNestedManyWithoutAlbumInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  viewCount?: InputMaybe<Scalars['Int']>;
  visibility?: InputMaybe<Visibility>;
};

export type AlbumCreateWithoutMembersInput = {
  author: UserCreateNestedOneWithoutAlbumsInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  photos?: InputMaybe<PhotosOnAlbumsCreateNestedManyWithoutAlbumInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  viewCount?: InputMaybe<Scalars['Int']>;
  visibility?: InputMaybe<Visibility>;
};

export type AlbumCreateWithoutPhotosInput = {
  author: UserCreateNestedOneWithoutAlbumsInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<UsersOnAlbumsCreateNestedManyWithoutAlbumInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  viewCount?: InputMaybe<Scalars['Int']>;
  visibility?: InputMaybe<Visibility>;
};

export type AlbumListRelationFilter = {
  every?: InputMaybe<AlbumWhereInput>;
  none?: InputMaybe<AlbumWhereInput>;
  some?: InputMaybe<AlbumWhereInput>;
};

export type AlbumOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AlbumOrderByWithRelationInput = {
  author?: InputMaybe<UserOrderByWithRelationInput>;
  authorId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  members?: InputMaybe<UsersOnAlbumsOrderByRelationAggregateInput>;
  photos?: InputMaybe<PhotosOnAlbumsOrderByRelationAggregateInput>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  viewCount?: InputMaybe<SortOrder>;
  visibility?: InputMaybe<SortOrder>;
};

/** User role of an album */
export enum AlbumPermissions {
  Commenter = 'COMMENTER',
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}

export enum AlbumRole {
  Commentor = 'COMMENTOR',
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}

export type AlbumScalarWhereInput = {
  AND?: InputMaybe<Array<AlbumScalarWhereInput>>;
  NOT?: InputMaybe<Array<AlbumScalarWhereInput>>;
  OR?: InputMaybe<Array<AlbumScalarWhereInput>>;
  authorId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  viewCount?: InputMaybe<IntFilter>;
  visibility?: InputMaybe<EnumVisibilityFilter>;
};

export type AlbumUpdateInput = {
  author?: InputMaybe<UserUpdateOneRequiredWithoutAlbumsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  members?: InputMaybe<UsersOnAlbumsUpdateManyWithoutAlbumInput>;
  photos?: InputMaybe<PhotosOnAlbumsUpdateManyWithoutAlbumInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  viewCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type AlbumUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  viewCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type AlbumUpdateManyWithWhereWithoutAuthorInput = {
  data: AlbumUpdateManyMutationInput;
  where: AlbumScalarWhereInput;
};

export type AlbumUpdateManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<AlbumWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AlbumCreateOrConnectWithoutAuthorInput>>;
  create?: InputMaybe<Array<AlbumCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<AlbumCreateManyAuthorInputEnvelope>;
  delete?: InputMaybe<Array<AlbumWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AlbumScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AlbumWhereUniqueInput>>;
  set?: InputMaybe<Array<AlbumWhereUniqueInput>>;
  update?: InputMaybe<Array<AlbumUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: InputMaybe<Array<AlbumUpdateManyWithWhereWithoutAuthorInput>>;
  upsert?: InputMaybe<Array<AlbumUpsertWithWhereUniqueWithoutAuthorInput>>;
};

export type AlbumUpdateOneRequiredWithoutMembersInput = {
  connect?: InputMaybe<AlbumWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AlbumCreateOrConnectWithoutMembersInput>;
  create?: InputMaybe<AlbumCreateWithoutMembersInput>;
  update?: InputMaybe<AlbumUpdateWithoutMembersInput>;
  upsert?: InputMaybe<AlbumUpsertWithoutMembersInput>;
};

export type AlbumUpdateOneRequiredWithoutPhotosInput = {
  connect?: InputMaybe<AlbumWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AlbumCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<AlbumCreateWithoutPhotosInput>;
  update?: InputMaybe<AlbumUpdateWithoutPhotosInput>;
  upsert?: InputMaybe<AlbumUpsertWithoutPhotosInput>;
};

export type AlbumUpdateWithWhereUniqueWithoutAuthorInput = {
  data: AlbumUpdateWithoutAuthorInput;
  where: AlbumWhereUniqueInput;
};

export type AlbumUpdateWithoutAuthorInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  members?: InputMaybe<UsersOnAlbumsUpdateManyWithoutAlbumInput>;
  photos?: InputMaybe<PhotosOnAlbumsUpdateManyWithoutAlbumInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  viewCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type AlbumUpdateWithoutMembersInput = {
  author?: InputMaybe<UserUpdateOneRequiredWithoutAlbumsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  photos?: InputMaybe<PhotosOnAlbumsUpdateManyWithoutAlbumInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  viewCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type AlbumUpdateWithoutPhotosInput = {
  author?: InputMaybe<UserUpdateOneRequiredWithoutAlbumsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  members?: InputMaybe<UsersOnAlbumsUpdateManyWithoutAlbumInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  viewCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type AlbumUpsertWithWhereUniqueWithoutAuthorInput = {
  create: AlbumCreateWithoutAuthorInput;
  update: AlbumUpdateWithoutAuthorInput;
  where: AlbumWhereUniqueInput;
};

export type AlbumUpsertWithoutMembersInput = {
  create: AlbumCreateWithoutMembersInput;
  update: AlbumUpdateWithoutMembersInput;
};

export type AlbumUpsertWithoutPhotosInput = {
  create: AlbumCreateWithoutPhotosInput;
  update: AlbumUpdateWithoutPhotosInput;
};

export type AlbumWhereInput = {
  AND?: InputMaybe<Array<AlbumWhereInput>>;
  NOT?: InputMaybe<Array<AlbumWhereInput>>;
  OR?: InputMaybe<Array<AlbumWhereInput>>;
  author?: InputMaybe<UserWhereInput>;
  authorId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  members?: InputMaybe<UsersOnAlbumsListRelationFilter>;
  photos?: InputMaybe<PhotosOnAlbumsListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  viewCount?: InputMaybe<IntFilter>;
  visibility?: InputMaybe<EnumVisibilityFilter>;
};

export type AlbumWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  photo: PhotosOnAlbums;
  updatedAt: Scalars['DateTime'];
};

export type CommentCreateInput = {
  author: UserCreateNestedOneWithoutCommentsInput;
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  photo: PhotosOnAlbumsCreateNestedOneWithoutCommentsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CommentCreateManyAuthorInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  photosOnAlbumsAlbumId: Scalars['String'];
  photosOnAlbumsPhotoId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CommentCreateManyAuthorInputEnvelope = {
  data?: InputMaybe<Array<CommentCreateManyAuthorInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type CommentCreateManyPhotoInput = {
  authorId: Scalars['String'];
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CommentCreateManyPhotoInputEnvelope = {
  data?: InputMaybe<Array<CommentCreateManyPhotoInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type CommentCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentCreateOrConnectWithoutAuthorInput>>;
  create?: InputMaybe<Array<CommentCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<CommentCreateManyAuthorInputEnvelope>;
};

export type CommentCreateNestedManyWithoutPhotoInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentCreateOrConnectWithoutPhotoInput>>;
  create?: InputMaybe<Array<CommentCreateWithoutPhotoInput>>;
  createMany?: InputMaybe<CommentCreateManyPhotoInputEnvelope>;
};

export type CommentCreateOrConnectWithoutAuthorInput = {
  create: CommentCreateWithoutAuthorInput;
  where: CommentWhereUniqueInput;
};

export type CommentCreateOrConnectWithoutPhotoInput = {
  create: CommentCreateWithoutPhotoInput;
  where: CommentWhereUniqueInput;
};

export type CommentCreateWithoutAuthorInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  photo: PhotosOnAlbumsCreateNestedOneWithoutCommentsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CommentCreateWithoutPhotoInput = {
  author: UserCreateNestedOneWithoutCommentsInput;
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CommentListRelationFilter = {
  every?: InputMaybe<CommentWhereInput>;
  none?: InputMaybe<CommentWhereInput>;
  some?: InputMaybe<CommentWhereInput>;
};

export type CommentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CommentOrderByWithRelationInput = {
  author?: InputMaybe<UserOrderByWithRelationInput>;
  authorId?: InputMaybe<SortOrder>;
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  photo?: InputMaybe<PhotosOnAlbumsOrderByWithRelationInput>;
  photosOnAlbumsAlbumId?: InputMaybe<SortOrder>;
  photosOnAlbumsPhotoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CommentScalarWhereInput = {
  AND?: InputMaybe<Array<CommentScalarWhereInput>>;
  NOT?: InputMaybe<Array<CommentScalarWhereInput>>;
  OR?: InputMaybe<Array<CommentScalarWhereInput>>;
  authorId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  photosOnAlbumsAlbumId?: InputMaybe<StringFilter>;
  photosOnAlbumsPhotoId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CommentUpdateInput = {
  author?: InputMaybe<UserUpdateOneRequiredWithoutCommentsInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  photo?: InputMaybe<PhotosOnAlbumsUpdateOneRequiredWithoutCommentsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpdateManyMutationInput = {
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpdateManyWithWhereWithoutAuthorInput = {
  data: CommentUpdateManyMutationInput;
  where: CommentScalarWhereInput;
};

export type CommentUpdateManyWithWhereWithoutPhotoInput = {
  data: CommentUpdateManyMutationInput;
  where: CommentScalarWhereInput;
};

export type CommentUpdateManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentCreateOrConnectWithoutAuthorInput>>;
  create?: InputMaybe<Array<CommentCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<CommentCreateManyAuthorInputEnvelope>;
  delete?: InputMaybe<Array<CommentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CommentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  set?: InputMaybe<Array<CommentWhereUniqueInput>>;
  update?: InputMaybe<Array<CommentUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: InputMaybe<Array<CommentUpdateManyWithWhereWithoutAuthorInput>>;
  upsert?: InputMaybe<Array<CommentUpsertWithWhereUniqueWithoutAuthorInput>>;
};

export type CommentUpdateManyWithoutPhotoInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentCreateOrConnectWithoutPhotoInput>>;
  create?: InputMaybe<Array<CommentCreateWithoutPhotoInput>>;
  createMany?: InputMaybe<CommentCreateManyPhotoInputEnvelope>;
  delete?: InputMaybe<Array<CommentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CommentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  set?: InputMaybe<Array<CommentWhereUniqueInput>>;
  update?: InputMaybe<Array<CommentUpdateWithWhereUniqueWithoutPhotoInput>>;
  updateMany?: InputMaybe<Array<CommentUpdateManyWithWhereWithoutPhotoInput>>;
  upsert?: InputMaybe<Array<CommentUpsertWithWhereUniqueWithoutPhotoInput>>;
};

export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
  data: CommentUpdateWithoutAuthorInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpdateWithWhereUniqueWithoutPhotoInput = {
  data: CommentUpdateWithoutPhotoInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpdateWithoutAuthorInput = {
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  photo?: InputMaybe<PhotosOnAlbumsUpdateOneRequiredWithoutCommentsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpdateWithoutPhotoInput = {
  author?: InputMaybe<UserUpdateOneRequiredWithoutCommentsInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
  create: CommentCreateWithoutAuthorInput;
  update: CommentUpdateWithoutAuthorInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpsertWithWhereUniqueWithoutPhotoInput = {
  create: CommentCreateWithoutPhotoInput;
  update: CommentUpdateWithoutPhotoInput;
  where: CommentWhereUniqueInput;
};

export type CommentWhereInput = {
  AND?: InputMaybe<Array<CommentWhereInput>>;
  NOT?: InputMaybe<Array<CommentWhereInput>>;
  OR?: InputMaybe<Array<CommentWhereInput>>;
  author?: InputMaybe<UserWhereInput>;
  authorId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  photo?: InputMaybe<PhotosOnAlbumsWhereInput>;
  photosOnAlbumsAlbumId?: InputMaybe<StringFilter>;
  photosOnAlbumsPhotoId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CommentWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type EnumAlbumRoleFieldUpdateOperationsInput = {
  set?: InputMaybe<AlbumRole>;
};

export type EnumAlbumRoleFilter = {
  equals?: InputMaybe<AlbumRole>;
  in?: InputMaybe<Array<AlbumRole>>;
  not?: InputMaybe<NestedEnumAlbumRoleFilter>;
  notIn?: InputMaybe<Array<AlbumRole>>;
};

export type EnumMimeTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<MimeType>;
};

export type EnumMimeTypeFilter = {
  equals?: InputMaybe<MimeType>;
  in?: InputMaybe<Array<MimeType>>;
  not?: InputMaybe<NestedEnumMimeTypeFilter>;
  notIn?: InputMaybe<Array<MimeType>>;
};

export type EnumVisibilityFieldUpdateOperationsInput = {
  set?: InputMaybe<Visibility>;
};

export type EnumVisibilityFilter = {
  equals?: InputMaybe<Visibility>;
  in?: InputMaybe<Array<Visibility>>;
  not?: InputMaybe<NestedEnumVisibilityFilter>;
  notIn?: InputMaybe<Array<Visibility>>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type Like = {
  __typename?: 'Like';
  author: User;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  photo: PhotosOnAlbums;
};

export type LikeCreateManyAuthorInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  photosOnAlbumsAlbumId: Scalars['String'];
  photosOnAlbumsPhotoId: Scalars['String'];
};

export type LikeCreateManyAuthorInputEnvelope = {
  data?: InputMaybe<Array<LikeCreateManyAuthorInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type LikeCreateManyPhotoInput = {
  authorId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
};

export type LikeCreateManyPhotoInputEnvelope = {
  data?: InputMaybe<Array<LikeCreateManyPhotoInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type LikeCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<LikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LikeCreateOrConnectWithoutAuthorInput>>;
  create?: InputMaybe<Array<LikeCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<LikeCreateManyAuthorInputEnvelope>;
};

export type LikeCreateNestedManyWithoutPhotoInput = {
  connect?: InputMaybe<Array<LikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LikeCreateOrConnectWithoutPhotoInput>>;
  create?: InputMaybe<Array<LikeCreateWithoutPhotoInput>>;
  createMany?: InputMaybe<LikeCreateManyPhotoInputEnvelope>;
};

export type LikeCreateOrConnectWithoutAuthorInput = {
  create: LikeCreateWithoutAuthorInput;
  where: LikeWhereUniqueInput;
};

export type LikeCreateOrConnectWithoutPhotoInput = {
  create: LikeCreateWithoutPhotoInput;
  where: LikeWhereUniqueInput;
};

export type LikeCreateWithoutAuthorInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  photo: PhotosOnAlbumsCreateNestedOneWithoutLikesInput;
};

export type LikeCreateWithoutPhotoInput = {
  author: UserCreateNestedOneWithoutLikeInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
};

export type LikeListRelationFilter = {
  every?: InputMaybe<LikeWhereInput>;
  none?: InputMaybe<LikeWhereInput>;
  some?: InputMaybe<LikeWhereInput>;
};

export type LikeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type LikeScalarWhereInput = {
  AND?: InputMaybe<Array<LikeScalarWhereInput>>;
  NOT?: InputMaybe<Array<LikeScalarWhereInput>>;
  OR?: InputMaybe<Array<LikeScalarWhereInput>>;
  authorId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  photosOnAlbumsAlbumId?: InputMaybe<StringFilter>;
  photosOnAlbumsPhotoId?: InputMaybe<StringFilter>;
};

export type LikeUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type LikeUpdateManyWithWhereWithoutAuthorInput = {
  data: LikeUpdateManyMutationInput;
  where: LikeScalarWhereInput;
};

export type LikeUpdateManyWithWhereWithoutPhotoInput = {
  data: LikeUpdateManyMutationInput;
  where: LikeScalarWhereInput;
};

export type LikeUpdateManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<LikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LikeCreateOrConnectWithoutAuthorInput>>;
  create?: InputMaybe<Array<LikeCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<LikeCreateManyAuthorInputEnvelope>;
  delete?: InputMaybe<Array<LikeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<LikeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<LikeWhereUniqueInput>>;
  set?: InputMaybe<Array<LikeWhereUniqueInput>>;
  update?: InputMaybe<Array<LikeUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: InputMaybe<Array<LikeUpdateManyWithWhereWithoutAuthorInput>>;
  upsert?: InputMaybe<Array<LikeUpsertWithWhereUniqueWithoutAuthorInput>>;
};

export type LikeUpdateManyWithoutPhotoInput = {
  connect?: InputMaybe<Array<LikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LikeCreateOrConnectWithoutPhotoInput>>;
  create?: InputMaybe<Array<LikeCreateWithoutPhotoInput>>;
  createMany?: InputMaybe<LikeCreateManyPhotoInputEnvelope>;
  delete?: InputMaybe<Array<LikeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<LikeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<LikeWhereUniqueInput>>;
  set?: InputMaybe<Array<LikeWhereUniqueInput>>;
  update?: InputMaybe<Array<LikeUpdateWithWhereUniqueWithoutPhotoInput>>;
  updateMany?: InputMaybe<Array<LikeUpdateManyWithWhereWithoutPhotoInput>>;
  upsert?: InputMaybe<Array<LikeUpsertWithWhereUniqueWithoutPhotoInput>>;
};

export type LikeUpdateWithWhereUniqueWithoutAuthorInput = {
  data: LikeUpdateWithoutAuthorInput;
  where: LikeWhereUniqueInput;
};

export type LikeUpdateWithWhereUniqueWithoutPhotoInput = {
  data: LikeUpdateWithoutPhotoInput;
  where: LikeWhereUniqueInput;
};

export type LikeUpdateWithoutAuthorInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  photo?: InputMaybe<PhotosOnAlbumsUpdateOneRequiredWithoutLikesInput>;
};

export type LikeUpdateWithoutPhotoInput = {
  author?: InputMaybe<UserUpdateOneRequiredWithoutLikeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type LikeUpsertWithWhereUniqueWithoutAuthorInput = {
  create: LikeCreateWithoutAuthorInput;
  update: LikeUpdateWithoutAuthorInput;
  where: LikeWhereUniqueInput;
};

export type LikeUpsertWithWhereUniqueWithoutPhotoInput = {
  create: LikeCreateWithoutPhotoInput;
  update: LikeUpdateWithoutPhotoInput;
  where: LikeWhereUniqueInput;
};

export type LikeWhereInput = {
  AND?: InputMaybe<Array<LikeWhereInput>>;
  NOT?: InputMaybe<Array<LikeWhereInput>>;
  OR?: InputMaybe<Array<LikeWhereInput>>;
  author?: InputMaybe<UserWhereInput>;
  authorId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  photo?: InputMaybe<PhotosOnAlbumsWhereInput>;
  photosOnAlbumsAlbumId?: InputMaybe<StringFilter>;
  photosOnAlbumsPhotoId?: InputMaybe<StringFilter>;
};

export type LikeWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum MimeType {
  Avif = 'AVIF',
  Gif = 'GIF',
  Jpg = 'JPG',
  Mp4 = 'MP4',
  Png = 'PNG',
  Svg = 'SVG',
  Webm = 'WEBM',
  Webp = 'WEBP'
}

export type Mutation = {
  __typename?: 'Mutation';
  createOneAlbum: Album;
  createOneComment: Comment;
  createOnePhotosOnAlbums: PhotosOnAlbums;
  deleteOneAlbum?: Maybe<Album>;
  deleteOneComment?: Maybe<Comment>;
  deleteOnePhoto?: Maybe<Photo>;
  deleteOnePhotosOnAlbums?: Maybe<PhotosOnAlbums>;
  deleteOneUser?: Maybe<User>;
  incrementAlbumViewCount?: Maybe<Album>;
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']>;
  shareAlbum?: Maybe<Album>;
  signup?: Maybe<User>;
  updateOneAlbum?: Maybe<Album>;
  updateOneComment?: Maybe<Comment>;
  updateOnePhoto?: Maybe<Photo>;
  updateOnePhotosOnAlbums?: Maybe<PhotosOnAlbums>;
  updateOneUser?: Maybe<User>;
  uploadPhotos: Array<Photo>;
};


export type MutationCreateOneAlbumArgs = {
  data: AlbumCreateInput;
};


export type MutationCreateOneCommentArgs = {
  data: CommentCreateInput;
};


export type MutationCreateOnePhotosOnAlbumsArgs = {
  data: PhotosOnAlbumsCreateInput;
};


export type MutationDeleteOneAlbumArgs = {
  where: AlbumWhereUniqueInput;
};


export type MutationDeleteOneCommentArgs = {
  where: CommentWhereUniqueInput;
};


export type MutationDeleteOnePhotoArgs = {
  where: PhotoWhereUniqueInput;
};


export type MutationDeleteOnePhotosOnAlbumsArgs = {
  where: PhotosOnAlbumsWhereUniqueInput;
};


export type MutationDeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationIncrementAlbumViewCountArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
};


export type MutationShareAlbumArgs = {
  albumId: Scalars['String'];
  role: AlbumRole;
  targetUserId: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateOneAlbumArgs = {
  data: AlbumUpdateInput;
  where: AlbumWhereUniqueInput;
};


export type MutationUpdateOneCommentArgs = {
  data: CommentUpdateInput;
  where: CommentWhereUniqueInput;
};


export type MutationUpdateOnePhotoArgs = {
  data: PhotoUpdateInput;
  where: PhotoWhereUniqueInput;
};


export type MutationUpdateOnePhotosOnAlbumsArgs = {
  data: PhotosOnAlbumsUpdateInput;
  where: PhotosOnAlbumsWhereUniqueInput;
};


export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUploadPhotosArgs = {
  files: Array<Scalars['Upload']>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumAlbumRoleFilter = {
  equals?: InputMaybe<AlbumRole>;
  in?: InputMaybe<Array<AlbumRole>>;
  not?: InputMaybe<NestedEnumAlbumRoleFilter>;
  notIn?: InputMaybe<Array<AlbumRole>>;
};

export type NestedEnumMimeTypeFilter = {
  equals?: InputMaybe<MimeType>;
  in?: InputMaybe<Array<MimeType>>;
  not?: InputMaybe<NestedEnumMimeTypeFilter>;
  notIn?: InputMaybe<Array<MimeType>>;
};

export type NestedEnumVisibilityFilter = {
  equals?: InputMaybe<Visibility>;
  in?: InputMaybe<Array<Visibility>>;
  not?: InputMaybe<NestedEnumVisibilityFilter>;
  notIn?: InputMaybe<Array<Visibility>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type Photo = {
  __typename?: 'Photo';
  albums: Array<PhotosOnAlbums>;
  author?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  exif: Scalars['Json'];
  fileName?: Maybe<Scalars['String']>;
  height: Scalars['Int'];
  id: Scalars['String'];
  mimetype: MimeType;
  size: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  width: Scalars['Int'];
};


export type PhotoAlbumsArgs = {
  after?: InputMaybe<PhotosOnAlbumsWhereUniqueInput>;
  before?: InputMaybe<PhotosOnAlbumsWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateManyAuthorInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  exif?: InputMaybe<Scalars['Json']>;
  fileName?: InputMaybe<Scalars['String']>;
  height: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  mimetype: MimeType;
  size: Scalars['Int'];
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  width: Scalars['Int'];
};

export type PhotoCreateManyAuthorInputEnvelope = {
  data?: InputMaybe<Array<PhotoCreateManyAuthorInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PhotoCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutAuthorInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<PhotoCreateManyAuthorInputEnvelope>;
};

export type PhotoCreateNestedOneWithoutAlbumsInput = {
  connect?: InputMaybe<PhotoWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PhotoCreateOrConnectWithoutAlbumsInput>;
  create?: InputMaybe<PhotoCreateWithoutAlbumsInput>;
};

export type PhotoCreateOrConnectWithoutAlbumsInput = {
  create: PhotoCreateWithoutAlbumsInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoCreateOrConnectWithoutAuthorInput = {
  create: PhotoCreateWithoutAuthorInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoCreateWithoutAlbumsInput = {
  author?: InputMaybe<UserCreateNestedOneWithoutPhotosInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  exif?: InputMaybe<Scalars['Json']>;
  fileName?: InputMaybe<Scalars['String']>;
  height: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  mimetype: MimeType;
  size: Scalars['Int'];
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  width: Scalars['Int'];
};

export type PhotoCreateWithoutAuthorInput = {
  albums?: InputMaybe<PhotosOnAlbumsCreateNestedManyWithoutPhotoInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  exif?: InputMaybe<Scalars['Json']>;
  fileName?: InputMaybe<Scalars['String']>;
  height: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  mimetype: MimeType;
  size: Scalars['Int'];
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  width: Scalars['Int'];
};

export type PhotoListRelationFilter = {
  every?: InputMaybe<PhotoWhereInput>;
  none?: InputMaybe<PhotoWhereInput>;
  some?: InputMaybe<PhotoWhereInput>;
};

export type PhotoOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PhotoOrderByWithRelationInput = {
  albums?: InputMaybe<PhotosOnAlbumsOrderByRelationAggregateInput>;
  author?: InputMaybe<UserOrderByWithRelationInput>;
  authorId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  exif?: InputMaybe<SortOrder>;
  fileName?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mimetype?: InputMaybe<SortOrder>;
  size?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export type PhotoScalarWhereInput = {
  AND?: InputMaybe<Array<PhotoScalarWhereInput>>;
  NOT?: InputMaybe<Array<PhotoScalarWhereInput>>;
  OR?: InputMaybe<Array<PhotoScalarWhereInput>>;
  authorId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  fileName?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  mimetype?: InputMaybe<EnumMimeTypeFilter>;
  size?: InputMaybe<IntFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  width?: InputMaybe<IntFilter>;
};

export type PhotoUpdateInput = {
  albums?: InputMaybe<PhotosOnAlbumsUpdateManyWithoutPhotoInput>;
  author?: InputMaybe<UserUpdateOneWithoutPhotosInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  exif?: InputMaybe<Scalars['Json']>;
  fileName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  height?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mimetype?: InputMaybe<EnumMimeTypeFieldUpdateOperationsInput>;
  size?: InputMaybe<IntFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  width?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type PhotoUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  exif?: InputMaybe<Scalars['Json']>;
  fileName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  height?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mimetype?: InputMaybe<EnumMimeTypeFieldUpdateOperationsInput>;
  size?: InputMaybe<IntFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  width?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type PhotoUpdateManyWithWhereWithoutAuthorInput = {
  data: PhotoUpdateManyMutationInput;
  where: PhotoScalarWhereInput;
};

export type PhotoUpdateManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutAuthorInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<PhotoCreateManyAuthorInputEnvelope>;
  delete?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhotoScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  set?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  update?: InputMaybe<Array<PhotoUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: InputMaybe<Array<PhotoUpdateManyWithWhereWithoutAuthorInput>>;
  upsert?: InputMaybe<Array<PhotoUpsertWithWhereUniqueWithoutAuthorInput>>;
};

export type PhotoUpdateOneRequiredWithoutAlbumsInput = {
  connect?: InputMaybe<PhotoWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PhotoCreateOrConnectWithoutAlbumsInput>;
  create?: InputMaybe<PhotoCreateWithoutAlbumsInput>;
  update?: InputMaybe<PhotoUpdateWithoutAlbumsInput>;
  upsert?: InputMaybe<PhotoUpsertWithoutAlbumsInput>;
};

export type PhotoUpdateWithWhereUniqueWithoutAuthorInput = {
  data: PhotoUpdateWithoutAuthorInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoUpdateWithoutAlbumsInput = {
  author?: InputMaybe<UserUpdateOneWithoutPhotosInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  exif?: InputMaybe<Scalars['Json']>;
  fileName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  height?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mimetype?: InputMaybe<EnumMimeTypeFieldUpdateOperationsInput>;
  size?: InputMaybe<IntFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  width?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type PhotoUpdateWithoutAuthorInput = {
  albums?: InputMaybe<PhotosOnAlbumsUpdateManyWithoutPhotoInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  exif?: InputMaybe<Scalars['Json']>;
  fileName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  height?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mimetype?: InputMaybe<EnumMimeTypeFieldUpdateOperationsInput>;
  size?: InputMaybe<IntFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  width?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type PhotoUpsertWithWhereUniqueWithoutAuthorInput = {
  create: PhotoCreateWithoutAuthorInput;
  update: PhotoUpdateWithoutAuthorInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoUpsertWithoutAlbumsInput = {
  create: PhotoCreateWithoutAlbumsInput;
  update: PhotoUpdateWithoutAlbumsInput;
};

export type PhotoWhereInput = {
  AND?: InputMaybe<Array<PhotoWhereInput>>;
  NOT?: InputMaybe<Array<PhotoWhereInput>>;
  OR?: InputMaybe<Array<PhotoWhereInput>>;
  albums?: InputMaybe<PhotosOnAlbumsListRelationFilter>;
  author?: InputMaybe<UserWhereInput>;
  authorId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  fileName?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  mimetype?: InputMaybe<EnumMimeTypeFilter>;
  size?: InputMaybe<IntFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  width?: InputMaybe<IntFilter>;
};

export type PhotoWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type PhotosOnAlbums = {
  __typename?: 'PhotosOnAlbums';
  addedAt: Scalars['DateTime'];
  album: Album;
  comments: Array<Comment>;
  photo: Photo;
};


export type PhotosOnAlbumsCommentsArgs = {
  after?: InputMaybe<CommentWhereUniqueInput>;
  before?: InputMaybe<CommentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PhotosOnAlbumsAlbumIdPhotoIdCompoundUniqueInput = {
  albumId: Scalars['String'];
  photoId: Scalars['String'];
};

export type PhotosOnAlbumsCreateInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  album: AlbumCreateNestedOneWithoutPhotosInput;
  comments?: InputMaybe<CommentCreateNestedManyWithoutPhotoInput>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPhotoInput>;
  photo: PhotoCreateNestedOneWithoutAlbumsInput;
};

export type PhotosOnAlbumsCreateManyAlbumInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  photoId: Scalars['String'];
};

export type PhotosOnAlbumsCreateManyAlbumInputEnvelope = {
  data?: InputMaybe<Array<PhotosOnAlbumsCreateManyAlbumInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PhotosOnAlbumsCreateManyPhotoInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  albumId: Scalars['String'];
};

export type PhotosOnAlbumsCreateManyPhotoInputEnvelope = {
  data?: InputMaybe<Array<PhotosOnAlbumsCreateManyPhotoInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PhotosOnAlbumsCreateNestedManyWithoutAlbumInput = {
  connect?: InputMaybe<Array<PhotosOnAlbumsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotosOnAlbumsCreateOrConnectWithoutAlbumInput>>;
  create?: InputMaybe<Array<PhotosOnAlbumsCreateWithoutAlbumInput>>;
  createMany?: InputMaybe<PhotosOnAlbumsCreateManyAlbumInputEnvelope>;
};

export type PhotosOnAlbumsCreateNestedManyWithoutPhotoInput = {
  connect?: InputMaybe<Array<PhotosOnAlbumsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotosOnAlbumsCreateOrConnectWithoutPhotoInput>>;
  create?: InputMaybe<Array<PhotosOnAlbumsCreateWithoutPhotoInput>>;
  createMany?: InputMaybe<PhotosOnAlbumsCreateManyPhotoInputEnvelope>;
};

export type PhotosOnAlbumsCreateNestedOneWithoutCommentsInput = {
  connect?: InputMaybe<PhotosOnAlbumsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PhotosOnAlbumsCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<PhotosOnAlbumsCreateWithoutCommentsInput>;
};

export type PhotosOnAlbumsCreateNestedOneWithoutLikesInput = {
  connect?: InputMaybe<PhotosOnAlbumsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PhotosOnAlbumsCreateOrConnectWithoutLikesInput>;
  create?: InputMaybe<PhotosOnAlbumsCreateWithoutLikesInput>;
};

export type PhotosOnAlbumsCreateOrConnectWithoutAlbumInput = {
  create: PhotosOnAlbumsCreateWithoutAlbumInput;
  where: PhotosOnAlbumsWhereUniqueInput;
};

export type PhotosOnAlbumsCreateOrConnectWithoutCommentsInput = {
  create: PhotosOnAlbumsCreateWithoutCommentsInput;
  where: PhotosOnAlbumsWhereUniqueInput;
};

export type PhotosOnAlbumsCreateOrConnectWithoutLikesInput = {
  create: PhotosOnAlbumsCreateWithoutLikesInput;
  where: PhotosOnAlbumsWhereUniqueInput;
};

export type PhotosOnAlbumsCreateOrConnectWithoutPhotoInput = {
  create: PhotosOnAlbumsCreateWithoutPhotoInput;
  where: PhotosOnAlbumsWhereUniqueInput;
};

export type PhotosOnAlbumsCreateWithoutAlbumInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutPhotoInput>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPhotoInput>;
  photo: PhotoCreateNestedOneWithoutAlbumsInput;
};

export type PhotosOnAlbumsCreateWithoutCommentsInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  album: AlbumCreateNestedOneWithoutPhotosInput;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPhotoInput>;
  photo: PhotoCreateNestedOneWithoutAlbumsInput;
};

export type PhotosOnAlbumsCreateWithoutLikesInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  album: AlbumCreateNestedOneWithoutPhotosInput;
  comments?: InputMaybe<CommentCreateNestedManyWithoutPhotoInput>;
  photo: PhotoCreateNestedOneWithoutAlbumsInput;
};

export type PhotosOnAlbumsCreateWithoutPhotoInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  album: AlbumCreateNestedOneWithoutPhotosInput;
  comments?: InputMaybe<CommentCreateNestedManyWithoutPhotoInput>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPhotoInput>;
};

export type PhotosOnAlbumsListRelationFilter = {
  every?: InputMaybe<PhotosOnAlbumsWhereInput>;
  none?: InputMaybe<PhotosOnAlbumsWhereInput>;
  some?: InputMaybe<PhotosOnAlbumsWhereInput>;
};

export type PhotosOnAlbumsOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PhotosOnAlbumsOrderByWithRelationInput = {
  addedAt?: InputMaybe<SortOrder>;
  album?: InputMaybe<AlbumOrderByWithRelationInput>;
  albumId?: InputMaybe<SortOrder>;
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  likes?: InputMaybe<LikeOrderByRelationAggregateInput>;
  photo?: InputMaybe<PhotoOrderByWithRelationInput>;
  photoId?: InputMaybe<SortOrder>;
};

export type PhotosOnAlbumsScalarWhereInput = {
  AND?: InputMaybe<Array<PhotosOnAlbumsScalarWhereInput>>;
  NOT?: InputMaybe<Array<PhotosOnAlbumsScalarWhereInput>>;
  OR?: InputMaybe<Array<PhotosOnAlbumsScalarWhereInput>>;
  addedAt?: InputMaybe<DateTimeFilter>;
  albumId?: InputMaybe<StringFilter>;
  photoId?: InputMaybe<StringFilter>;
};

export type PhotosOnAlbumsUpdateInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  album?: InputMaybe<AlbumUpdateOneRequiredWithoutPhotosInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPhotoInput>;
  likes?: InputMaybe<LikeUpdateManyWithoutPhotoInput>;
  photo?: InputMaybe<PhotoUpdateOneRequiredWithoutAlbumsInput>;
};

export type PhotosOnAlbumsUpdateManyMutationInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PhotosOnAlbumsUpdateManyWithWhereWithoutAlbumInput = {
  data: PhotosOnAlbumsUpdateManyMutationInput;
  where: PhotosOnAlbumsScalarWhereInput;
};

export type PhotosOnAlbumsUpdateManyWithWhereWithoutPhotoInput = {
  data: PhotosOnAlbumsUpdateManyMutationInput;
  where: PhotosOnAlbumsScalarWhereInput;
};

export type PhotosOnAlbumsUpdateManyWithoutAlbumInput = {
  connect?: InputMaybe<Array<PhotosOnAlbumsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotosOnAlbumsCreateOrConnectWithoutAlbumInput>>;
  create?: InputMaybe<Array<PhotosOnAlbumsCreateWithoutAlbumInput>>;
  createMany?: InputMaybe<PhotosOnAlbumsCreateManyAlbumInputEnvelope>;
  delete?: InputMaybe<Array<PhotosOnAlbumsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhotosOnAlbumsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhotosOnAlbumsWhereUniqueInput>>;
  set?: InputMaybe<Array<PhotosOnAlbumsWhereUniqueInput>>;
  update?: InputMaybe<Array<PhotosOnAlbumsUpdateWithWhereUniqueWithoutAlbumInput>>;
  updateMany?: InputMaybe<Array<PhotosOnAlbumsUpdateManyWithWhereWithoutAlbumInput>>;
  upsert?: InputMaybe<Array<PhotosOnAlbumsUpsertWithWhereUniqueWithoutAlbumInput>>;
};

export type PhotosOnAlbumsUpdateManyWithoutPhotoInput = {
  connect?: InputMaybe<Array<PhotosOnAlbumsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotosOnAlbumsCreateOrConnectWithoutPhotoInput>>;
  create?: InputMaybe<Array<PhotosOnAlbumsCreateWithoutPhotoInput>>;
  createMany?: InputMaybe<PhotosOnAlbumsCreateManyPhotoInputEnvelope>;
  delete?: InputMaybe<Array<PhotosOnAlbumsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhotosOnAlbumsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhotosOnAlbumsWhereUniqueInput>>;
  set?: InputMaybe<Array<PhotosOnAlbumsWhereUniqueInput>>;
  update?: InputMaybe<Array<PhotosOnAlbumsUpdateWithWhereUniqueWithoutPhotoInput>>;
  updateMany?: InputMaybe<Array<PhotosOnAlbumsUpdateManyWithWhereWithoutPhotoInput>>;
  upsert?: InputMaybe<Array<PhotosOnAlbumsUpsertWithWhereUniqueWithoutPhotoInput>>;
};

export type PhotosOnAlbumsUpdateOneRequiredWithoutCommentsInput = {
  connect?: InputMaybe<PhotosOnAlbumsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PhotosOnAlbumsCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<PhotosOnAlbumsCreateWithoutCommentsInput>;
  update?: InputMaybe<PhotosOnAlbumsUpdateWithoutCommentsInput>;
  upsert?: InputMaybe<PhotosOnAlbumsUpsertWithoutCommentsInput>;
};

export type PhotosOnAlbumsUpdateOneRequiredWithoutLikesInput = {
  connect?: InputMaybe<PhotosOnAlbumsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PhotosOnAlbumsCreateOrConnectWithoutLikesInput>;
  create?: InputMaybe<PhotosOnAlbumsCreateWithoutLikesInput>;
  update?: InputMaybe<PhotosOnAlbumsUpdateWithoutLikesInput>;
  upsert?: InputMaybe<PhotosOnAlbumsUpsertWithoutLikesInput>;
};

export type PhotosOnAlbumsUpdateWithWhereUniqueWithoutAlbumInput = {
  data: PhotosOnAlbumsUpdateWithoutAlbumInput;
  where: PhotosOnAlbumsWhereUniqueInput;
};

export type PhotosOnAlbumsUpdateWithWhereUniqueWithoutPhotoInput = {
  data: PhotosOnAlbumsUpdateWithoutPhotoInput;
  where: PhotosOnAlbumsWhereUniqueInput;
};

export type PhotosOnAlbumsUpdateWithoutAlbumInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPhotoInput>;
  likes?: InputMaybe<LikeUpdateManyWithoutPhotoInput>;
  photo?: InputMaybe<PhotoUpdateOneRequiredWithoutAlbumsInput>;
};

export type PhotosOnAlbumsUpdateWithoutCommentsInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  album?: InputMaybe<AlbumUpdateOneRequiredWithoutPhotosInput>;
  likes?: InputMaybe<LikeUpdateManyWithoutPhotoInput>;
  photo?: InputMaybe<PhotoUpdateOneRequiredWithoutAlbumsInput>;
};

export type PhotosOnAlbumsUpdateWithoutLikesInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  album?: InputMaybe<AlbumUpdateOneRequiredWithoutPhotosInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPhotoInput>;
  photo?: InputMaybe<PhotoUpdateOneRequiredWithoutAlbumsInput>;
};

export type PhotosOnAlbumsUpdateWithoutPhotoInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  album?: InputMaybe<AlbumUpdateOneRequiredWithoutPhotosInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPhotoInput>;
  likes?: InputMaybe<LikeUpdateManyWithoutPhotoInput>;
};

export type PhotosOnAlbumsUpsertWithWhereUniqueWithoutAlbumInput = {
  create: PhotosOnAlbumsCreateWithoutAlbumInput;
  update: PhotosOnAlbumsUpdateWithoutAlbumInput;
  where: PhotosOnAlbumsWhereUniqueInput;
};

export type PhotosOnAlbumsUpsertWithWhereUniqueWithoutPhotoInput = {
  create: PhotosOnAlbumsCreateWithoutPhotoInput;
  update: PhotosOnAlbumsUpdateWithoutPhotoInput;
  where: PhotosOnAlbumsWhereUniqueInput;
};

export type PhotosOnAlbumsUpsertWithoutCommentsInput = {
  create: PhotosOnAlbumsCreateWithoutCommentsInput;
  update: PhotosOnAlbumsUpdateWithoutCommentsInput;
};

export type PhotosOnAlbumsUpsertWithoutLikesInput = {
  create: PhotosOnAlbumsCreateWithoutLikesInput;
  update: PhotosOnAlbumsUpdateWithoutLikesInput;
};

export type PhotosOnAlbumsWhereInput = {
  AND?: InputMaybe<Array<PhotosOnAlbumsWhereInput>>;
  NOT?: InputMaybe<Array<PhotosOnAlbumsWhereInput>>;
  OR?: InputMaybe<Array<PhotosOnAlbumsWhereInput>>;
  addedAt?: InputMaybe<DateTimeFilter>;
  album?: InputMaybe<AlbumWhereInput>;
  albumId?: InputMaybe<StringFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  likes?: InputMaybe<LikeListRelationFilter>;
  photo?: InputMaybe<PhotoWhereInput>;
  photoId?: InputMaybe<StringFilter>;
};

export type PhotosOnAlbumsWhereUniqueInput = {
  albumId_photoId?: InputMaybe<PhotosOnAlbumsAlbumIdPhotoIdCompoundUniqueInput>;
};

export type Query = {
  __typename?: 'Query';
  album?: Maybe<Album>;
  albums: Array<Album>;
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  currentUser?: Maybe<User>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryAlbumArgs = {
  where: AlbumWhereUniqueInput;
};


export type QueryAlbumsArgs = {
  after?: InputMaybe<AlbumWhereUniqueInput>;
  before?: InputMaybe<AlbumWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AlbumOrderByWithRelationInput>>;
  where?: InputMaybe<AlbumWhereInput>;
};


export type QueryCommentArgs = {
  where: CommentWhereUniqueInput;
};


export type QueryCommentsArgs = {
  after?: InputMaybe<CommentWhereUniqueInput>;
  before?: InputMaybe<CommentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CommentOrderByWithRelationInput>>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  after?: InputMaybe<UserWhereUniqueInput>;
  before?: InputMaybe<UserWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  filename?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  albums: Array<Album>;
  comments: Array<Comment>;
  email: Scalars['String'];
  id: Scalars['String'];
  photos: Array<Photo>;
  sharedAlbums: Array<UsersOnAlbums>;
  username: Scalars['String'];
};


export type UserAlbumsArgs = {
  after?: InputMaybe<AlbumWhereUniqueInput>;
  before?: InputMaybe<AlbumWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserCommentsArgs = {
  after?: InputMaybe<CommentWhereUniqueInput>;
  before?: InputMaybe<CommentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserPhotosArgs = {
  after?: InputMaybe<PhotoWhereUniqueInput>;
  before?: InputMaybe<PhotoWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserSharedAlbumsArgs = {
  after?: InputMaybe<UsersOnAlbumsWhereUniqueInput>;
  before?: InputMaybe<UsersOnAlbumsWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UserCreateNestedOneWithoutAlbumsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAlbumsInput>;
  create?: InputMaybe<UserCreateWithoutAlbumsInput>;
};

export type UserCreateNestedOneWithoutCommentsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<UserCreateWithoutCommentsInput>;
};

export type UserCreateNestedOneWithoutLikeInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutLikeInput>;
  create?: InputMaybe<UserCreateWithoutLikeInput>;
};

export type UserCreateNestedOneWithoutPhotosInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<UserCreateWithoutPhotosInput>;
};

export type UserCreateNestedOneWithoutSharedAlbumsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutSharedAlbumsInput>;
  create?: InputMaybe<UserCreateWithoutSharedAlbumsInput>;
};

export type UserCreateOrConnectWithoutAlbumsInput = {
  create: UserCreateWithoutAlbumsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutCommentsInput = {
  create: UserCreateWithoutCommentsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutLikeInput = {
  create: UserCreateWithoutLikeInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutPhotosInput = {
  create: UserCreateWithoutPhotosInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutSharedAlbumsInput = {
  create: UserCreateWithoutSharedAlbumsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutAlbumsInput = {
  Like?: InputMaybe<LikeCreateNestedManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  photos?: InputMaybe<PhotoCreateNestedManyWithoutAuthorInput>;
  sharedAlbums?: InputMaybe<UsersOnAlbumsCreateNestedManyWithoutUserInput>;
  username: Scalars['String'];
};

export type UserCreateWithoutCommentsInput = {
  Like?: InputMaybe<LikeCreateNestedManyWithoutAuthorInput>;
  albums?: InputMaybe<AlbumCreateNestedManyWithoutAuthorInput>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  photos?: InputMaybe<PhotoCreateNestedManyWithoutAuthorInput>;
  sharedAlbums?: InputMaybe<UsersOnAlbumsCreateNestedManyWithoutUserInput>;
  username: Scalars['String'];
};

export type UserCreateWithoutLikeInput = {
  albums?: InputMaybe<AlbumCreateNestedManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  photos?: InputMaybe<PhotoCreateNestedManyWithoutAuthorInput>;
  sharedAlbums?: InputMaybe<UsersOnAlbumsCreateNestedManyWithoutUserInput>;
  username: Scalars['String'];
};

export type UserCreateWithoutPhotosInput = {
  Like?: InputMaybe<LikeCreateNestedManyWithoutAuthorInput>;
  albums?: InputMaybe<AlbumCreateNestedManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  sharedAlbums?: InputMaybe<UsersOnAlbumsCreateNestedManyWithoutUserInput>;
  username: Scalars['String'];
};

export type UserCreateWithoutSharedAlbumsInput = {
  Like?: InputMaybe<LikeCreateNestedManyWithoutAuthorInput>;
  albums?: InputMaybe<AlbumCreateNestedManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  photos?: InputMaybe<PhotoCreateNestedManyWithoutAuthorInput>;
  username: Scalars['String'];
};

export type UserOrderByWithRelationInput = {
  Like?: InputMaybe<LikeOrderByRelationAggregateInput>;
  albums?: InputMaybe<AlbumOrderByRelationAggregateInput>;
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  photos?: InputMaybe<PhotoOrderByRelationAggregateInput>;
  sharedAlbums?: InputMaybe<UsersOnAlbumsOrderByRelationAggregateInput>;
  username?: InputMaybe<SortOrder>;
};

export type UserUpdateInput = {
  Like?: InputMaybe<LikeUpdateManyWithoutAuthorInput>;
  albums?: InputMaybe<AlbumUpdateManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutAuthorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutAuthorInput>;
  sharedAlbums?: InputMaybe<UsersOnAlbumsUpdateManyWithoutUserInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateOneRequiredWithoutAlbumsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAlbumsInput>;
  create?: InputMaybe<UserCreateWithoutAlbumsInput>;
  update?: InputMaybe<UserUpdateWithoutAlbumsInput>;
  upsert?: InputMaybe<UserUpsertWithoutAlbumsInput>;
};

export type UserUpdateOneRequiredWithoutCommentsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<UserCreateWithoutCommentsInput>;
  update?: InputMaybe<UserUpdateWithoutCommentsInput>;
  upsert?: InputMaybe<UserUpsertWithoutCommentsInput>;
};

export type UserUpdateOneRequiredWithoutLikeInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutLikeInput>;
  create?: InputMaybe<UserCreateWithoutLikeInput>;
  update?: InputMaybe<UserUpdateWithoutLikeInput>;
  upsert?: InputMaybe<UserUpsertWithoutLikeInput>;
};

export type UserUpdateOneRequiredWithoutSharedAlbumsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutSharedAlbumsInput>;
  create?: InputMaybe<UserCreateWithoutSharedAlbumsInput>;
  update?: InputMaybe<UserUpdateWithoutSharedAlbumsInput>;
  upsert?: InputMaybe<UserUpsertWithoutSharedAlbumsInput>;
};

export type UserUpdateOneWithoutPhotosInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<UserCreateWithoutPhotosInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUpdateWithoutPhotosInput>;
  upsert?: InputMaybe<UserUpsertWithoutPhotosInput>;
};

export type UserUpdateWithoutAlbumsInput = {
  Like?: InputMaybe<LikeUpdateManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutAuthorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutAuthorInput>;
  sharedAlbums?: InputMaybe<UsersOnAlbumsUpdateManyWithoutUserInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutCommentsInput = {
  Like?: InputMaybe<LikeUpdateManyWithoutAuthorInput>;
  albums?: InputMaybe<AlbumUpdateManyWithoutAuthorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutAuthorInput>;
  sharedAlbums?: InputMaybe<UsersOnAlbumsUpdateManyWithoutUserInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutLikeInput = {
  albums?: InputMaybe<AlbumUpdateManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutAuthorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutAuthorInput>;
  sharedAlbums?: InputMaybe<UsersOnAlbumsUpdateManyWithoutUserInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutPhotosInput = {
  Like?: InputMaybe<LikeUpdateManyWithoutAuthorInput>;
  albums?: InputMaybe<AlbumUpdateManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutAuthorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  sharedAlbums?: InputMaybe<UsersOnAlbumsUpdateManyWithoutUserInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutSharedAlbumsInput = {
  Like?: InputMaybe<LikeUpdateManyWithoutAuthorInput>;
  albums?: InputMaybe<AlbumUpdateManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutAuthorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutAuthorInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpsertWithoutAlbumsInput = {
  create: UserCreateWithoutAlbumsInput;
  update: UserUpdateWithoutAlbumsInput;
};

export type UserUpsertWithoutCommentsInput = {
  create: UserCreateWithoutCommentsInput;
  update: UserUpdateWithoutCommentsInput;
};

export type UserUpsertWithoutLikeInput = {
  create: UserCreateWithoutLikeInput;
  update: UserUpdateWithoutLikeInput;
};

export type UserUpsertWithoutPhotosInput = {
  create: UserCreateWithoutPhotosInput;
  update: UserUpdateWithoutPhotosInput;
};

export type UserUpsertWithoutSharedAlbumsInput = {
  create: UserCreateWithoutSharedAlbumsInput;
  update: UserUpdateWithoutSharedAlbumsInput;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  Like?: InputMaybe<LikeListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  albums?: InputMaybe<AlbumListRelationFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringFilter>;
  photos?: InputMaybe<PhotoListRelationFilter>;
  sharedAlbums?: InputMaybe<UsersOnAlbumsListRelationFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersOnAlbums = {
  __typename?: 'UsersOnAlbums';
  addedAt: Scalars['DateTime'];
  album: Album;
  role: AlbumRole;
  user: User;
};

export type UsersOnAlbumsAlbumIdUserIdCompoundUniqueInput = {
  albumId: Scalars['String'];
  userId: Scalars['String'];
};

export type UsersOnAlbumsCreateManyAlbumInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  role?: InputMaybe<AlbumRole>;
  userId: Scalars['String'];
};

export type UsersOnAlbumsCreateManyAlbumInputEnvelope = {
  data?: InputMaybe<Array<UsersOnAlbumsCreateManyAlbumInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UsersOnAlbumsCreateManyUserInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  albumId: Scalars['String'];
  role?: InputMaybe<AlbumRole>;
};

export type UsersOnAlbumsCreateManyUserInputEnvelope = {
  data?: InputMaybe<Array<UsersOnAlbumsCreateManyUserInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UsersOnAlbumsCreateNestedManyWithoutAlbumInput = {
  connect?: InputMaybe<Array<UsersOnAlbumsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UsersOnAlbumsCreateOrConnectWithoutAlbumInput>>;
  create?: InputMaybe<Array<UsersOnAlbumsCreateWithoutAlbumInput>>;
  createMany?: InputMaybe<UsersOnAlbumsCreateManyAlbumInputEnvelope>;
};

export type UsersOnAlbumsCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UsersOnAlbumsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UsersOnAlbumsCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UsersOnAlbumsCreateWithoutUserInput>>;
  createMany?: InputMaybe<UsersOnAlbumsCreateManyUserInputEnvelope>;
};

export type UsersOnAlbumsCreateOrConnectWithoutAlbumInput = {
  create: UsersOnAlbumsCreateWithoutAlbumInput;
  where: UsersOnAlbumsWhereUniqueInput;
};

export type UsersOnAlbumsCreateOrConnectWithoutUserInput = {
  create: UsersOnAlbumsCreateWithoutUserInput;
  where: UsersOnAlbumsWhereUniqueInput;
};

export type UsersOnAlbumsCreateWithoutAlbumInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  role?: InputMaybe<AlbumRole>;
  user: UserCreateNestedOneWithoutSharedAlbumsInput;
};

export type UsersOnAlbumsCreateWithoutUserInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  album: AlbumCreateNestedOneWithoutMembersInput;
  role?: InputMaybe<AlbumRole>;
};

export type UsersOnAlbumsListRelationFilter = {
  every?: InputMaybe<UsersOnAlbumsWhereInput>;
  none?: InputMaybe<UsersOnAlbumsWhereInput>;
  some?: InputMaybe<UsersOnAlbumsWhereInput>;
};

export type UsersOnAlbumsOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UsersOnAlbumsScalarWhereInput = {
  AND?: InputMaybe<Array<UsersOnAlbumsScalarWhereInput>>;
  NOT?: InputMaybe<Array<UsersOnAlbumsScalarWhereInput>>;
  OR?: InputMaybe<Array<UsersOnAlbumsScalarWhereInput>>;
  addedAt?: InputMaybe<DateTimeFilter>;
  albumId?: InputMaybe<StringFilter>;
  role?: InputMaybe<EnumAlbumRoleFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UsersOnAlbumsUpdateManyMutationInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumAlbumRoleFieldUpdateOperationsInput>;
};

export type UsersOnAlbumsUpdateManyWithWhereWithoutAlbumInput = {
  data: UsersOnAlbumsUpdateManyMutationInput;
  where: UsersOnAlbumsScalarWhereInput;
};

export type UsersOnAlbumsUpdateManyWithWhereWithoutUserInput = {
  data: UsersOnAlbumsUpdateManyMutationInput;
  where: UsersOnAlbumsScalarWhereInput;
};

export type UsersOnAlbumsUpdateManyWithoutAlbumInput = {
  connect?: InputMaybe<Array<UsersOnAlbumsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UsersOnAlbumsCreateOrConnectWithoutAlbumInput>>;
  create?: InputMaybe<Array<UsersOnAlbumsCreateWithoutAlbumInput>>;
  createMany?: InputMaybe<UsersOnAlbumsCreateManyAlbumInputEnvelope>;
  delete?: InputMaybe<Array<UsersOnAlbumsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UsersOnAlbumsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UsersOnAlbumsWhereUniqueInput>>;
  set?: InputMaybe<Array<UsersOnAlbumsWhereUniqueInput>>;
  update?: InputMaybe<Array<UsersOnAlbumsUpdateWithWhereUniqueWithoutAlbumInput>>;
  updateMany?: InputMaybe<Array<UsersOnAlbumsUpdateManyWithWhereWithoutAlbumInput>>;
  upsert?: InputMaybe<Array<UsersOnAlbumsUpsertWithWhereUniqueWithoutAlbumInput>>;
};

export type UsersOnAlbumsUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<UsersOnAlbumsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UsersOnAlbumsCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UsersOnAlbumsCreateWithoutUserInput>>;
  createMany?: InputMaybe<UsersOnAlbumsCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<UsersOnAlbumsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UsersOnAlbumsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UsersOnAlbumsWhereUniqueInput>>;
  set?: InputMaybe<Array<UsersOnAlbumsWhereUniqueInput>>;
  update?: InputMaybe<Array<UsersOnAlbumsUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<UsersOnAlbumsUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<UsersOnAlbumsUpsertWithWhereUniqueWithoutUserInput>>;
};

export type UsersOnAlbumsUpdateWithWhereUniqueWithoutAlbumInput = {
  data: UsersOnAlbumsUpdateWithoutAlbumInput;
  where: UsersOnAlbumsWhereUniqueInput;
};

export type UsersOnAlbumsUpdateWithWhereUniqueWithoutUserInput = {
  data: UsersOnAlbumsUpdateWithoutUserInput;
  where: UsersOnAlbumsWhereUniqueInput;
};

export type UsersOnAlbumsUpdateWithoutAlbumInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumAlbumRoleFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutSharedAlbumsInput>;
};

export type UsersOnAlbumsUpdateWithoutUserInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  album?: InputMaybe<AlbumUpdateOneRequiredWithoutMembersInput>;
  role?: InputMaybe<EnumAlbumRoleFieldUpdateOperationsInput>;
};

export type UsersOnAlbumsUpsertWithWhereUniqueWithoutAlbumInput = {
  create: UsersOnAlbumsCreateWithoutAlbumInput;
  update: UsersOnAlbumsUpdateWithoutAlbumInput;
  where: UsersOnAlbumsWhereUniqueInput;
};

export type UsersOnAlbumsUpsertWithWhereUniqueWithoutUserInput = {
  create: UsersOnAlbumsCreateWithoutUserInput;
  update: UsersOnAlbumsUpdateWithoutUserInput;
  where: UsersOnAlbumsWhereUniqueInput;
};

export type UsersOnAlbumsWhereInput = {
  AND?: InputMaybe<Array<UsersOnAlbumsWhereInput>>;
  NOT?: InputMaybe<Array<UsersOnAlbumsWhereInput>>;
  OR?: InputMaybe<Array<UsersOnAlbumsWhereInput>>;
  addedAt?: InputMaybe<DateTimeFilter>;
  album?: InputMaybe<AlbumWhereInput>;
  albumId?: InputMaybe<StringFilter>;
  role?: InputMaybe<EnumAlbumRoleFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type UsersOnAlbumsWhereUniqueInput = {
  albumId_userId?: InputMaybe<UsersOnAlbumsAlbumIdUserIdCompoundUniqueInput>;
};

/** User visibility of an album */
export enum Visibility {
  Link = 'LINK',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CurrentUserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQueryQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, username: string, email: string } | null | undefined };

export type SignupMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'User', id: string, username: string, email: string } | null | undefined };


export const CurrentUserQueryDocument = gql`
    query currentUserQuery {
  currentUser {
    id
    username
    email
  }
}
    `;
export const SignupDocument = gql`
    mutation Signup($username: String!, $password: String!, $email: String!) {
  signup(username: $username, password: $password, email: $email) {
    id
    username
    email
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    currentUserQuery(variables?: CurrentUserQueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CurrentUserQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrentUserQueryQuery>(CurrentUserQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'currentUserQuery');
    },
    Signup(variables: SignupMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SignupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignupMutation>(SignupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Signup');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;