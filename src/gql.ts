import { gql } from '@apollo/client';

export const CAFE_FRAGMENT = gql`
  fragment CafeFragment on Cafe {
    id
    name
    address
    latitude
    longitude
    photos {
      url
    }
    description
    categories {
      name
    }
    user {
      username
      avatarUrl
    }
    countLikes
    isLiked
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatarUrl
    email
    countCafes
    givenLikes
  }
`;

// query

gql`
	query SeeCafes($offset: Int!) {
		seeCafes(offset: $offset) {
			...CafeFragment
		}
		${CAFE_FRAGMENT}
	}
	query SeeCafe($cafeId: Int!) {
		seeCafe(id: $cafeId) {
			...CafeFragment
		}
		${CAFE_FRAGMENT}
	}
	query SeeMyProfile {
		seeMyProfile {
			...UserFragment
			cafes {
			...CafeFragment
			}
		}
		${USER_FRAGMENT}
		${CAFE_FRAGMENT}
	}
	query SeeCategories {
		seeCategories {
			name
			slug
			totalCafes
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
	mutation CreateCafe(
		$name: String!
		$files: [Upload]!
		$categories: [CategoryInput]
		$address: String
		$description:String
		$latitude:Float
		$longitude:Float
	) {
		createCafe(
			name: $name
			files: $files
			categories: $categories
			address: $address
			description:$description
			latitude:$latitude
			longitude:$longitude
		) {
			ok
			error
			cafe {
				...CafeFragment
			}
		}
		${CAFE_FRAGMENT}
	}
	mutation EditCafe(
		$cafeId: Int!
		$name: String
		$files: [Upload]
		$address: String
		$description:String
		$categories: [CategoryInput]
	) {
		editCafe(
			id: $cafeId
			name: $name
			files: $files
			address: $address
			description:$description
			categories: $categories
		) {
			ok
			error
		}
	}
	mutation DeleteCafe($cafeId: Int!) {
		deleteCafe(id: $cafeId) {
			ok
			error
		}
	}
	mutation CreateCategory($name: String!) {
		createCategory(name: $name) {
			ok
			error
		}
	}
	mutation ToggleLike($cafeId: Int!) {
  toggleLike(id: $cafeId) {
    ok
    error
  }
}
`;
