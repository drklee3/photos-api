import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
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
  members: Array<UserOnAlbum>;
  photos: Array<PhotoOnAlbum>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  viewCount: Scalars['Int'];
  visibility: Visibility;
};


export type AlbumMembersArgs = {
  after?: InputMaybe<UserOnAlbumWhereUniqueInput>;
  before?: InputMaybe<UserOnAlbumWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type AlbumPhotosArgs = {
  after?: InputMaybe<PhotoOnAlbumWhereUniqueInput>;
  before?: InputMaybe<PhotoOnAlbumWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AlbumCreateInput = {
  author: UserCreateNestedOneWithoutAlbumsInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<UserOnAlbumCreateNestedManyWithoutAlbumInput>;
  photos?: InputMaybe<PhotoOnAlbumCreateNestedManyWithoutAlbumInput>;
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
  members?: InputMaybe<UserOnAlbumCreateNestedManyWithoutAlbumInput>;
  photos?: InputMaybe<PhotoOnAlbumCreateNestedManyWithoutAlbumInput>;
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
  photos?: InputMaybe<PhotoOnAlbumCreateNestedManyWithoutAlbumInput>;
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
  members?: InputMaybe<UserOnAlbumCreateNestedManyWithoutAlbumInput>;
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
  members?: InputMaybe<UserOnAlbumOrderByRelationAggregateInput>;
  photos?: InputMaybe<PhotoOnAlbumOrderByRelationAggregateInput>;
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
  members?: InputMaybe<UserOnAlbumUpdateManyWithoutAlbumInput>;
  photos?: InputMaybe<PhotoOnAlbumUpdateManyWithoutAlbumInput>;
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
  members?: InputMaybe<UserOnAlbumUpdateManyWithoutAlbumInput>;
  photos?: InputMaybe<PhotoOnAlbumUpdateManyWithoutAlbumInput>;
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
  photos?: InputMaybe<PhotoOnAlbumUpdateManyWithoutAlbumInput>;
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
  members?: InputMaybe<UserOnAlbumUpdateManyWithoutAlbumInput>;
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
  members?: InputMaybe<UserOnAlbumListRelationFilter>;
  photos?: InputMaybe<PhotoOnAlbumListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  viewCount?: InputMaybe<IntFilter>;
  visibility?: InputMaybe<EnumVisibilityFilter>;
};

export type AlbumWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AuthUser = {
  __typename?: 'AuthUser';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  photo: PhotoOnAlbum;
  updatedAt: Scalars['DateTime'];
};

export type CommentCreateInput = {
  author: UserCreateNestedOneWithoutCommentsInput;
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  photo: PhotoOnAlbumCreateNestedOneWithoutCommentsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CommentCreateManyAuthorInput = {
  PhotoOnAlbumAlbumId: Scalars['String'];
  PhotoOnAlbumPhotoId: Scalars['String'];
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
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
  photo: PhotoOnAlbumCreateNestedOneWithoutCommentsInput;
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
  PhotoOnAlbumAlbumId?: InputMaybe<SortOrder>;
  PhotoOnAlbumPhotoId?: InputMaybe<SortOrder>;
  author?: InputMaybe<UserOrderByWithRelationInput>;
  authorId?: InputMaybe<SortOrder>;
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  photo?: InputMaybe<PhotoOnAlbumOrderByWithRelationInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CommentScalarWhereInput = {
  AND?: InputMaybe<Array<CommentScalarWhereInput>>;
  NOT?: InputMaybe<Array<CommentScalarWhereInput>>;
  OR?: InputMaybe<Array<CommentScalarWhereInput>>;
  PhotoOnAlbumAlbumId?: InputMaybe<StringFilter>;
  PhotoOnAlbumPhotoId?: InputMaybe<StringFilter>;
  authorId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CommentUpdateInput = {
  author?: InputMaybe<UserUpdateOneRequiredWithoutCommentsInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  photo?: InputMaybe<PhotoOnAlbumUpdateOneRequiredWithoutCommentsInput>;
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
  photo?: InputMaybe<PhotoOnAlbumUpdateOneRequiredWithoutCommentsInput>;
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
  PhotoOnAlbumAlbumId?: InputMaybe<StringFilter>;
  PhotoOnAlbumPhotoId?: InputMaybe<StringFilter>;
  author?: InputMaybe<UserWhereInput>;
  authorId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  photo?: InputMaybe<PhotoOnAlbumWhereInput>;
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
  photo: PhotoOnAlbum;
};

export type LikeCreateManyAuthorInput = {
  PhotoOnAlbumAlbumId: Scalars['String'];
  PhotoOnAlbumPhotoId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
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
  photo: PhotoOnAlbumCreateNestedOneWithoutLikesInput;
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
  PhotoOnAlbumAlbumId?: InputMaybe<StringFilter>;
  PhotoOnAlbumPhotoId?: InputMaybe<StringFilter>;
  authorId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
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
  photo?: InputMaybe<PhotoOnAlbumUpdateOneRequiredWithoutLikesInput>;
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
  PhotoOnAlbumAlbumId?: InputMaybe<StringFilter>;
  PhotoOnAlbumPhotoId?: InputMaybe<StringFilter>;
  author?: InputMaybe<UserWhereInput>;
  authorId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  photo?: InputMaybe<PhotoOnAlbumWhereInput>;
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
  createOnePhotoOnAlbum: PhotoOnAlbum;
  deleteOneAlbum?: Maybe<Album>;
  deleteOneComment?: Maybe<Comment>;
  deleteOnePhoto?: Maybe<Photo>;
  deleteOnePhotoOnAlbum?: Maybe<PhotoOnAlbum>;
  deleteOneUser?: Maybe<User>;
  incrementAlbumViewCount?: Maybe<Album>;
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']>;
  shareAlbum?: Maybe<Album>;
  signup?: Maybe<AuthUser>;
  updateOneAlbum?: Maybe<Album>;
  updateOneComment?: Maybe<Comment>;
  updateOnePhoto?: Maybe<Photo>;
  updateOnePhotoOnAlbum?: Maybe<PhotoOnAlbum>;
  updateOneUser?: Maybe<User>;
  uploadPhotos: Array<Photo>;
};


export type MutationCreateOneAlbumArgs = {
  data: AlbumCreateInput;
};


export type MutationCreateOneCommentArgs = {
  data: CommentCreateInput;
};


export type MutationCreateOnePhotoOnAlbumArgs = {
  data: PhotoOnAlbumCreateInput;
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


export type MutationDeleteOnePhotoOnAlbumArgs = {
  where: PhotoOnAlbumWhereUniqueInput;
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


export type MutationUpdateOnePhotoOnAlbumArgs = {
  data: PhotoOnAlbumUpdateInput;
  where: PhotoOnAlbumWhereUniqueInput;
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
  albums: Array<PhotoOnAlbum>;
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
  after?: InputMaybe<PhotoOnAlbumWhereUniqueInput>;
  before?: InputMaybe<PhotoOnAlbumWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateManyAuthorInput = {
  blurHash?: InputMaybe<Scalars['String']>;
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
  blurHash?: InputMaybe<Scalars['String']>;
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
  albums?: InputMaybe<PhotoOnAlbumCreateNestedManyWithoutPhotoInput>;
  blurHash?: InputMaybe<Scalars['String']>;
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

export type PhotoOnAlbum = {
  __typename?: 'PhotoOnAlbum';
  addedAt: Scalars['DateTime'];
  album: Album;
  comments: Array<Comment>;
  likes: Array<Like>;
  photo: Photo;
};


export type PhotoOnAlbumCommentsArgs = {
  after?: InputMaybe<CommentWhereUniqueInput>;
  before?: InputMaybe<CommentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PhotoOnAlbumLikesArgs = {
  after?: InputMaybe<LikeWhereUniqueInput>;
  before?: InputMaybe<LikeWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PhotoOnAlbumAlbumIdPhotoIdCompoundUniqueInput = {
  albumId: Scalars['String'];
  photoId: Scalars['String'];
};

export type PhotoOnAlbumCreateInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  album: AlbumCreateNestedOneWithoutPhotosInput;
  comments?: InputMaybe<CommentCreateNestedManyWithoutPhotoInput>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPhotoInput>;
  photo: PhotoCreateNestedOneWithoutAlbumsInput;
};

export type PhotoOnAlbumCreateManyAlbumInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  photoId: Scalars['String'];
};

export type PhotoOnAlbumCreateManyAlbumInputEnvelope = {
  data?: InputMaybe<Array<PhotoOnAlbumCreateManyAlbumInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PhotoOnAlbumCreateManyPhotoInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  albumId: Scalars['String'];
};

export type PhotoOnAlbumCreateManyPhotoInputEnvelope = {
  data?: InputMaybe<Array<PhotoOnAlbumCreateManyPhotoInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PhotoOnAlbumCreateNestedManyWithoutAlbumInput = {
  connect?: InputMaybe<Array<PhotoOnAlbumWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoOnAlbumCreateOrConnectWithoutAlbumInput>>;
  create?: InputMaybe<Array<PhotoOnAlbumCreateWithoutAlbumInput>>;
  createMany?: InputMaybe<PhotoOnAlbumCreateManyAlbumInputEnvelope>;
};

export type PhotoOnAlbumCreateNestedManyWithoutPhotoInput = {
  connect?: InputMaybe<Array<PhotoOnAlbumWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoOnAlbumCreateOrConnectWithoutPhotoInput>>;
  create?: InputMaybe<Array<PhotoOnAlbumCreateWithoutPhotoInput>>;
  createMany?: InputMaybe<PhotoOnAlbumCreateManyPhotoInputEnvelope>;
};

export type PhotoOnAlbumCreateNestedOneWithoutCommentsInput = {
  connect?: InputMaybe<PhotoOnAlbumWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PhotoOnAlbumCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<PhotoOnAlbumCreateWithoutCommentsInput>;
};

export type PhotoOnAlbumCreateNestedOneWithoutLikesInput = {
  connect?: InputMaybe<PhotoOnAlbumWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PhotoOnAlbumCreateOrConnectWithoutLikesInput>;
  create?: InputMaybe<PhotoOnAlbumCreateWithoutLikesInput>;
};

export type PhotoOnAlbumCreateOrConnectWithoutAlbumInput = {
  create: PhotoOnAlbumCreateWithoutAlbumInput;
  where: PhotoOnAlbumWhereUniqueInput;
};

export type PhotoOnAlbumCreateOrConnectWithoutCommentsInput = {
  create: PhotoOnAlbumCreateWithoutCommentsInput;
  where: PhotoOnAlbumWhereUniqueInput;
};

export type PhotoOnAlbumCreateOrConnectWithoutLikesInput = {
  create: PhotoOnAlbumCreateWithoutLikesInput;
  where: PhotoOnAlbumWhereUniqueInput;
};

export type PhotoOnAlbumCreateOrConnectWithoutPhotoInput = {
  create: PhotoOnAlbumCreateWithoutPhotoInput;
  where: PhotoOnAlbumWhereUniqueInput;
};

export type PhotoOnAlbumCreateWithoutAlbumInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutPhotoInput>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPhotoInput>;
  photo: PhotoCreateNestedOneWithoutAlbumsInput;
};

export type PhotoOnAlbumCreateWithoutCommentsInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  album: AlbumCreateNestedOneWithoutPhotosInput;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPhotoInput>;
  photo: PhotoCreateNestedOneWithoutAlbumsInput;
};

export type PhotoOnAlbumCreateWithoutLikesInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  album: AlbumCreateNestedOneWithoutPhotosInput;
  comments?: InputMaybe<CommentCreateNestedManyWithoutPhotoInput>;
  photo: PhotoCreateNestedOneWithoutAlbumsInput;
};

export type PhotoOnAlbumCreateWithoutPhotoInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  album: AlbumCreateNestedOneWithoutPhotosInput;
  comments?: InputMaybe<CommentCreateNestedManyWithoutPhotoInput>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPhotoInput>;
};

export type PhotoOnAlbumListRelationFilter = {
  every?: InputMaybe<PhotoOnAlbumWhereInput>;
  none?: InputMaybe<PhotoOnAlbumWhereInput>;
  some?: InputMaybe<PhotoOnAlbumWhereInput>;
};

export type PhotoOnAlbumOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PhotoOnAlbumOrderByWithRelationInput = {
  addedAt?: InputMaybe<SortOrder>;
  album?: InputMaybe<AlbumOrderByWithRelationInput>;
  albumId?: InputMaybe<SortOrder>;
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  likes?: InputMaybe<LikeOrderByRelationAggregateInput>;
  photo?: InputMaybe<PhotoOrderByWithRelationInput>;
  photoId?: InputMaybe<SortOrder>;
};

export type PhotoOnAlbumScalarWhereInput = {
  AND?: InputMaybe<Array<PhotoOnAlbumScalarWhereInput>>;
  NOT?: InputMaybe<Array<PhotoOnAlbumScalarWhereInput>>;
  OR?: InputMaybe<Array<PhotoOnAlbumScalarWhereInput>>;
  addedAt?: InputMaybe<DateTimeFilter>;
  albumId?: InputMaybe<StringFilter>;
  photoId?: InputMaybe<StringFilter>;
};

export type PhotoOnAlbumUpdateInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  album?: InputMaybe<AlbumUpdateOneRequiredWithoutPhotosInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPhotoInput>;
  likes?: InputMaybe<LikeUpdateManyWithoutPhotoInput>;
  photo?: InputMaybe<PhotoUpdateOneRequiredWithoutAlbumsInput>;
};

export type PhotoOnAlbumUpdateManyMutationInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PhotoOnAlbumUpdateManyWithWhereWithoutAlbumInput = {
  data: PhotoOnAlbumUpdateManyMutationInput;
  where: PhotoOnAlbumScalarWhereInput;
};

export type PhotoOnAlbumUpdateManyWithWhereWithoutPhotoInput = {
  data: PhotoOnAlbumUpdateManyMutationInput;
  where: PhotoOnAlbumScalarWhereInput;
};

export type PhotoOnAlbumUpdateManyWithoutAlbumInput = {
  connect?: InputMaybe<Array<PhotoOnAlbumWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoOnAlbumCreateOrConnectWithoutAlbumInput>>;
  create?: InputMaybe<Array<PhotoOnAlbumCreateWithoutAlbumInput>>;
  createMany?: InputMaybe<PhotoOnAlbumCreateManyAlbumInputEnvelope>;
  delete?: InputMaybe<Array<PhotoOnAlbumWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhotoOnAlbumScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhotoOnAlbumWhereUniqueInput>>;
  set?: InputMaybe<Array<PhotoOnAlbumWhereUniqueInput>>;
  update?: InputMaybe<Array<PhotoOnAlbumUpdateWithWhereUniqueWithoutAlbumInput>>;
  updateMany?: InputMaybe<Array<PhotoOnAlbumUpdateManyWithWhereWithoutAlbumInput>>;
  upsert?: InputMaybe<Array<PhotoOnAlbumUpsertWithWhereUniqueWithoutAlbumInput>>;
};

export type PhotoOnAlbumUpdateManyWithoutPhotoInput = {
  connect?: InputMaybe<Array<PhotoOnAlbumWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoOnAlbumCreateOrConnectWithoutPhotoInput>>;
  create?: InputMaybe<Array<PhotoOnAlbumCreateWithoutPhotoInput>>;
  createMany?: InputMaybe<PhotoOnAlbumCreateManyPhotoInputEnvelope>;
  delete?: InputMaybe<Array<PhotoOnAlbumWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhotoOnAlbumScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhotoOnAlbumWhereUniqueInput>>;
  set?: InputMaybe<Array<PhotoOnAlbumWhereUniqueInput>>;
  update?: InputMaybe<Array<PhotoOnAlbumUpdateWithWhereUniqueWithoutPhotoInput>>;
  updateMany?: InputMaybe<Array<PhotoOnAlbumUpdateManyWithWhereWithoutPhotoInput>>;
  upsert?: InputMaybe<Array<PhotoOnAlbumUpsertWithWhereUniqueWithoutPhotoInput>>;
};

export type PhotoOnAlbumUpdateOneRequiredWithoutCommentsInput = {
  connect?: InputMaybe<PhotoOnAlbumWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PhotoOnAlbumCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<PhotoOnAlbumCreateWithoutCommentsInput>;
  update?: InputMaybe<PhotoOnAlbumUpdateWithoutCommentsInput>;
  upsert?: InputMaybe<PhotoOnAlbumUpsertWithoutCommentsInput>;
};

export type PhotoOnAlbumUpdateOneRequiredWithoutLikesInput = {
  connect?: InputMaybe<PhotoOnAlbumWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PhotoOnAlbumCreateOrConnectWithoutLikesInput>;
  create?: InputMaybe<PhotoOnAlbumCreateWithoutLikesInput>;
  update?: InputMaybe<PhotoOnAlbumUpdateWithoutLikesInput>;
  upsert?: InputMaybe<PhotoOnAlbumUpsertWithoutLikesInput>;
};

export type PhotoOnAlbumUpdateWithWhereUniqueWithoutAlbumInput = {
  data: PhotoOnAlbumUpdateWithoutAlbumInput;
  where: PhotoOnAlbumWhereUniqueInput;
};

export type PhotoOnAlbumUpdateWithWhereUniqueWithoutPhotoInput = {
  data: PhotoOnAlbumUpdateWithoutPhotoInput;
  where: PhotoOnAlbumWhereUniqueInput;
};

export type PhotoOnAlbumUpdateWithoutAlbumInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPhotoInput>;
  likes?: InputMaybe<LikeUpdateManyWithoutPhotoInput>;
  photo?: InputMaybe<PhotoUpdateOneRequiredWithoutAlbumsInput>;
};

export type PhotoOnAlbumUpdateWithoutCommentsInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  album?: InputMaybe<AlbumUpdateOneRequiredWithoutPhotosInput>;
  likes?: InputMaybe<LikeUpdateManyWithoutPhotoInput>;
  photo?: InputMaybe<PhotoUpdateOneRequiredWithoutAlbumsInput>;
};

export type PhotoOnAlbumUpdateWithoutLikesInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  album?: InputMaybe<AlbumUpdateOneRequiredWithoutPhotosInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPhotoInput>;
  photo?: InputMaybe<PhotoUpdateOneRequiredWithoutAlbumsInput>;
};

export type PhotoOnAlbumUpdateWithoutPhotoInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  album?: InputMaybe<AlbumUpdateOneRequiredWithoutPhotosInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPhotoInput>;
  likes?: InputMaybe<LikeUpdateManyWithoutPhotoInput>;
};

export type PhotoOnAlbumUpsertWithWhereUniqueWithoutAlbumInput = {
  create: PhotoOnAlbumCreateWithoutAlbumInput;
  update: PhotoOnAlbumUpdateWithoutAlbumInput;
  where: PhotoOnAlbumWhereUniqueInput;
};

export type PhotoOnAlbumUpsertWithWhereUniqueWithoutPhotoInput = {
  create: PhotoOnAlbumCreateWithoutPhotoInput;
  update: PhotoOnAlbumUpdateWithoutPhotoInput;
  where: PhotoOnAlbumWhereUniqueInput;
};

export type PhotoOnAlbumUpsertWithoutCommentsInput = {
  create: PhotoOnAlbumCreateWithoutCommentsInput;
  update: PhotoOnAlbumUpdateWithoutCommentsInput;
};

export type PhotoOnAlbumUpsertWithoutLikesInput = {
  create: PhotoOnAlbumCreateWithoutLikesInput;
  update: PhotoOnAlbumUpdateWithoutLikesInput;
};

export type PhotoOnAlbumWhereInput = {
  AND?: InputMaybe<Array<PhotoOnAlbumWhereInput>>;
  NOT?: InputMaybe<Array<PhotoOnAlbumWhereInput>>;
  OR?: InputMaybe<Array<PhotoOnAlbumWhereInput>>;
  addedAt?: InputMaybe<DateTimeFilter>;
  album?: InputMaybe<AlbumWhereInput>;
  albumId?: InputMaybe<StringFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  likes?: InputMaybe<LikeListRelationFilter>;
  photo?: InputMaybe<PhotoWhereInput>;
  photoId?: InputMaybe<StringFilter>;
};

export type PhotoOnAlbumWhereUniqueInput = {
  albumId_photoId?: InputMaybe<PhotoOnAlbumAlbumIdPhotoIdCompoundUniqueInput>;
};

export type PhotoOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PhotoOrderByWithRelationInput = {
  albums?: InputMaybe<PhotoOnAlbumOrderByRelationAggregateInput>;
  author?: InputMaybe<UserOrderByWithRelationInput>;
  authorId?: InputMaybe<SortOrder>;
  blurHash?: InputMaybe<SortOrder>;
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
  blurHash?: InputMaybe<StringNullableFilter>;
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
  albums?: InputMaybe<PhotoOnAlbumUpdateManyWithoutPhotoInput>;
  author?: InputMaybe<UserUpdateOneWithoutPhotosInput>;
  blurHash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
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
  blurHash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
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
  blurHash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
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
  albums?: InputMaybe<PhotoOnAlbumUpdateManyWithoutPhotoInput>;
  blurHash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
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
  albums?: InputMaybe<PhotoOnAlbumListRelationFilter>;
  author?: InputMaybe<UserWhereInput>;
  authorId?: InputMaybe<StringNullableFilter>;
  blurHash?: InputMaybe<StringNullableFilter>;
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

export type Query = {
  __typename?: 'Query';
  album?: Maybe<Album>;
  albums: Array<Album>;
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  currentUser?: Maybe<User>;
  photo?: Maybe<Photo>;
  photos: Array<Photo>;
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


export type QueryPhotoArgs = {
  where: PhotoWhereUniqueInput;
};


export type QueryPhotosArgs = {
  after?: InputMaybe<PhotoWhereUniqueInput>;
  before?: InputMaybe<PhotoWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
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
  sharedAlbums: Array<UserOnAlbum>;
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
  after?: InputMaybe<UserOnAlbumWhereUniqueInput>;
  before?: InputMaybe<UserOnAlbumWhereUniqueInput>;
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
  sharedAlbums?: InputMaybe<UserOnAlbumCreateNestedManyWithoutUserInput>;
  username: Scalars['String'];
};

export type UserCreateWithoutCommentsInput = {
  Like?: InputMaybe<LikeCreateNestedManyWithoutAuthorInput>;
  albums?: InputMaybe<AlbumCreateNestedManyWithoutAuthorInput>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  photos?: InputMaybe<PhotoCreateNestedManyWithoutAuthorInput>;
  sharedAlbums?: InputMaybe<UserOnAlbumCreateNestedManyWithoutUserInput>;
  username: Scalars['String'];
};

export type UserCreateWithoutLikeInput = {
  albums?: InputMaybe<AlbumCreateNestedManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  photos?: InputMaybe<PhotoCreateNestedManyWithoutAuthorInput>;
  sharedAlbums?: InputMaybe<UserOnAlbumCreateNestedManyWithoutUserInput>;
  username: Scalars['String'];
};

export type UserCreateWithoutPhotosInput = {
  Like?: InputMaybe<LikeCreateNestedManyWithoutAuthorInput>;
  albums?: InputMaybe<AlbumCreateNestedManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  sharedAlbums?: InputMaybe<UserOnAlbumCreateNestedManyWithoutUserInput>;
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

export type UserOnAlbum = {
  __typename?: 'UserOnAlbum';
  addedAt: Scalars['DateTime'];
  album: Album;
  role: AlbumRole;
  user: User;
};

export type UserOnAlbumAlbumIdUserIdCompoundUniqueInput = {
  albumId: Scalars['String'];
  userId: Scalars['String'];
};

export type UserOnAlbumCreateManyAlbumInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  role?: InputMaybe<AlbumRole>;
  userId: Scalars['String'];
};

export type UserOnAlbumCreateManyAlbumInputEnvelope = {
  data?: InputMaybe<Array<UserOnAlbumCreateManyAlbumInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserOnAlbumCreateManyUserInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  albumId: Scalars['String'];
  role?: InputMaybe<AlbumRole>;
};

export type UserOnAlbumCreateManyUserInputEnvelope = {
  data?: InputMaybe<Array<UserOnAlbumCreateManyUserInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserOnAlbumCreateNestedManyWithoutAlbumInput = {
  connect?: InputMaybe<Array<UserOnAlbumWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserOnAlbumCreateOrConnectWithoutAlbumInput>>;
  create?: InputMaybe<Array<UserOnAlbumCreateWithoutAlbumInput>>;
  createMany?: InputMaybe<UserOnAlbumCreateManyAlbumInputEnvelope>;
};

export type UserOnAlbumCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserOnAlbumWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserOnAlbumCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserOnAlbumCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserOnAlbumCreateManyUserInputEnvelope>;
};

export type UserOnAlbumCreateOrConnectWithoutAlbumInput = {
  create: UserOnAlbumCreateWithoutAlbumInput;
  where: UserOnAlbumWhereUniqueInput;
};

export type UserOnAlbumCreateOrConnectWithoutUserInput = {
  create: UserOnAlbumCreateWithoutUserInput;
  where: UserOnAlbumWhereUniqueInput;
};

export type UserOnAlbumCreateWithoutAlbumInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  role?: InputMaybe<AlbumRole>;
  user: UserCreateNestedOneWithoutSharedAlbumsInput;
};

export type UserOnAlbumCreateWithoutUserInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  album: AlbumCreateNestedOneWithoutMembersInput;
  role?: InputMaybe<AlbumRole>;
};

export type UserOnAlbumListRelationFilter = {
  every?: InputMaybe<UserOnAlbumWhereInput>;
  none?: InputMaybe<UserOnAlbumWhereInput>;
  some?: InputMaybe<UserOnAlbumWhereInput>;
};

export type UserOnAlbumOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserOnAlbumScalarWhereInput = {
  AND?: InputMaybe<Array<UserOnAlbumScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserOnAlbumScalarWhereInput>>;
  OR?: InputMaybe<Array<UserOnAlbumScalarWhereInput>>;
  addedAt?: InputMaybe<DateTimeFilter>;
  albumId?: InputMaybe<StringFilter>;
  role?: InputMaybe<EnumAlbumRoleFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserOnAlbumUpdateManyMutationInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumAlbumRoleFieldUpdateOperationsInput>;
};

export type UserOnAlbumUpdateManyWithWhereWithoutAlbumInput = {
  data: UserOnAlbumUpdateManyMutationInput;
  where: UserOnAlbumScalarWhereInput;
};

export type UserOnAlbumUpdateManyWithWhereWithoutUserInput = {
  data: UserOnAlbumUpdateManyMutationInput;
  where: UserOnAlbumScalarWhereInput;
};

export type UserOnAlbumUpdateManyWithoutAlbumInput = {
  connect?: InputMaybe<Array<UserOnAlbumWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserOnAlbumCreateOrConnectWithoutAlbumInput>>;
  create?: InputMaybe<Array<UserOnAlbumCreateWithoutAlbumInput>>;
  createMany?: InputMaybe<UserOnAlbumCreateManyAlbumInputEnvelope>;
  delete?: InputMaybe<Array<UserOnAlbumWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserOnAlbumScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserOnAlbumWhereUniqueInput>>;
  set?: InputMaybe<Array<UserOnAlbumWhereUniqueInput>>;
  update?: InputMaybe<Array<UserOnAlbumUpdateWithWhereUniqueWithoutAlbumInput>>;
  updateMany?: InputMaybe<Array<UserOnAlbumUpdateManyWithWhereWithoutAlbumInput>>;
  upsert?: InputMaybe<Array<UserOnAlbumUpsertWithWhereUniqueWithoutAlbumInput>>;
};

export type UserOnAlbumUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserOnAlbumWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserOnAlbumCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserOnAlbumCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserOnAlbumCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<UserOnAlbumWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserOnAlbumScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserOnAlbumWhereUniqueInput>>;
  set?: InputMaybe<Array<UserOnAlbumWhereUniqueInput>>;
  update?: InputMaybe<Array<UserOnAlbumUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<UserOnAlbumUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<UserOnAlbumUpsertWithWhereUniqueWithoutUserInput>>;
};

