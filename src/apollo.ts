import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	makeVar,
} from "@apollo/client";
import { DARK_MODE, TOKEN } from "./sharedData";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const logUserIn = (token: string) => {
	localStorage.setItem(TOKEN, token);
	isLoggedInVar(true);
};
export const logUserOut = () => {
	localStorage.removeItem(TOKEN);
	isLoggedInVar(false);
};

export const toggleDarkMode = (isDarkMode: boolean) => {
	if (!isDarkMode) {
		localStorage.setItem(DARK_MODE, "true");
		darkModeVar(true);
	} else {
		localStorage.removeItem(DARK_MODE);
		darkModeVar(false);
	}
};

const httpLink = createHttpLink({
	uri: "https://nomadcoffee-backend-geony.herokuapp.com/graphql",
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});
