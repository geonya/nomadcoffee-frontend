import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../apollo';
import { useSeeUserQuery } from '../generated/graphql';

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
