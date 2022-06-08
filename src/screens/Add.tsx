import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { createCategoryObj } from '../components/sharedFunc';
import {
	useCreateCoffeeShopMutation,
	useSeeCategoriesQuery,
} from '../generated/graphql';
import { routes } from '../sharedData';

interface AddFormValues {
	name: string;
	latitude: string;
	longitude: string;
	files: FileList;
	result: string;
}
interface CategoryAddFormValues {
	name: string;
}

const Add = () => {
	const [categoryList, setcategoryList] = useState<string[]>([]);
	const [pickCategories, setPickCategories] = useState<string[]>([]);
	const [addCategoryModal, setAddCategoryModal] = useState(false);

	const navigation = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<AddFormValues>();
	const { register: categoryRegister, handleSubmit: categoryHandleSubmit } =
		useForm<CategoryAddFormValues>();

	const onCategorySubmitValid: SubmitHandler<CategoryAddFormValues> = (
		data
	) => {
		setcategoryList((prev) => [...prev, data.name]);
		setAddCategoryModal(false);
	};
	const [CreateCoffeeShopMutation, { loading }] = useCreateCoffeeShopMutation({
		onCompleted: (data) => {
			if (!data.createCoffeeShop) return;
			const {
				createCoffeeShop: { ok, error },
			} = data;
			if (!ok) {
				setError('result', { message: error! });
				return;
			}
			navigation(routes.home);
		},
	});
	const onSubmitValid: SubmitHandler<AddFormValues> = (data) => {
		if (loading) return;
		const files = Array.from(data.files);
		const categories = pickCategories.map((name) => createCategoryObj(name));
		console.log(categories);
		CreateCoffeeShopMutation({
			variables: {
				...data,
				categories,
				files,
			},
		});
	};

	useSeeCategoriesQuery({
		onCompleted: (data) => {
			if (!data.seeCategories) return;
			data?.seeCategories?.map((category) =>
				setcategoryList((prev) => (category ? [...prev, category.name] : prev))
			);
		},
	});

	return (
		<Layout>
			<form onSubmit={handleSubmit(onSubmitValid)}>
				<input type='file' accept='image/*' {...register('files')} multiple />
				<span>Photo</span>
				<input
					type='text'
					placeholder='Name'
					{...register('name', { required: true })}
				/>
				<input
					type='text'
					placeholder='latitude'
					{...register('latitude', { required: true })}
				/>
				<input
					type='text'
					placeholder='longitude'
					{...register('longitude', { required: true })}
				/>
				<span>Pick Categories</span>
				<div>
					{categoryList.map((name, i) => (
						<span
							key={i}
							style={{
								backgroundColor: `${
									pickCategories.includes(name) ? 'red' : 'blue'
								}`,
								color: 'white',
								padding: 2,
							}}
							onClick={() =>
								setPickCategories((prev) =>
									!pickCategories.includes(name)
										? [...prev, name]
										: [...prev.filter((item) => item !== name!)]
								)
							}
						>
							{name}
						</span>
					))}
					<span onClick={() => setAddCategoryModal((prev) => !prev)}>+</span>
				</div>
				<input type='submit' value='Create' />
				<span>{errors.result?.message}</span>
			</form>
			{addCategoryModal ? (
				<div
					style={{
						position: 'absolute',
						width: 200,
						height: 200,
						margin: 'auto auto',
					}}
				>
					<form onSubmit={categoryHandleSubmit(onCategorySubmitValid)}>
						<input
							{...categoryRegister('name')}
							type='text'
							placeholder='name'
						/>
						<input type='submit' value='Add Category' />
					</form>
				</div>
			) : null}
		</Layout>
	);
};

export default Add;
