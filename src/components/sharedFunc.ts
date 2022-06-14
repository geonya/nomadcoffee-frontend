import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../apollo';
import { useSeeMyProfileQuery } from '../generated/graphql';

export const createCategoryObj = (name: string) => {
	return {
		name,
		slug: name.replace(' ', '-').toLowerCase(),
	};
};

export const useSeeMyProfileHook = () => {
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	const { data, loading } = useSeeMyProfileQuery();
	if (!loading && isLoggedIn) {
		return { ...data };
	}
};
