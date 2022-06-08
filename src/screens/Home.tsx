import { useReactiveVar } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { darkModeVar, logUserOut, toggleDarkMode } from '../apollo';
import Layout from '../components/Layout';
import { useSeeCoffeeShopsQuery } from '../generated/graphql';
import { routes } from '../sharedData';

export default function Home() {
	const navigate = useNavigate();
	const darkMode = useReactiveVar(darkModeVar);
	const { data, loading } = useSeeCoffeeShopsQuery({ variables: { page: 1 } });
	return (
		<Layout>
			<div
				style={{ width: '100%', marginBottom: 30, justifyContent: 'center' }}
			>
				<button onClick={() => toggleDarkMode(darkMode)}>
					{darkMode ? 'Light Mode' : 'Dark Mode'}
				</button>
				<button onClick={() => navigate(routes.add)}>Add</button>
				<button onClick={logUserOut}>Log Out</button>
			</div>
			<div>
				{loading
					? 'loading...'
					: data?.seeCoffeeShops?.map((shop, i) => (
							<Link key={i} to={`/shop/${shop?.id}`}>
								<div>
									{shop?.photos ? (
										<img
											src={shop?.photos[0]?.url}
											alt={shop?.name}
											width={300}
											height={300}
										/>
									) : null}
									<h1>{shop?.name}</h1>
									<h3>{shop?.user.username}</h3>
								</div>
							</Link>
					  ))}
			</div>
		</Layout>
	);
}
