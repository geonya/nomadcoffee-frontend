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

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  shops?: Maybe<Array<Maybe<CoffeeShop>>>;
  slug: Scalars['String'];
  totalShops: Scalars['Int'];
};

export type CategoryInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CoffeeShop = {
  __typename?: 'CoffeeShop';
  categories?: Maybe<Array<Maybe<Category>>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  photos?: Maybe<Array<Maybe<CoffeeShopPhoto>>>;
  user: User;
};

export type CoffeeShopPhoto = {
  __typename?: 'CoffeeShopPhoto';
  id: Scalars['Int'];
  shop?: Maybe<CoffeeShop>;
  url: Scalars['String'];
};

export type DeleteCoffeeShopResult = {
  __typename?: 'DeleteCoffeeShopResult';
  coffeeShop?: Maybe<CoffeeShop>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
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
  createCategory: MutationResponse;
  createCoffeeShop: CreateCoffeeShopResult;
  deleteCoffeeShop: DeleteCoffeeShopResult;
  editCoffeeShop: MutationResponse;
  editProfile?: Maybe<MutationResponse>;
  login?: Maybe<LoginResult>;
  toggleFollow?: Maybe<MutationResponse>;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
  slug: Scalars['String'];
};


export type MutationCreateCoffeeShopArgs = {
  categories: Array<InputMaybe<CategoryInput>>;
  description?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationDeleteCoffeeShopArgs = {
  id: Scalars['Int'];
};


export type MutationEditCoffeeShopArgs = {
  categories?: InputMaybe<Array<InputMaybe<CategoryInput>>>;
  description?: InputMaybe<Scalars['String']>;
  files?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
  id: Scalars['Int'];
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  email?: InputMaybe<Scalars['String']>;
  githubUsername?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationToggleFollowArgs = {
  username: Scalars['String'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  searchUsers?: Maybe<SearchUserResult>;
  seeCategories?: Maybe<Array<Maybe<Category>>>;
  seeCategory?: Maybe<Array<Maybe<CoffeeShop>>>;
  seeCoffeeShop?: Maybe<CoffeeShop>;
  seeCoffeeShops?: Maybe<Array<Maybe<CoffeeShop>>>;
  seeMyProfile: User;
  seeUser?: Maybe<User>;
};


export type QuerySearchUsersArgs = {
  keyword: Scalars['String'];
  page: Scalars['Int'];
};


export type QuerySeeCategoryArgs = {
  name: Scalars['String'];
  page: Scalars['Int'];
};


export type QuerySeeCoffeeShopArgs = {
  id: Scalars['Int'];
};


export type QuerySeeCoffeeShopsArgs = {
  page: Scalars['Int'];
};


export type QuerySeeUserArgs = {
  page: Scalars['Int'];
  username: Scalars['String'];
};

export type SearchUserResult = {
  __typename?: 'SearchUserResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  githubUsername?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['String'];
  photos?: Maybe<Array<Maybe<CoffeeShopPhoto>>>;
  shops?: Maybe<Array<Maybe<CoffeeShop>>>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type CreateCoffeeShopResult = {
  __typename?: 'createCoffeeShopResult';
  coffeeShop?: Maybe<CoffeeShop>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type SeeCoffeeShopsQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type SeeCoffeeShopsQuery = { __typename?: 'Query', seeCoffeeShops?: Array<{ __typename?: 'CoffeeShop', id: number, name: string, latitude?: string | null, longitude?: string | null, photos?: Array<{ __typename?: 'CoffeeShopPhoto', url: string } | null> | null, user: { __typename?: 'User', username: string } } | null> | null };

export type SeeCoffeeShopQueryVariables = Exact<{
  shopId: Scalars['Int'];
}>;


export type SeeCoffeeShopQuery = { __typename?: 'Query', seeCoffeeShop?: { __typename?: 'CoffeeShop', id: number, name: string, latitude?: string | null, longitude?: string | null, user: { __typename?: 'User', username: string }, photos?: Array<{ __typename?: 'CoffeeShopPhoto', url: string } | null> | null, categories?: Array<{ __typename?: 'Category', name: string, slug: string } | null> | null } | null };

export type SeeMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeMyProfileQuery = { __typename?: 'Query', seeMyProfile: { __typename?: 'User', id: number, name: string, username: string, email: string } };

export type SeeCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeCategoriesQuery = { __typename?: 'Query', seeCategories?: Array<{ __typename?: 'Category', name: string, slug: string, totalShops: number } | null> | null };

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

export type CreateCoffeeShopMutationVariables = Exact<{
  name: Scalars['String'];
  files: Array<InputMaybe<Scalars['Upload']>> | InputMaybe<Scalars['Upload']>;
  categories: Array<InputMaybe<CategoryInput>> | InputMaybe<CategoryInput>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
}>;


export type CreateCoffeeShopMutation = { __typename?: 'Mutation', createCoffeeShop: { __typename?: 'createCoffeeShopResult', ok: boolean, error?: string | null, coffeeShop?: { __typename?: 'CoffeeShop', id: number, name: string, latitude?: string | null, longitude?: string | null, description?: string | null, user: { __typename?: 'User', username: string }, photos?: Array<{ __typename?: 'CoffeeShopPhoto', url: string } | null> | null, categories?: Array<{ __typename?: 'Category', name: string } | null> | null } | null } };

export type EditCoffeeShopMutationVariables = Exact<{
  shopId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  files?: InputMaybe<Array<InputMaybe<Scalars['Upload']>> | InputMaybe<Scalars['Upload']>>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<InputMaybe<CategoryInput>> | InputMaybe<CategoryInput>>;
}>;


export type EditCoffeeShopMutation = { __typename?: 'Mutation', editCoffeeShop: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type DeleteCoffeeShopMutationVariables = Exact<{
  shopId: Scalars['Int'];
}>;


export type DeleteCoffeeShopMutation = { __typename?: 'Mutation', deleteCoffeeShop: { __typename?: 'DeleteCoffeeShopResult', ok: boolean, error?: string | null, coffeeShop?: { __typename?: 'CoffeeShop', id: number } | null } };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String'];
  slug: Scalars['String'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };


export const SeeCoffeeShopsDocument = gql`
    query SeeCoffeeShops($page: Int!) {
  seeCoffeeShops(page: $page) {
    id
    name
    latitude
    longitude
    photos {
      url
    }
    user {
      username
    }
  }
}
    `;

/**
 * __useSeeCoffeeShopsQuery__
 *
 * To run a query within a React component, call `useSeeCoffeeShopsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeCoffeeShopsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeCoffeeShopsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSeeCoffeeShopsQuery(baseOptions: Apollo.QueryHookOptions<SeeCoffeeShopsQuery, SeeCoffeeShopsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeCoffeeShopsQuery, SeeCoffeeShopsQueryVariables>(SeeCoffeeShopsDocument, options);
      }
export function useSeeCoffeeShopsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeCoffeeShopsQuery, SeeCoffeeShopsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeCoffeeShopsQuery, SeeCoffeeShopsQueryVariables>(SeeCoffeeShopsDocument, options);
        }
export type SeeCoffeeShopsQueryHookResult = ReturnType<typeof useSeeCoffeeShopsQuery>;
export type SeeCoffeeShopsLazyQueryHookResult = ReturnType<typeof useSeeCoffeeShopsLazyQuery>;
export type SeeCoffeeShopsQueryResult = Apollo.QueryResult<SeeCoffeeShopsQuery, SeeCoffeeShopsQueryVariables>;
export const SeeCoffeeShopDocument = gql`
    query SeeCoffeeShop($shopId: Int!) {
  seeCoffeeShop(id: $shopId) {
    id
    name
    user {
      username
    }
    photos {
      url
    }
    categories {
      name
      slug
    }
    latitude
    longitude
  }
}
    `;

/**
 * __useSeeCoffeeShopQuery__
 *
 * To run a query within a React component, call `useSeeCoffeeShopQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeCoffeeShopQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeCoffeeShopQuery({
 *   variables: {
 *      shopId: // value for 'shopId'
 *   },
 * });
 */
export function useSeeCoffeeShopQuery(baseOptions: Apollo.QueryHookOptions<SeeCoffeeShopQuery, SeeCoffeeShopQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeCoffeeShopQuery, SeeCoffeeShopQueryVariables>(SeeCoffeeShopDocument, options);
      }
export function useSeeCoffeeShopLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeCoffeeShopQuery, SeeCoffeeShopQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeCoffeeShopQuery, SeeCoffeeShopQueryVariables>(SeeCoffeeShopDocument, options);
        }
export type SeeCoffeeShopQueryHookResult = ReturnType<typeof useSeeCoffeeShopQuery>;
export type SeeCoffeeShopLazyQueryHookResult = ReturnType<typeof useSeeCoffeeShopLazyQuery>;
export type SeeCoffeeShopQueryResult = Apollo.QueryResult<SeeCoffeeShopQuery, SeeCoffeeShopQueryVariables>;
export const SeeMyProfileDocument = gql`
    query SeeMyProfile {
  seeMyProfile {
    id
    name
    username
    email
  }
}
    `;

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
export const SeeCategoriesDocument = gql`
    query SeeCategories {
  seeCategories {
    name
    slug
    totalShops
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
export const CreateCoffeeShopDocument = gql`
    mutation CreateCoffeeShop($name: String!, $files: [Upload]!, $categories: [CategoryInput]!, $latitude: String, $longitude: String) {
  createCoffeeShop(
    name: $name
    files: $files
    categories: $categories
    latitude: $latitude
    longitude: $longitude
  ) {
    ok
    error
    coffeeShop {
      id
      name
      latitude
      longitude
      description
      user {
        username
      }
      photos {
        url
      }
      categories {
        name
      }
    }
  }
}
    `;
export type CreateCoffeeShopMutationFn = Apollo.MutationFunction<CreateCoffeeShopMutation, CreateCoffeeShopMutationVariables>;

/**
 * __useCreateCoffeeShopMutation__
 *
 * To run a mutation, you first call `useCreateCoffeeShopMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCoffeeShopMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCoffeeShopMutation, { data, loading, error }] = useCreateCoffeeShopMutation({
 *   variables: {
 *      name: // value for 'name'
 *      files: // value for 'files'
 *      categories: // value for 'categories'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useCreateCoffeeShopMutation(baseOptions?: Apollo.MutationHookOptions<CreateCoffeeShopMutation, CreateCoffeeShopMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCoffeeShopMutation, CreateCoffeeShopMutationVariables>(CreateCoffeeShopDocument, options);
      }
export type CreateCoffeeShopMutationHookResult = ReturnType<typeof useCreateCoffeeShopMutation>;
export type CreateCoffeeShopMutationResult = Apollo.MutationResult<CreateCoffeeShopMutation>;
export type CreateCoffeeShopMutationOptions = Apollo.BaseMutationOptions<CreateCoffeeShopMutation, CreateCoffeeShopMutationVariables>;
export const EditCoffeeShopDocument = gql`
    mutation EditCoffeeShop($shopId: Int!, $name: String, $files: [Upload], $latitude: String, $longitude: String, $categories: [CategoryInput]) {
  editCoffeeShop(
    id: $shopId
    name: $name
    files: $files
    latitude: $latitude
    longitude: $longitude
    categories: $categories
  ) {
    ok
    error
  }
}
    `;
export type EditCoffeeShopMutationFn = Apollo.MutationFunction<EditCoffeeShopMutation, EditCoffeeShopMutationVariables>;

/**
 * __useEditCoffeeShopMutation__
 *
 * To run a mutation, you first call `useEditCoffeeShopMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCoffeeShopMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCoffeeShopMutation, { data, loading, error }] = useEditCoffeeShopMutation({
 *   variables: {
 *      shopId: // value for 'shopId'
 *      name: // value for 'name'
 *      files: // value for 'files'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      categories: // value for 'categories'
 *   },
 * });
 */
export function useEditCoffeeShopMutation(baseOptions?: Apollo.MutationHookOptions<EditCoffeeShopMutation, EditCoffeeShopMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCoffeeShopMutation, EditCoffeeShopMutationVariables>(EditCoffeeShopDocument, options);
      }
export type EditCoffeeShopMutationHookResult = ReturnType<typeof useEditCoffeeShopMutation>;
export type EditCoffeeShopMutationResult = Apollo.MutationResult<EditCoffeeShopMutation>;
export type EditCoffeeShopMutationOptions = Apollo.BaseMutationOptions<EditCoffeeShopMutation, EditCoffeeShopMutationVariables>;
export const DeleteCoffeeShopDocument = gql`
    mutation DeleteCoffeeShop($shopId: Int!) {
  deleteCoffeeShop(id: $shopId) {
    ok
    error
    coffeeShop {
      id
    }
  }
}
    `;
export type DeleteCoffeeShopMutationFn = Apollo.MutationFunction<DeleteCoffeeShopMutation, DeleteCoffeeShopMutationVariables>;

/**
 * __useDeleteCoffeeShopMutation__
 *
 * To run a mutation, you first call `useDeleteCoffeeShopMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCoffeeShopMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCoffeeShopMutation, { data, loading, error }] = useDeleteCoffeeShopMutation({
 *   variables: {
 *      shopId: // value for 'shopId'
 *   },
 * });
 */
export function useDeleteCoffeeShopMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCoffeeShopMutation, DeleteCoffeeShopMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCoffeeShopMutation, DeleteCoffeeShopMutationVariables>(DeleteCoffeeShopDocument, options);
      }
export type DeleteCoffeeShopMutationHookResult = ReturnType<typeof useDeleteCoffeeShopMutation>;
export type DeleteCoffeeShopMutationResult = Apollo.MutationResult<DeleteCoffeeShopMutation>;
export type DeleteCoffeeShopMutationOptions = Apollo.BaseMutationOptions<DeleteCoffeeShopMutation, DeleteCoffeeShopMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($name: String!, $slug: String!) {
  createCategory(name: $name, slug: $slug) {
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
 *      slug: // value for 'slug'
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