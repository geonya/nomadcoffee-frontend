import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useToggleLikeMutation } from '../generated/graphql';
import Avatar from './Avatar';

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 15px 10px;
`;

const CafeImg = styled.img`
	border-radius: 10px;
	width: 320px;
	height: 250px;
`;
const CafeInfoBox = styled.div`
	width: 100%;
	padding: 10px 30px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;
const CafeTitle = styled.h1`
	font-size: 18px;
	font-weight: 600;
`;
const CafeCreatorBox = styled.div`
	margin-top: 10px;
	display: flex;
	align-items: center;
`;
const CafeCreator = styled.span`
	margin-left: 5px;
`;
const LikeButtonContainer = styled.div`
	display: flex;
	align-items: center;
`;
const LikeButton = styled.button`
	width: 25px;
	height: 25px;
	margin-right: 5px;
	svg {
		color: ${(props) => props.theme.red};
	}
`;

interface CafeBoxProps {
	__typename?: 'Cafe' | undefined;
	id?: number;
	name?: string;
	latitude?: string | null | undefined;
	longitude?: string | null | undefined;
	countLikes?: number;
	isLiked?: boolean;
	photos?:
		| ({
				__typename?: 'CafePhoto' | undefined;
				url: string;
		  } | null)[]
		| null;
	user?: {
		username: string;
		avatarUrl?: string | null;
	};
}
export default function CafeBox({
	id,
	name,
	user,
	photos,
	countLikes,
	isLiked,
}: CafeBoxProps) {
	const [toggleLikeMutation, { loading }] = useToggleLikeMutation({
		update: (cache, result) => {
			cache.modify({
				id: `Cafe:${id}`,
				fields: {
					isLiked: (prev) => !prev,
					countLikes: (prev) => (isLiked ? prev - 1 : prev + 1),
				},
			});
		},
	});
	const toggleLike = (id: number) => {
		if (loading) return;
		toggleLikeMutation({
			variables: {
				cafeId: id,
			},
		});
	};
	return (
		<Container>
			{photos ? (
				<Link to={`/cafe/${id}`}>
					<CafeImg src={photos[0]?.url} alt={name} />
				</Link>
			) : null}
			<CafeInfoBox>
				<div>
					<Link to={`/cafe/${id}`}>
						<CafeTitle>{name}</CafeTitle>
					</Link>
					<CafeCreatorBox>
						<Avatar source={user?.avatarUrl || ''} size={20} />
						<CafeCreator>{user?.username}</CafeCreator>
					</CafeCreatorBox>
				</div>
				<LikeButtonContainer>
					<LikeButton onClick={() => toggleLike(id!)}>
						<svg
							fill={isLiked ? 'currentColor' : 'none'}
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
							></path>
						</svg>
					</LikeButton>
					<span>{countLikes}</span>
				</LikeButtonContainer>
			</CafeInfoBox>
		</Container>
	);
}
