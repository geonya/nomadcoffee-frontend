// mutation

import { gql } from "@apollo/client";

gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			ok
			token
			error
		}
	}
	mutation CreateAccount(
		$name: String!
		$username: String!
		$email: String!
		$password: String!
	) {
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