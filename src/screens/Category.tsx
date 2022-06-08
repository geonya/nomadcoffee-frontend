import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const Category = () => {
	const { name } = useParams();
	return (
		<Layout>
			<span>{name}</span>
		</Layout>
	);
};

export default Category;