export type UserOnAlbumUpdateWithWhereUniqueWithoutAlbumInput = {
  data: UserOnAlbumUpdateWithoutAlbumInput;
  where: UserOnAlbumWhereUniqueInput;
};

export type UserOnAlbumUpdateWithWhereUniqueWithoutUserInput = {
  data: UserOnAlbumUpdateWithoutUserInput;
  where: UserOnAlbumWhereUniqueInput;
};

export type UserOnAlbumUpdateWithoutAlbumInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumAlbumRoleFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutSharedAlbumsInput>;
};

export type UserOnAlbumUpdateWithoutUserInput = {
  addedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  album?: InputMaybe<AlbumUpdateOneRequiredWithoutMembersInput>;
  role?: InputMaybe<EnumAlbumRoleFieldUpdateOperationsInput>;
};

export type UserOnAlbumUpsertWithWhereUniqueWithoutAlbumInput = {
  create: UserOnAlbumCreateWithoutAlbumInput;
  update: UserOnAlbumUpdateWithoutAlbumInput;
  where: UserOnAlbumWhereUniqueInput;
};

export type UserOnAlbumUpsertWithWhereUniqueWithoutUserInput = {
  create: UserOnAlbumCreateWithoutUserInput;
  update: UserOnAlbumUpdateWithoutUserInput;
  where: UserOnAlbumWhereUniqueInput;
};

