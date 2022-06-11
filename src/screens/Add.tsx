import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { createCategoryObj } from '../components/sharedFunc';
import {
	useCreateCoffeeShopMutation,
	useSeeCategoriesQuery,
} from '../generated/graphql';
import { routes } from '../sharedData';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ShopForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	input {
		padding: 5px;
		border: 1px solid ${(props) => props.theme.borderColor};
	}
`;

const CategoryListBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	border: 1px solid ${(props) => props.theme.borderColor};
`;
const CategoryList = styled.div`
	display: flex;
`;
const CategoryItem = styled.span<{ picked: boolean }>`
	margin: 0 5px;
	cursor: pointer;
	padding: 3px;
	background-color: ${(props) => (props.picked ? 'blue' : '')};
	color: ${(props) => (props.picked ? 'white' : '')};
	border: 1px solid ${(props) => props.theme.borderColor};
	border-radius: 10px;
`;
const CategoryAddButton = styled.div`
	margin-top: 20px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	padding: 5px;
	border: 1px solid ${(props) => props.theme.borderColor};
	border-radius: 10px;
`;
const ModalBackground = styled.div`
	background-color: rgba(0, 0, 0, 0.5);
	position: absolute;
	width: 100%;
	height: 100%;
`;
const CategoryAddModal = styled.div`
	position: absolute;
	top: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 30px;
	background-color: white;
	width: 200px;
	height: 100px;
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		input {
			font-size: 18px;
			padding: 10px;
			text-align: center;
		}
	}
`;
const CategoryTitle = styled.div`
	padding: 10px 0;
	font-size: 15px;
`;

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
		},
		update: (cache, result) => {
			if (!result.data?.createCoffeeShop.coffeeShop) return;
			const {
				data: {
					createCoffeeShop: { coffeeShop },
				},
			} = result;
			if (coffeeShop.id) {
				cache.modify({
					id: `ROOT_QUERY`,
					fields: {
						seeCoffeeShops: (prev) => [coffeeShop, ...prev],
					},
				});
			}
			navigation(routes.home);
		},
	});
	const onSubmitValid: SubmitHandler<AddFormValues> = (data) => {
		if (loading) return;
		const files = Array.from(data.files);
		const categories = pickCategories.map((name) => createCategoryObj(name));
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
			<Wrapper>
				<ShopForm onSubmit={handleSubmit(onSubmitValid)}>
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
					<CategoryListBox>
						<CategoryTitle>
							<span>Categories</span>
						</CategoryTitle>
						<CategoryList>
							{categoryList.map((name, i) => (
								<CategoryItem
									key={i}
									onClick={() =>
										setPickCategories((prev) =>
											!pickCategories.includes(name)
												? [...prev, name]
												: [...prev.filter((item) => item !== name!)]
										)
									}
									picked={pickCategories.includes(name)}
								>
									{name}
								</CategoryItem>
							))}
						</CategoryList>
						<CategoryAddButton onClick={() => setAddCategoryModal(true)}>
							ADD
						</CategoryAddButton>
					</CategoryListBox>
					<input type='submit' value='Create' />
					<span>{errors.result?.message}</span>
				</ShopForm>
				{addCategoryModal ? (
					<>
						<ModalBackground onClick={() => setAddCategoryModal(false)} />
						<CategoryAddModal>
							<form onSubmit={categoryHandleSubmit(onCategorySubmitValid)}>
								<input
									{...categoryRegister('name', { required: true })}
									type='text'
									placeholder='name'
								/>
								<input type='submit' value='Add' />
							</form>
						</CategoryAddModal>
					</>
				) : null}
			</Wrapper>
		</Layout>
	);
};

export default Add;
