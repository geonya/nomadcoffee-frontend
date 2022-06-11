import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px 10px;
	img {
		width: 300px;
		height: 300px;
	}
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
				<h1>{name}</h1>
				<h3>{user?.username}</h3>
			</Link>
		</Container>
	);
}