export type UserOnAlbumWhereInput = {
  AND?: InputMaybe<Array<UserOnAlbumWhereInput>>;
  NOT?: InputMaybe<Array<UserOnAlbumWhereInput>>;
  OR?: InputMaybe<Array<UserOnAlbumWhereInput>>;
  addedAt?: InputMaybe<DateTimeFilter>;
  album?: InputMaybe<AlbumWhereInput>;
  albumId?: InputMaybe<StringFilter>;
  role?: InputMaybe<EnumAlbumRoleFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type UserOnAlbumWhereUniqueInput = {
  albumId_userId?: InputMaybe<UserOnAlbumAlbumIdUserIdCompoundUniqueInput>;
};

export type UserOrderByWithRelationInput = {
  Like?: InputMaybe<LikeOrderByRelationAggregateInput>;
  albums?: InputMaybe<AlbumOrderByRelationAggregateInput>;
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  photos?: InputMaybe<PhotoOrderByRelationAggregateInput>;
  sharedAlbums?: InputMaybe<UserOnAlbumOrderByRelationAggregateInput>;
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
  sharedAlbums?: InputMaybe<UserOnAlbumUpdateManyWithoutUserInput>;
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
  sharedAlbums?: InputMaybe<UserOnAlbumUpdateManyWithoutUserInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutCommentsInput = {
  Like?: InputMaybe<LikeUpdateManyWithoutAuthorInput>;
  albums?: InputMaybe<AlbumUpdateManyWithoutAuthorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutAuthorInput>;
  sharedAlbums?: InputMaybe<UserOnAlbumUpdateManyWithoutUserInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutLikeInput = {
  albums?: InputMaybe<AlbumUpdateManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutAuthorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutAuthorInput>;
  sharedAlbums?: InputMaybe<UserOnAlbumUpdateManyWithoutUserInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutPhotosInput = {
  Like?: InputMaybe<LikeUpdateManyWithoutAuthorInput>;
  albums?: InputMaybe<AlbumUpdateManyWithoutAuthorInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutAuthorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  sharedAlbums?: InputMaybe<UserOnAlbumUpdateManyWithoutUserInput>;
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
  sharedAlbums?: InputMaybe<UserOnAlbumListRelationFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

/** User visibility of an album */
export enum Visibility {
  Link = 'LINK',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type AlbumDataFragment = { __typename?: 'Album', id: string, title: string, description?: string | null | undefined, viewCount: number, visibility: Visibility, createdAt: any, updatedAt: any, photos: Array<{ __typename?: 'PhotoOnAlbum', photo: { __typename?: 'Photo', id: string, title: string, description?: string | null | undefined, fileName?: string | null | undefined, width: number, height: number, mimetype: MimeType, size: number, exif: any, createdAt: any, updatedAt: any }, comments: Array<{ __typename?: 'Comment', content: string, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: string, username: string } }>, likes: Array<{ __typename?: 'Like', id: string, author: { __typename?: 'User', id: string, username: string } }> }>, author: { __typename?: 'User', id: string, username: string }, members: Array<{ __typename?: 'UserOnAlbum', role: AlbumRole, user: { __typename?: 'User', id: string, username: string } }> };

export type PhotoDataFragment = { __typename?: 'Photo', id: string, title: string, description?: string | null | undefined, fileName?: string | null | undefined, width: number, height: number, mimetype: MimeType, size: number, exif: any, createdAt: any, updatedAt: any };

export type UserDataFragment = { __typename?: 'User', id: string, username: string };

export type CreateAlbumMutationMutationVariables = Exact<{
  data: AlbumCreateInput;
}>;


export type CreateAlbumMutationMutation = { __typename?: 'Mutation', createOneAlbum: { __typename?: 'Album', id: string, title: string, description?: string | null | undefined, viewCount: number, visibility: Visibility, createdAt: any, updatedAt: any, photos: Array<{ __typename?: 'PhotoOnAlbum', photo: { __typename?: 'Photo', id: string, title: string, description?: string | null | undefined, fileName?: string | null | undefined, width: number, height: number, mimetype: MimeType, size: number, exif: any, createdAt: any, updatedAt: any }, comments: Array<{ __typename?: 'Comment', content: string, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: string, username: string } }>, likes: Array<{ __typename?: 'Like', id: string, author: { __typename?: 'User', id: string, username: string } }> }>, author: { __typename?: 'User', id: string, username: string }, members: Array<{ __typename?: 'UserOnAlbum', role: AlbumRole, user: { __typename?: 'User', id: string, username: string } }> } };

export type LogoutMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutationMutation = { __typename?: 'Mutation', logout?: boolean | null | undefined };

export type SignupMutationMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type SignupMutationMutation = { __typename?: 'Mutation', signup?: { __typename?: 'AuthUser', token?: string | null | undefined, user?: { __typename?: 'User', id: string, username: string, email: string } | null | undefined } | null | undefined };

export type UploadPhotosMutationMutationVariables = Exact<{
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type UploadPhotosMutationMutation = { __typename?: 'Mutation', uploadPhotos: Array<{ __typename?: 'Photo', id: string, title: string, description?: string | null | undefined, fileName?: string | null | undefined, width: number, height: number, size: number, mimetype: MimeType, exif: any, createdAt: any, updatedAt: any }> };

export type AlbumQueryQueryVariables = Exact<{
  where: AlbumWhereUniqueInput;
}>;


export type AlbumQueryQuery = { __typename?: 'Query', album?: { __typename?: 'Album', id: string, title: string, description?: string | null | undefined, viewCount: number, visibility: Visibility, createdAt: any, updatedAt: any, photos: Array<{ __typename?: 'PhotoOnAlbum', photo: { __typename?: 'Photo', id: string, title: string, description?: string | null | undefined, fileName?: string | null | undefined, width: number, height: number, mimetype: MimeType, size: number, exif: any, createdAt: any, updatedAt: any }, comments: Array<{ __typename?: 'Comment', content: string, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: string, username: string } }>, likes: Array<{ __typename?: 'Like', id: string, author: { __typename?: 'User', id: string, username: string } }> }>, author: { __typename?: 'User', id: string, username: string }, members: Array<{ __typename?: 'UserOnAlbum', role: AlbumRole, user: { __typename?: 'User', id: string, username: string } }> } | null | undefined };

export type CurrentUserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQueryQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, username: string, email: string } | null | undefined };

export type PhotoQueryQueryVariables = Exact<{
  where: PhotoWhereUniqueInput;
}>;


export type PhotoQueryQuery = { __typename?: 'Query', photo?: { __typename?: 'Photo', id: string, title: string, description?: string | null | undefined, fileName?: string | null | undefined, width: number, height: number, mimetype: MimeType, size: number, exif: any, createdAt: any, updatedAt: any, author?: { __typename?: 'User', id: string, username: string } | null | undefined, albums: Array<{ __typename?: 'PhotoOnAlbum', album: { __typename?: 'Album', id: string, title: string } }> } | null | undefined };

export type PhotosQueryQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<PhotoWhereUniqueInput>;
  after?: InputMaybe<PhotoWhereUniqueInput>;
}>;


export type PhotosQueryQuery = { __typename?: 'Query', photos: Array<{ __typename?: 'Photo', id: string, title: string, description?: string | null | undefined, fileName?: string | null | undefined, width: number, height: number, mimetype: MimeType, size: number, exif: any, createdAt: any, updatedAt: any, author?: { __typename?: 'User', id: string, username: string } | null | undefined }> };

export const PhotoDataFragmentDoc = `
    fragment PhotoData on Photo {
  id
  title
  description
  fileName
  width
  height
  mimetype
  size
  exif
  createdAt
  updatedAt
}
    `;
export const UserDataFragmentDoc = `
    fragment UserData on User {
  id
  username
}
    `;
export const AlbumDataFragmentDoc = `
    fragment AlbumData on Album {
  id
  title
  description
  photos {
    photo {
      ...PhotoData
    }
    comments {
      content
      author {
        ...UserData
      }
      createdAt
      updatedAt
    }
    likes {
      id
      author {
        ...UserData
      }
    }
  }
  author {
    ...UserData
  }
  id
  viewCount
  visibility
  members {
    user {
      ...UserData
    }
    role
  }
  createdAt
  updatedAt
}
    ${PhotoDataFragmentDoc}
${UserDataFragmentDoc}`;
export const CreateAlbumMutationDocument = `
    mutation CreateAlbumMutation($data: AlbumCreateInput!) {
  createOneAlbum(data: $data) {
    ...AlbumData
  }
}
    ${AlbumDataFragmentDoc}`;
export const useCreateAlbumMutationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateAlbumMutationMutation, TError, CreateAlbumMutationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateAlbumMutationMutation, TError, CreateAlbumMutationMutationVariables, TContext>(
      'CreateAlbumMutation',
      (variables?: CreateAlbumMutationMutationVariables) => fetcher<CreateAlbumMutationMutation, CreateAlbumMutationMutationVariables>(client, CreateAlbumMutationDocument, variables, headers)(),
      options
    );
export const LogoutMutationDocument = `
    mutation LogoutMutation {
  logout
}
    `;
export const useLogoutMutationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogoutMutationMutation, TError, LogoutMutationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogoutMutationMutation, TError, LogoutMutationMutationVariables, TContext>(
      'LogoutMutation',
      (variables?: LogoutMutationMutationVariables) => fetcher<LogoutMutationMutation, LogoutMutationMutationVariables>(client, LogoutMutationDocument, variables, headers)(),
      options
    );
export const SignupMutationDocument = `
    mutation SignupMutation($username: String!, $password: String!, $email: String!) {
  signup(username: $username, password: $password, email: $email) {
    user {
      id
      username
      email
    }
    token
  }
}
    `;
export const useSignupMutationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignupMutationMutation, TError, SignupMutationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignupMutationMutation, TError, SignupMutationMutationVariables, TContext>(
      'SignupMutation',
      (variables?: SignupMutationMutationVariables) => fetcher<SignupMutationMutation, SignupMutationMutationVariables>(client, SignupMutationDocument, variables, headers)(),
      options
    );
export const UploadPhotosMutationDocument = `
    mutation UploadPhotosMutation($files: [Upload!]!) {
  uploadPhotos(files: $files) {
    id
    title
    description
    fileName
    width
    height
    size
    mimetype
    exif
    createdAt
    updatedAt
  }
}
    `;
export const useUploadPhotosMutationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UploadPhotosMutationMutation, TError, UploadPhotosMutationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UploadPhotosMutationMutation, TError, UploadPhotosMutationMutationVariables, TContext>(
      'UploadPhotosMutation',
      (variables?: UploadPhotosMutationMutationVariables) => fetcher<UploadPhotosMutationMutation, UploadPhotosMutationMutationVariables>(client, UploadPhotosMutationDocument, variables, headers)(),
      options
    );
export const AlbumQueryDocument = `
    query AlbumQuery($where: AlbumWhereUniqueInput!) {
  album(where: $where) {
    ...AlbumData
  }
}
    ${AlbumDataFragmentDoc}`;
export const useAlbumQueryQuery = <
      TData = AlbumQueryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: AlbumQueryQueryVariables,
      options?: UseQueryOptions<AlbumQueryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AlbumQueryQuery, TError, TData>(
      ['AlbumQuery', variables],
      fetcher<AlbumQueryQuery, AlbumQueryQueryVariables>(client, AlbumQueryDocument, variables, headers),
      options
    );
export const CurrentUserQueryDocument = `
    query CurrentUserQuery {
  currentUser {
    id
    username
    email
  }
}
    `;
export const useCurrentUserQueryQuery = <
      TData = CurrentUserQueryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CurrentUserQueryQueryVariables,
      options?: UseQueryOptions<CurrentUserQueryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CurrentUserQueryQuery, TError, TData>(
      variables === undefined ? ['CurrentUserQuery'] : ['CurrentUserQuery', variables],
      fetcher<CurrentUserQueryQuery, CurrentUserQueryQueryVariables>(client, CurrentUserQueryDocument, variables, headers),
      options
    );
export const PhotoQueryDocument = `
    query PhotoQuery($where: PhotoWhereUniqueInput!) {
  photo(where: $where) {
    ...PhotoData
    author {
      ...UserData
    }
    albums {
      album {
        id
        title
      }
    }
  }
}
    ${PhotoDataFragmentDoc}
${UserDataFragmentDoc}`;
export const usePhotoQueryQuery = <
      TData = PhotoQueryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PhotoQueryQueryVariables,
      options?: UseQueryOptions<PhotoQueryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PhotoQueryQuery, TError, TData>(
      ['PhotoQuery', variables],
      fetcher<PhotoQueryQuery, PhotoQueryQueryVariables>(client, PhotoQueryDocument, variables, headers),
      options
    );
export const PhotosQueryDocument = `
    query PhotosQuery($first: Int, $last: Int, $before: PhotoWhereUniqueInput, $after: PhotoWhereUniqueInput) {
  photos(first: $first, last: $last, before: $before, after: $after) {
    ...PhotoData
    author {
      ...UserData
    }
  }
}
    ${PhotoDataFragmentDoc}
${UserDataFragmentDoc}`;
export const usePhotosQueryQuery = <
      TData = PhotosQueryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PhotosQueryQueryVariables,
      options?: UseQueryOptions<PhotosQueryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PhotosQueryQuery, TError, TData>(
      variables === undefined ? ['PhotosQuery'] : ['PhotosQuery', variables],
      fetcher<PhotosQueryQuery, PhotosQueryQueryVariables>(client, PhotosQueryDocument, variables, headers),
      options
    );