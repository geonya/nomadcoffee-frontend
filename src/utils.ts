import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from './apollo';
import { useSeeMyProfileQuery } from './generated/graphql';

export const useSeeMyProfile = () => {
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	const { data, loading } = useSeeMyProfileQuery({ skip: !isLoggedIn });
	return { loading, data };
};
