import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { createCategoryObj } from '../components/sharedFunc';
import {
	useDeleteCoffeeShopMutation,
	useEditCoffeeShopMutation,
	useSeeCoffeeShopQuery,
} from '../generated/graphql';
import { routes } from '../sharedData';
import { useSeeMyProfile } from '../utils';

interface EditFormValues {
	name: string;
	latitude: string;
	longitude: string;
	files: FileList;
	result: string;
}
interface CategoryAddFormValues {
	name: string;
}
const Shop = () => {
	const [categoryList, setCategoryList] = useState<string[]>([]);
	const [pickCategories, setPickCategories] = useState<string[]>([]);
	const [addCategoryModal, setAddCategoryModal] = useState(false);
	const navigation = useNavigate();
	const [isMe, setIsMe] = useState(false);
	const { id: shopId } = useParams();
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		formState: { errors },
	} = useForm<EditFormValues>({ mode: 'onChange' });
	const { register: categoryRegister, handleSubmit: categoryHandleSubmit } =
		useForm<CategoryAddFormValues>();

	const onCategorySubmitValid: SubmitHandler<CategoryAddFormValues> = (
		data
	) => {
		setCategoryList((prev) => [...prev, data.name]);
		setAddCategoryModal(false);
	};
	const { data, loading } = useSeeCoffeeShopQuery({
		variables: { shopId: +shopId! },
		onCompleted: (data) => {
			if (!data.seeCoffeeShop) return;
			data.seeCoffeeShop?.categories?.forEach((category) => {
				setCategoryList((prev) => (category ? [...prev, category.name] : prev));
				setPickCategories((prev) =>
					category ? [...prev, category.name] : prev
				);
			});
		},
	});
	const { data: meData } = useSeeMyProfile();
	const [editCoffeeshopMutation, { loading: editLoading }] =
		useEditCoffeeShopMutation({
			onCompleted: (data) => {
				if (!data.editCoffeeShop) return;
				const {
					editCoffeeShop: { ok, error },
				} = data;
				if (!ok) {
					setError('result', { message: error! });
				}
			},
		});
	const onSubmitValid: SubmitHandler<EditFormValues> = (data) => {
		if (loading) return;
		const categories = pickCategories.map((name) => createCategoryObj(name));
		editCoffeeshopMutation({
			variables: {
				shopId: +shopId!,
				categories,
				...data,
			},
		});
	};
	const [deleteCoffeeShopMutation, { loading: deleteLoading }] =
		useDeleteCoffeeShopMutation({
			onCompleted: (data) => {
				if (!data.deleteCoffeeShop) return;
				const {
					deleteCoffeeShop: { ok, error },
				} = data;
				if (!ok) {
					setError('result', { message: error! });
				}
				navigation(routes.home);
			},
		});
	useEffect(() => {
		if (data?.seeCoffeeShop?.name) setValue('name', data?.seeCoffeeShop?.name);
		if (data?.seeCoffeeShop?.longitude)
			setValue('longitude', data?.seeCoffeeShop?.longitude);
		if (data?.seeCoffeeShop?.latitude)
			setValue('latitude', data?.seeCoffeeShop?.latitude);
	}, [data, setValue]);
	useEffect(() => {
		setIsMe(
			data?.seeCoffeeShop?.user.username === meData?.seeMyProfile?.username
		);
	}, [data, meData]);
	return (
		<Layout>
			{loading ? (
				'loading...'
			) : (
				<>
					{data?.seeCoffeeShop?.photos ? (
						<img
							src={data?.seeCoffeeShop?.photos[0]?.url}
							alt={data?.seeCoffeeShop?.name}
							width={300}
							height={300}
						/>
					) : null}
					<form onSubmit={handleSubmit(onSubmitValid)}>
						<input
							type='file'
							accept='image/*'
							{...register('files')}
							multiple
							disabled={!isMe}
						/>
						<span>Photo</span>
						<input
							type='text'
							placeholder='Name'
							{...register('name', { required: true })}
							disabled={!isMe}
						/>
						<input
							type='text'
							placeholder='latitude'
							{...register('latitude', { required: true })}
							disabled={!isMe}
						/>
						<input
							type='text'
							placeholder='longitude'
							{...register('longitude', { required: true })}
							disabled={!isMe}
						/>
						<span>Categories</span>
						<div>
							{categoryList.map((name, i) => (
								<span
									key={i}
									style={{
										backgroundColor: `${
											pickCategories.includes(name) ? 'red' : 'blue'
										}`,
										color: 'white',
										padding: 5,
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
							<span onClick={() => setAddCategoryModal((prev) => !prev)}>
								+
							</span>
						</div>
						{isMe ? (
							<button>{editLoading ? 'Loading...' : 'Edit Shop'}</button>
						) : null}
						<span>{errors.result?.message}</span>
					</form>
					{isMe ? (
						<button
							onClick={() =>
								deleteCoffeeShopMutation({
									variables: { shopId: +shopId! },
								})
							}
						>
							{deleteLoading ? 'Loading...' : 'Delete Shop'}
						</button>
					) : null}
				</>
			)}
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

export default Shop;
