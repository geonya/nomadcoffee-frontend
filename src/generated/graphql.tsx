import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Cafe = {
  __typename?: 'Cafe';
  address?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Maybe<Category>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  countLikes: Scalars['Int'];
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isLiked: Scalars['Boolean'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  photos?: Maybe<Array<Maybe<CafePhoto>>>;
  updatedAt: Scalars['String'];
  user: User;
};

export type CafePhoto = {
  __typename?: 'CafePhoto';
  cafe?: Maybe<Cafe>;
  id: Scalars['Int'];
  url: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  cafes?: Maybe<Array<Maybe<Cafe>>>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
  totalCafes: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type CategoryInput = {
  name: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  cafe?: Maybe<Cafe>;
  caption: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  rating: Scalars['Int'];
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
};

export type CreateCommentResponse = {
  __typename?: 'CreateCommentResponse';
  comment?: Maybe<Comment>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteCafeResult = {
  __typename?: 'DeleteCafeResult';
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  ok: Scalars['Boolean'];
};

export type EditCafeResponse = {
  __typename?: 'EditCafeResponse';
  cafe?: Maybe<Cafe>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type FindCommentReponse = {
  __typename?: 'FindCommentReponse';
  comment?: Maybe<Comment>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Like = {
  __typename?: 'Like';
  cafe: Cafe;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<MutationResponse>;
  createCafe: CreateCafeResult;
  createCategory: MutationResponse;
  createComment?: Maybe<CreateCommentResponse>;
  deleteCafe?: Maybe<DeleteCafeResult>;
  deleteComment?: Maybe<MutationResponse>;
  editCafe: EditCafeResponse;
  editProfile?: Maybe<MutationResponse>;
  followUser?: Maybe<MutationResponse>;
  login?: Maybe<LoginResult>;
  toggleFollow?: Maybe<MutationResponse>;
  toggleLike: MutationResponse;
  unfollowUser?: Maybe<MutationResponse>;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateCafeArgs = {
  address?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<InputMaybe<CategoryInput>>>;
  description?: InputMaybe<Scalars['String']>;
  files?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  cafeId: Scalars['Int'];
  caption: Scalars['String'];
  rating: Scalars['Int'];
};


export type MutationDeleteCafeArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationEditCafeArgs = {
  address?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<InputMaybe<CategoryInput>>>;
  deleteIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  description?: InputMaybe<Scalars['String']>;
  files?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
  id: Scalars['Int'];
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationEditProfileArgs = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['Upload']>;
  email?: InputMaybe<Scalars['String']>;
  githubUsername?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationFollowUserArgs = {
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationToggleFollowArgs = {
  username: Scalars['String'];
};


export type MutationToggleLikeArgs = {
  id: Scalars['Int'];
};


export type MutationUnfollowUserArgs = {
  username: Scalars['String'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  findComment?: Maybe<FindCommentReponse>;
  searchCafes?: Maybe<Array<Maybe<Cafe>>>;
  searchUsers?: Maybe<SearchUserResult>;
  seeCafe?: Maybe<Cafe>;
  seeCafes?: Maybe<Array<Maybe<Cafe>>>;
  seeCategories?: Maybe<Array<Maybe<Category>>>;
  seeCategory?: Maybe<Array<Maybe<Cafe>>>;
  seeMyProfile: User;
  seeUser?: Maybe<SeeUserResult>;
};


export type QueryFindCommentArgs = {
  cafeId: Scalars['Int'];
};


export type QuerySearchCafesArgs = {
  keyword: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  keyword: Scalars['String'];
  page: Scalars['Int'];
};


export type QuerySeeCafeArgs = {
  id: Scalars['Int'];
};


export type QuerySeeCategoryArgs = {
  slug: Scalars['String'];
};


export type QuerySeeUserArgs = {
  username: Scalars['String'];
};

export type SearchUserResult = {
  __typename?: 'SearchUserResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

export type SeeUserResult = {
  __typename?: 'SeeUserResult';
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  cafes?: Maybe<Array<Maybe<Cafe>>>;
  countCafes: Scalars['Int'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  githubUsername?: Maybe<Scalars['String']>;
  givenLikes: Scalars['Int'];
  id: Scalars['Int'];
  isFollowing?: Maybe<Scalars['Boolean']>;
  isMe?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  password: Scalars['String'];
  photos?: Maybe<Array<Maybe<CafePhoto>>>;
  totalFollowers: Scalars['Int'];
  totalFollowing: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type CreateCafeResult = {
  __typename?: 'createCafeResult';
  cafe?: Maybe<Cafe>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CafeFragmentFragment = { __typename?: 'Cafe', id: number, name: string, address?: string | null, latitude?: number | null, longitude?: number | null, description?: string | null, countLikes: number, isLiked: boolean, photos?: Array<{ __typename?: 'CafePhoto', id: number, url: string } | null> | null, categories?: Array<{ __typename?: 'Category', name: string, slug: string } | null> | null, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } };

export type UserFragmentFragment = { __typename?: 'User', id: number, username: string, name: string, avatarUrl?: string | null, email: string, address?: string | null, isMe?: boolean | null, isFollowing?: boolean | null, countCafes: number, givenLikes: number, totalFollowing: number, totalFollowers: number };

export type CommentFragmentFragment = { __typename?: 'Comment', caption: string, rating: number, user?: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } | null };

export type SeeCafesQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeCafesQuery = { __typename?: 'Query', seeCafes?: Array<{ __typename?: 'Cafe', id: number, name: string, address?: string | null, latitude?: number | null, longitude?: number | null, description?: string | null, countLikes: number, isLiked: boolean, photos?: Array<{ __typename?: 'CafePhoto', id: number, url: string } | null> | null, categories?: Array<{ __typename?: 'Category', name: string, slug: string } | null> | null, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null> | null };

export type SeeCafeQueryVariables = Exact<{
  cafeId: Scalars['Int'];
}>;


export type SeeCafeQuery = { __typename?: 'Query', seeCafe?: { __typename?: 'Cafe', id: number, name: string, address?: string | null, latitude?: number | null, longitude?: number | null, description?: string | null, countLikes: number, isLiked: boolean, comments?: Array<{ __typename?: 'Comment', caption: string, rating: number, user?: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } | null } | null> | null, photos?: Array<{ __typename?: 'CafePhoto', id: number, url: string } | null> | null, categories?: Array<{ __typename?: 'Category', name: string, slug: string } | null> | null, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null };

export type SeeMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeMyProfileQuery = { __typename?: 'Query', seeMyProfile: { __typename?: 'User', id: number, username: string, name: string, avatarUrl?: string | null, email: string, address?: string | null, isMe?: boolean | null, isFollowing?: boolean | null, countCafes: number, givenLikes: number, totalFollowing: number, totalFollowers: number, cafes?: Array<{ __typename?: 'Cafe', id: number, name: string, address?: string | null, latitude?: number | null, longitude?: number | null, description?: string | null, countLikes: number, isLiked: boolean, photos?: Array<{ __typename?: 'CafePhoto', id: number, url: string } | null> | null, categories?: Array<{ __typename?: 'Category', name: string, slug: string } | null> | null, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null> | null } };

export type SeeCategoryQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type SeeCategoryQuery = { __typename?: 'Query', seeCategory?: Array<{ __typename?: 'Cafe', id: number, name: string, address?: string | null, latitude?: number | null, longitude?: number | null, description?: string | null, countLikes: number, isLiked: boolean, photos?: Array<{ __typename?: 'CafePhoto', id: number, url: string } | null> | null, categories?: Array<{ __typename?: 'Category', name: string, slug: string } | null> | null, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null> | null };

export type SeeCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeCategoriesQuery = { __typename?: 'Query', seeCategories?: Array<{ __typename?: 'Category', name: string, slug: string, totalCafes: number } | null> | null };

export type SeeUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type SeeUserQuery = { __typename?: 'Query', seeUser?: { __typename?: 'SeeUserResult', user?: { __typename?: 'User', id: number, username: string, name: string, avatarUrl?: string | null, email: string, address?: string | null, isMe?: boolean | null, isFollowing?: boolean | null, countCafes: number, givenLikes: number, totalFollowing: number, totalFollowers: number, cafes?: Array<{ __typename?: 'Cafe', id: number, name: string, address?: string | null, latitude?: number | null, longitude?: number | null, description?: string | null, countLikes: number, isLiked: boolean, photos?: Array<{ __typename?: 'CafePhoto', id: number, url: string } | null> | null, categories?: Array<{ __typename?: 'Category', name: string, slug: string } | null> | null, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null> | null, photos?: Array<{ __typename?: 'CafePhoto', url: string, cafe?: { __typename?: 'Cafe', id: number } | null } | null> | null } | null } | null };

export type SearchCafesQueryVariables = Exact<{
  keyword: Scalars['String'];
}>;


export type SearchCafesQuery = { __typename?: 'Query', searchCafes?: Array<{ __typename?: 'Cafe', id: number, name: string, address?: string | null, latitude?: number | null, longitude?: number | null, description?: string | null, countLikes: number, isLiked: boolean, photos?: Array<{ __typename?: 'CafePhoto', id: number, url: string } | null> | null, categories?: Array<{ __typename?: 'Category', name: string, slug: string } | null> | null, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null> | null };

export type FindCommentQueryVariables = Exact<{
  cafeId: Scalars['Int'];
}>;


export type FindCommentQuery = { __typename?: 'Query', findComment?: { __typename?: 'FindCommentReponse', ok: boolean, error?: string | null, comment?: { __typename?: 'Comment', caption: string, rating: number, user?: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } | null } | null } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResult', ok: boolean, token?: string | null, error?: string | null } | null };

export type CreateAccountMutationVariables = Exact<{
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export type EditProfileMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['Upload']>;
  githubUsername?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export type CreateCafeMutationVariables = Exact<{
  name: Scalars['String'];
  files: Array<InputMaybe<Scalars['Upload']>> | InputMaybe<Scalars['Upload']>;
  categories?: InputMaybe<Array<InputMaybe<CategoryInput>> | InputMaybe<CategoryInput>>;
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
}>;


export type CreateCafeMutation = { __typename?: 'Mutation', createCafe: { __typename?: 'createCafeResult', ok: boolean, error?: string | null, cafe?: { __typename?: 'Cafe', id: number, name: string, address?: string | null, latitude?: number | null, longitude?: number | null, description?: string | null, countLikes: number, isLiked: boolean, photos?: Array<{ __typename?: 'CafePhoto', id: number, url: string } | null> | null, categories?: Array<{ __typename?: 'Category', name: string, slug: string } | null> | null, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null } };

export type EditCafeMutationVariables = Exact<{
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  files?: InputMaybe<Array<InputMaybe<Scalars['Upload']>> | InputMaybe<Scalars['Upload']>>;
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<InputMaybe<CategoryInput>> | InputMaybe<CategoryInput>>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  deleteIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
}>;


export type EditCafeMutation = { __typename?: 'Mutation', editCafe: { __typename?: 'EditCafeResponse', ok: boolean, error?: string | null, cafe?: { __typename?: 'Cafe', id: number, name: string, address?: string | null, latitude?: number | null, longitude?: number | null, description?: string | null, countLikes: number, isLiked: boolean, photos?: Array<{ __typename?: 'CafePhoto', id: number, url: string } | null> | null, categories?: Array<{ __typename?: 'Category', name: string, slug: string } | null> | null, user: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } } | null } };

export type DeleteCafeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCafeMutation = { __typename?: 'Mutation', deleteCafe?: { __typename?: 'DeleteCafeResult', ok: boolean, error?: string | null, id?: number | null } | null };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type ToggleLikeMutationVariables = Exact<{
  cafeId: Scalars['Int'];
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type FollowUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export type UnfollowUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export type CreateCommentMutationVariables = Exact<{
  caption: Scalars['String'];
  rating: Scalars['Int'];
  cafeId: Scalars['Int'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'CreateCommentResponse', ok: boolean, error?: string | null, comment?: { __typename?: 'Comment', caption: string, rating: number, user?: { __typename?: 'User', id: number, username: string, avatarUrl?: string | null } | null } | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export const CafeFragmentFragmentDoc = gql`
    fragment CafeFragment on Cafe {
  id
  name
  address
  latitude
  longitude
  photos {
    id
    url
  }
  description
  categories {
    name
    slug
  }
  user {
    id
    username
    avatarUrl
  }
  countLikes
  isLiked
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  name
  avatarUrl
  email
  address
  isMe
  isFollowing
  countCafes
  givenLikes
  totalFollowing
  totalFollowers
}
    `;
export const CommentFragmentFragmentDoc = gql`
    fragment CommentFragment on Comment {
  caption
  rating
  user {
    id
    username
    avatarUrl
  }
}
    `;
export const SeeCafesDocument = gql`
    query SeeCafes {
  seeCafes {
    ...CafeFragment
  }
}
    ${CafeFragmentFragmentDoc}`;

/**
 * __useSeeCafesQuery__
 *
 * To run a query within a React component, call `useSeeCafesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeCafesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeCafesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeCafesQuery(baseOptions?: Apollo.QueryHookOptions<SeeCafesQuery, SeeCafesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeCafesQuery, SeeCafesQueryVariables>(SeeCafesDocument, options);
      }
export function useSeeCafesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeCafesQuery, SeeCafesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeCafesQuery, SeeCafesQueryVariables>(SeeCafesDocument, options);
        }
export type SeeCafesQueryHookResult = ReturnType<typeof useSeeCafesQuery>;
export type SeeCafesLazyQueryHookResult = ReturnType<typeof useSeeCafesLazyQuery>;
export type SeeCafesQueryResult = Apollo.QueryResult<SeeCafesQuery, SeeCafesQueryVariables>;
export const SeeCafeDocument = gql`
    query SeeCafe($cafeId: Int!) {
  seeCafe(id: $cafeId) {
    ...CafeFragment
    comments {
      ...CommentFragment
    }
  }
}
    ${CafeFragmentFragmentDoc}
${CommentFragmentFragmentDoc}`;

/**
 * __useSeeCafeQuery__
 *
 * To run a query within a React component, call `useSeeCafeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeCafeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeCafeQuery({
 *   variables: {
 *      cafeId: // value for 'cafeId'
 *   },
 * });
 */
export function useSeeCafeQuery(baseOptions: Apollo.QueryHookOptions<SeeCafeQuery, SeeCafeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeCafeQuery, SeeCafeQueryVariables>(SeeCafeDocument, options);
      }
export function useSeeCafeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeCafeQuery, SeeCafeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeCafeQuery, SeeCafeQueryVariables>(SeeCafeDocument, options);
        }
export type SeeCafeQueryHookResult = ReturnType<typeof useSeeCafeQuery>;
export type SeeCafeLazyQueryHookResult = ReturnType<typeof useSeeCafeLazyQuery>;
export type SeeCafeQueryResult = Apollo.QueryResult<SeeCafeQuery, SeeCafeQueryVariables>;
export const SeeMyProfileDocument = gql`
    query SeeMyProfile {
  seeMyProfile {
    ...UserFragment
    cafes {
      ...CafeFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${CafeFragmentFragmentDoc}`;

/**
 * __useSeeMyProfileQuery__
 *
 * To run a query within a React component, call `useSeeMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<SeeMyProfileQuery, SeeMyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeMyProfileQuery, SeeMyProfileQueryVariables>(SeeMyProfileDocument, options);
      }
export function useSeeMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeMyProfileQuery, SeeMyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeMyProfileQuery, SeeMyProfileQueryVariables>(SeeMyProfileDocument, options);
        }
export type SeeMyProfileQueryHookResult = ReturnType<typeof useSeeMyProfileQuery>;
export type SeeMyProfileLazyQueryHookResult = ReturnType<typeof useSeeMyProfileLazyQuery>;
export type SeeMyProfileQueryResult = Apollo.QueryResult<SeeMyProfileQuery, SeeMyProfileQueryVariables>;
export const SeeCategoryDocument = gql`
    query SeeCategory($slug: String!) {
  seeCategory(slug: $slug) {
    ...CafeFragment
  }
}
    ${CafeFragmentFragmentDoc}`;

/**
 * __useSeeCategoryQuery__
 *
 * To run a query within a React component, call `useSeeCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeCategoryQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useSeeCategoryQuery(baseOptions: Apollo.QueryHookOptions<SeeCategoryQuery, SeeCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeCategoryQuery, SeeCategoryQueryVariables>(SeeCategoryDocument, options);
      }
export function useSeeCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeCategoryQuery, SeeCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeCategoryQuery, SeeCategoryQueryVariables>(SeeCategoryDocument, options);
        }
export type SeeCategoryQueryHookResult = ReturnType<typeof useSeeCategoryQuery>;
export type SeeCategoryLazyQueryHookResult = ReturnType<typeof useSeeCategoryLazyQuery>;
export type SeeCategoryQueryResult = Apollo.QueryResult<SeeCategoryQuery, SeeCategoryQueryVariables>;
export const SeeCategoriesDocument = gql`
    query SeeCategories {
  seeCategories {
    name
    slug
    totalCafes
  }
}
    `;

/**
 * __useSeeCategoriesQuery__
 *
 * To run a query within a React component, call `useSeeCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<SeeCategoriesQuery, SeeCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeCategoriesQuery, SeeCategoriesQueryVariables>(SeeCategoriesDocument, options);
      }
export function useSeeCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeCategoriesQuery, SeeCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeCategoriesQuery, SeeCategoriesQueryVariables>(SeeCategoriesDocument, options);
        }
export type SeeCategoriesQueryHookResult = ReturnType<typeof useSeeCategoriesQuery>;
export type SeeCategoriesLazyQueryHookResult = ReturnType<typeof useSeeCategoriesLazyQuery>;
export type SeeCategoriesQueryResult = Apollo.QueryResult<SeeCategoriesQuery, SeeCategoriesQueryVariables>;
export const SeeUserDocument = gql`
    query SeeUser($username: String!) {
  seeUser(username: $username) {
    user {
      ...UserFragment
      cafes {
        ...CafeFragment
      }
      photos {
        url
        cafe {
          id
        }
      }
    }
  }
}
    ${UserFragmentFragmentDoc}
${CafeFragmentFragmentDoc}`;

/**
 * __useSeeUserQuery__
 *
 * To run a query within a React component, call `useSeeUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSeeUserQuery(baseOptions: Apollo.QueryHookOptions<SeeUserQuery, SeeUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeUserQuery, SeeUserQueryVariables>(SeeUserDocument, options);
      }
export function useSeeUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeUserQuery, SeeUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeUserQuery, SeeUserQueryVariables>(SeeUserDocument, options);
        }
export type SeeUserQueryHookResult = ReturnType<typeof useSeeUserQuery>;
export type SeeUserLazyQueryHookResult = ReturnType<typeof useSeeUserLazyQuery>;
export type SeeUserQueryResult = Apollo.QueryResult<SeeUserQuery, SeeUserQueryVariables>;
export const SearchCafesDocument = gql`
    query SearchCafes($keyword: String!) {
  searchCafes(keyword: $keyword) {
    ...CafeFragment
  }
}
    ${CafeFragmentFragmentDoc}`;

/**
 * __useSearchCafesQuery__
 *
 * To run a query within a React component, call `useSearchCafesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCafesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCafesQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useSearchCafesQuery(baseOptions: Apollo.QueryHookOptions<SearchCafesQuery, SearchCafesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCafesQuery, SearchCafesQueryVariables>(SearchCafesDocument, options);
      }
export function useSearchCafesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCafesQuery, SearchCafesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCafesQuery, SearchCafesQueryVariables>(SearchCafesDocument, options);
        }
export type SearchCafesQueryHookResult = ReturnType<typeof useSearchCafesQuery>;
export type SearchCafesLazyQueryHookResult = ReturnType<typeof useSearchCafesLazyQuery>;
export type SearchCafesQueryResult = Apollo.QueryResult<SearchCafesQuery, SearchCafesQueryVariables>;
export const FindCommentDocument = gql`
    query FindComment($cafeId: Int!) {
  findComment(cafeId: $cafeId) {
    ok
    error
    comment {
      ...CommentFragment
    }
  }
}
    ${CommentFragmentFragmentDoc}`;

/**
 * __useFindCommentQuery__
 *
 * To run a query within a React component, call `useFindCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCommentQuery({
 *   variables: {
 *      cafeId: // value for 'cafeId'
 *   },
 * });
 */
export function useFindCommentQuery(baseOptions: Apollo.QueryHookOptions<FindCommentQuery, FindCommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCommentQuery, FindCommentQueryVariables>(FindCommentDocument, options);
      }
export function useFindCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCommentQuery, FindCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCommentQuery, FindCommentQueryVariables>(FindCommentDocument, options);
        }
export type FindCommentQueryHookResult = ReturnType<typeof useFindCommentQuery>;
export type FindCommentLazyQueryHookResult = ReturnType<typeof useFindCommentLazyQuery>;
export type FindCommentQueryResult = Apollo.QueryResult<FindCommentQuery, FindCommentQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ok
    token
    error
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateAccountDocument = gql`
    mutation CreateAccount($name: String!, $username: String!, $email: String!, $password: String!) {
  createAccount(
    name: $name
    username: $username
    email: $email
    password: $password
  ) {
    ok
    error
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($username: String, $name: String, $email: String, $password: String, $avatar: Upload, $githubUsername: String, $address: String) {
  editProfile(
    username: $username
    name: $name
    email: $email
    password: $password
    avatar: $avatar
    githubUsername: $githubUsername
    address: $address
  ) {
    ok
    error
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      username: // value for 'username'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      avatar: // value for 'avatar'
 *      githubUsername: // value for 'githubUsername'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const CreateCafeDocument = gql`
    mutation CreateCafe($name: String!, $files: [Upload]!, $categories: [CategoryInput], $address: String, $description: String, $latitude: Float, $longitude: Float) {
  createCafe(
    name: $name
    files: $files
    categories: $categories
    address: $address
    description: $description
    latitude: $latitude
    longitude: $longitude
  ) {
    ok
    error
    cafe {
      ...CafeFragment
    }
  }
}
    ${CafeFragmentFragmentDoc}`;
export type CreateCafeMutationFn = Apollo.MutationFunction<CreateCafeMutation, CreateCafeMutationVariables>;

/**
 * __useCreateCafeMutation__
 *
 * To run a mutation, you first call `useCreateCafeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCafeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCafeMutation, { data, loading, error }] = useCreateCafeMutation({
 *   variables: {
 *      name: // value for 'name'
 *      files: // value for 'files'
 *      categories: // value for 'categories'
 *      address: // value for 'address'
 *      description: // value for 'description'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useCreateCafeMutation(baseOptions?: Apollo.MutationHookOptions<CreateCafeMutation, CreateCafeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCafeMutation, CreateCafeMutationVariables>(CreateCafeDocument, options);
      }
export type CreateCafeMutationHookResult = ReturnType<typeof useCreateCafeMutation>;
export type CreateCafeMutationResult = Apollo.MutationResult<CreateCafeMutation>;
export type CreateCafeMutationOptions = Apollo.BaseMutationOptions<CreateCafeMutation, CreateCafeMutationVariables>;
export const EditCafeDocument = gql`
    mutation EditCafe($id: Int!, $name: String, $files: [Upload], $address: String, $description: String, $categories: [CategoryInput], $latitude: Float, $longitude: Float, $deleteIds: [Int]) {
  editCafe(
    id: $id
    name: $name
    files: $files
    address: $address
    description: $description
    categories: $categories
    latitude: $latitude
    longitude: $longitude
    deleteIds: $deleteIds
  ) {
    ok
    error
    cafe {
      ...CafeFragment
    }
  }
}
    ${CafeFragmentFragmentDoc}`;
export type EditCafeMutationFn = Apollo.MutationFunction<EditCafeMutation, EditCafeMutationVariables>;

/**
 * __useEditCafeMutation__
 *
 * To run a mutation, you first call `useEditCafeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCafeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCafeMutation, { data, loading, error }] = useEditCafeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      files: // value for 'files'
 *      address: // value for 'address'
 *      description: // value for 'description'
 *      categories: // value for 'categories'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      deleteIds: // value for 'deleteIds'
 *   },
 * });
 */
export function useEditCafeMutation(baseOptions?: Apollo.MutationHookOptions<EditCafeMutation, EditCafeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCafeMutation, EditCafeMutationVariables>(EditCafeDocument, options);
      }
export type EditCafeMutationHookResult = ReturnType<typeof useEditCafeMutation>;
export type EditCafeMutationResult = Apollo.MutationResult<EditCafeMutation>;
export type EditCafeMutationOptions = Apollo.BaseMutationOptions<EditCafeMutation, EditCafeMutationVariables>;
export const DeleteCafeDocument = gql`
    mutation DeleteCafe($id: Int!) {
  deleteCafe(id: $id) {
    ok
    error
    id
  }
}
    `;
export type DeleteCafeMutationFn = Apollo.MutationFunction<DeleteCafeMutation, DeleteCafeMutationVariables>;

/**
 * __useDeleteCafeMutation__
 *
 * To run a mutation, you first call `useDeleteCafeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCafeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCafeMutation, { data, loading, error }] = useDeleteCafeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCafeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCafeMutation, DeleteCafeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCafeMutation, DeleteCafeMutationVariables>(DeleteCafeDocument, options);
      }
export type DeleteCafeMutationHookResult = ReturnType<typeof useDeleteCafeMutation>;
export type DeleteCafeMutationResult = Apollo.MutationResult<DeleteCafeMutation>;
export type DeleteCafeMutationOptions = Apollo.BaseMutationOptions<DeleteCafeMutation, DeleteCafeMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($name: String!) {
  createCategory(name: $name) {
    ok
    error
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const ToggleLikeDocument = gql`
    mutation ToggleLike($cafeId: Int!) {
  toggleLike(id: $cafeId) {
    ok
    error
  }
}
    `;
export type ToggleLikeMutationFn = Apollo.MutationFunction<ToggleLikeMutation, ToggleLikeMutationVariables>;

/**
 * __useToggleLikeMutation__
 *
 * To run a mutation, you first call `useToggleLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeMutation, { data, loading, error }] = useToggleLikeMutation({
 *   variables: {
 *      cafeId: // value for 'cafeId'
 *   },
 * });
 */
export function useToggleLikeMutation(baseOptions?: Apollo.MutationHookOptions<ToggleLikeMutation, ToggleLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, options);
      }
export type ToggleLikeMutationHookResult = ReturnType<typeof useToggleLikeMutation>;
export type ToggleLikeMutationResult = Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const FollowUserDocument = gql`
    mutation followUser($username: String!) {
  followUser(username: $username) {
    ok
    error
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation unfollowUser($username: String!) {
  unfollowUser(username: $username) {
    ok
    error
  }
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($caption: String!, $rating: Int!, $cafeId: Int!) {
  createComment(caption: $caption, rating: $rating, cafeId: $cafeId) {
    ok
    error
    comment {
      ...CommentFragment
    }
  }
}
    ${CommentFragmentFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      caption: // value for 'caption'
 *      rating: // value for 'rating'
 *      cafeId: // value for 'cafeId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: Int!) {
  deleteComment(id: $id) {
    ok
    error
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;