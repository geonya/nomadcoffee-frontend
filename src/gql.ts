import { gql } from '@apollo/client';

// query

gql`
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
	query SeeMyProfile {
		seeMyProfile {
			id
			name
			username
			email
		}
	}
	query SeeCategories {
		seeCategories {
			name
			slug
			totalShops
		}
	}
`;

// muation
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
	mutation CreateCoffeeShop(
		$name: String!
		$files: [Upload]!
		$categories: [CategoryInput]!
		$latitude: String
		$longitude: String
	) {
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
	mutation EditCoffeeShop(
		$shopId: Int!
		$name: String
		$files: [Upload]
		$latitude: String
		$longitude: String
		$categories: [CategoryInput]
	) {
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
	mutation DeleteCoffeeShop($shopId: Int!) {
		deleteCoffeeShop(id: $shopId) {
			ok
			error
			coffeeShop {
				id
			}
		}
	}
	mutation CreateCategory($name: String!, $slug: String!) {
		createCategory(name: $name, slug: $slug) {
			ok
			error
		}
	}
`;
