import { gql } from '@apollo/client';

export const COFFEESHOP_FRAGMENT = gql`
	fragment CoffeeShopFragment on CoffeeShop {
		id
		name
		latitude
		longitude
		photos {
			url
		}
		categories {
			name
		}
		user {
			username
		}
	}
`;

// query

gql`
	query SeeCoffeeShops($page: Int!) {
		seeCoffeeShops(page: $page) {
			...CoffeeShopFragment
		}
		${COFFEESHOP_FRAGMENT}
	}
	query SeeCoffeeShop($shopId: Int!) {
		seeCoffeeShop(id: $shopId) {
			...CoffeeShopFragment
		}
		${COFFEESHOP_FRAGMENT}
	}
	query SeeMyProfile {
		seeMyProfile {
			id
			name
			username
			email
			avatarUrl
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
				...CoffeeShopFragment
			}
		}
		${COFFEESHOP_FRAGMENT}
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
		}
	}
	mutation CreateCategory($name: String!, $slug: String!) {
		createCategory(name: $name, slug: $slug) {
			ok
			error
		}
	}
`;
