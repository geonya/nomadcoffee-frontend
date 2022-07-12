import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedInVar, logUserOut } from '../apollo';
import { useSeeUserQuery } from '../generated/graphql';
import { routes } from '../routes';

export const useSeeUser = (username: string) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useSeeUserQuery({
    variables: {
      username,
    },
    skip: !isLoggedIn,
  });
  return {
    data,
  };
};
