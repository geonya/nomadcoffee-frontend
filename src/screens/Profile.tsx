import { logUserOut } from '../apollo';
import Layout from '../components/Layout';

export default function Profile() {
	return (
		<Layout>
			<button onClick={logUserOut}>Log Out</button>
		</Layout>
	);
}
