import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from './Avatar';

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px 10px;
	img {
		border-radius: 10px;
		width: 300px;
		height: 300px;
	}
`;
const ShopInfoBox = styled.div`
	width: 100%;
	border: 1px solid red;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const ShopTitle = styled.h1`
	font-size: 18px;
	font-weight: 600;
`;
const ShopCreatorBox = styled.div`
	margin-top: 10px;
	display: flex;
	align-items: center;
`;
const ShopCreator = styled.span`
	margin-left: 5px;
`;

interface ShopBoxProps {
	__typename?: 'CoffeeShop' | undefined;
	id?: number;
	name?: string;
	latitude?: string | null | undefined;
	longitude?: string | null | undefined;
	photos?:
		| ({
				__typename?: 'CoffeeShopPhoto' | undefined;
				url: string;
		  } | null)[]
		| null;
	user?: {
		username: string;
	};
}
export default function ShopBox({ id, name, user, photos }: ShopBoxProps) {
	return (
		<Container>
			<Link to={`/shop/${id}`}>
				{photos ? <img src={photos[0]?.url} alt={name} /> : null}
				<ShopInfoBox>
					<div>
						<ShopTitle>{name}</ShopTitle>
						<ShopCreatorBox>
							<Avatar source={''} size={20} />
							<ShopCreator>{user?.username}</ShopCreator>
						</ShopCreatorBox>
					</div>
					<div>Heart</div>
				</ShopInfoBox>
			</Link>
		</Container>
	);
}
