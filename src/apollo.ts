import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { DARK_MODE, routes, TOKEN } from './routes';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { NavigateFunction } from 'react-router-dom';
import { offsetLimitPagination } from '@apollo/client/utilities';

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = (navigate: NavigateFunction) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  navigate(routes.home);
};

export const toggleDarkMode = (isDarkMode: boolean) => {
  if (!isDarkMode) {
    localStorage.setItem(DARK_MODE, 'true');
    darkModeVar(true);
  } else {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
  }
};

const uploadHttpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://nomadcoffee-backend-geony.herokuapp.com/graphql'
      : 'http://localhost:4321/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors);
  }
  if (networkError) {
    console.log(networkError);
  }
});

const httpLink = authLink.concat(onErrorLink).concat(uploadHttpLink);

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeCafes: offsetLimitPagination(),
        },
      },
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
      Cafe: { keyFields: (obj) => `Cafe:${obj.id}` },
    },
  }),
});
