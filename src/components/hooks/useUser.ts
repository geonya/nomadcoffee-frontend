import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedInVar, logUserOut } from '../../apollo';
import { useSeeMyProfileQuery } from '../../generated/graphql';

export const useSeeMyProfileHook = () => {
	const navigate = useNavigate();
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	const { data } = useSeeMyProfileQuery({ skip: !isLoggedIn });
	useEffect(() => {
		if (data?.seeMyProfile === null) {
			logUserOut(navigate);
		}
	}, [data, navigate]);
	return {
		data,
	};
};
