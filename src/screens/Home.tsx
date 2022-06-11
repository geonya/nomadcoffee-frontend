import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useSeeCoffeeShopsQuery } from '../generated/graphql';

const ShopBox = styled.div`
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

export default function Home() {
	const { data, loading } = useSeeCoffeeShopsQuery({ variables: { page: 1 } });
	return (
		<Layout>
			{loading
				? 'loading...'
				: data?.seeCoffeeShops?.map((shop, i) => (
						<ShopBox key={i}>
							<Link to={`/shop/${shop?.id}`}>
								{shop?.photos ? (
									<img src={shop?.photos[0]?.url} alt={shop?.name} />
								) : null}
								<h1>{shop?.name}</h1>
								<h3>{shop?.user.username}</h3>
							</Link>
						</ShopBox>
				  ))}
		</Layout>
	);
}
