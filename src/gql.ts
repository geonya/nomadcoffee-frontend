import { gql } from '@apollo/client';

const CAFE_FRAGMENT = gql`
  fragment CafeFragment on Cafe {
    id
    name
    address
    latitude
    longitude
    photos {
      id
      url
    }
    description
    categories {
      name
      slug
    }
    user {
      id
      username
      avatarUrl
    }
    countLikes
    isLiked
  }
`;

const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    name
    avatarUrl
    email
    address
    isMe
    isFollowing
    countCafes
    givenLikes
    totalFollowing
    totalFollowers
  }
`;
const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    caption
    rating
    user {
      id
      username
      avatarUrl
    }
  }
`;

// query

gql`
	query SeeCafes {
		seeCafes {
			...CafeFragment
		}
		${CAFE_FRAGMENT}
	}
	query SeeCafe($cafeId: Int!) {
		seeCafe(id: $cafeId) {
			...CafeFragment
			comments {
				...CommentFragment
			}
		}
		${CAFE_FRAGMENT}
		${COMMENT_FRAGMENT}
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
	query SeeCategory($slug:String!) {
		seeCategory(slug:$slug) {
			...CafeFragment
		}
		${CAFE_FRAGMENT}
	}
	query SeeCategories {
		seeCategories {
			name
			slug
			totalCafes
		}
	}
	query SeeUser($username: String!) {
		seeUser(username: $username) {
			user {
				...UserFragment
				cafes {
				...CafeFragment
				}
				photos {
					url
					cafe {
						id
					}
				}
			}
			
		}
		${CAFE_FRAGMENT}
		${USER_FRAGMENT}
	}
	query SearchCafes($keyword:String!) {
		searchCafes(keyword:$keyword) {
			...CafeFragment
		}
		${CAFE_FRAGMENT}
	}
	query FindComment($cafeId:Int!) {
		findComment(cafeId:$cafeId) {
			ok
			error
			comment {
				...CommentFragment
			}
		}
		${COMMENT_FRAGMENT}
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
	mutation EditProfile($username: String, $name: String, $email: String, $password: String, $avatar: Upload, $githubUsername: String, $address: String) {
  editProfile(username: $username, name: $name, email: $email, password: $password, avatar: $avatar, githubUsername: $githubUsername, address: $address) {
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
		$id: Int!
		$name: String
		$files: [Upload]
		$address: String
		$description:String
		$categories: [CategoryInput]
		$latitude:Float
		$longitude:Float
		$deleteIds:[Int]
	) {
		editCafe(
			id: $id
			name: $name
			files: $files
			address: $address
			description:$description
			categories: $categories
			latitude:$latitude
			longitude:$longitude
			deleteIds:$deleteIds
		) {
			ok
			error
			cafe {
				...CafeFragment
			}
		}
		${CAFE_FRAGMENT}
	}
	mutation DeleteCafe($id: Int!) {
		deleteCafe(id: $id) {
			ok
			error
			id
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
	mutation followUser($username: String!) {
  followUser(username: $username) {
			ok
			error
  	}
	}
	mutation unfollowUser($username: String!) {
  unfollowUser(username: $username) {
			ok
			error
  	}
	}
	mutation CreateComment($caption:String!, $rating:Int! ,$cafeId:Int!) {
		createComment(caption:$caption, rating:$rating, cafeId:$cafeId) {
			ok
			error
			comment {
				...CommentFragment
			}
		}
		${COMMENT_FRAGMENT}
	}
	mutation DeleteComment($id:Int!) {
		deleteComment(id:$id) {
			ok
			error
		}
	}
`;
