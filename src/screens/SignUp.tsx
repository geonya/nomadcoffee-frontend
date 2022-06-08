import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCreateAccountMutation } from '../generated/graphql';
import { routes } from '../sharedData';

interface SignUpFormValues {
	username: string;
	password: string;
	name: string;
	email: string;
	result: string;
}
export interface SignUpState {
	username: string;
	password: string;
	message: string;
}

export default function SignUp() {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		getValues,
		formState: { errors },
	} = useForm<SignUpFormValues>({
		mode: 'onChange',
	});
	const navigate = useNavigate();
	const [CreateAccountMutation, { loading }] = useCreateAccountMutation({
		onCompleted: (data) => {
			if (!data.createAccount) return;
			const {
				createAccount: { ok, error },
			} = data;
			if (!ok) {
				setError('result', { message: error! });
			}
			const { username, password, name } = getValues();
			const signUpState: SignUpState = {
				username,
				password,
				message: `Hello, ${name} Welcome to Nomad Coffee ! `,
			};
			navigate(routes.home, { state: signUpState });
		},
	});
	const onValid: SubmitHandler<SignUpFormValues> = ({
		username,
		name,
		email,
		password,
	}) => {
		if (loading) return;
		CreateAccountMutation({
			variables: {
				name,
				username,
				password,
				email,
			},
		});
	};
	return (
		<Layout>
			<form onSubmit={handleSubmit(onValid)}>
				<input
					{...register('name', {
						required: 'Name is required!',
						minLength: {
							value: 2,
							message: '2~10자 이내에 영문만 사용 가능합니다. ',
						},
						maxLength: {
							value: 10,
							message: '2~10자 이내에 영문만 사용 가능합니다. ',
						},
						pattern: {
							value: /^[a-zA-Z]{2,10}$/g,
							message: '2~10자 이내에 영문만 사용 가능합니다.',
						},
						onChange: () => {
							clearErrors('result');
						},
					})}
					type='text'
					placeholder='name'
				/>
				<span style={{ color: 'red' }}>{errors.name?.message}</span>
				<input
					{...register('username', {
						required: 'User Name is required!',
						minLength: {
							value: 2,
							message: '2~10자 이내에 영문이나 숫자만 사용 가능합니다. ',
						},
						maxLength: {
							value: 10,
							message: '2~10자 이내에 영문이나 숫자만 사용 가능합니다. ',
						},
						pattern: {
							value: /^[a-z0-9]{2,10}$/g,
							message: '2~10자 이내에 영문이나 숫자만 사용 가능합니다.',
						},
						onChange: () => {
							clearErrors('result');
						},
					})}
					type='text'
					placeholder='username'
				/>
				<span style={{ color: 'red' }}>{errors.username?.message}</span>
				<input
					{...register('email', {
						required: 'E-mail is required!',
						pattern: {
							value:
								/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
							message: '이메일이 형식에 맞지 않습니다.',
						},
						onChange: () => {
							clearErrors('result');
						},
					})}
					type='text'
					placeholder='email'
				/>
				<span style={{ color: 'red' }}>{errors.email?.message}</span>
				<input
					{...register('password', {
						required: 'Password is required!',
						minLength: {
							value: 4,
							message: '비밀번호는 최소 4자 이상이여야 합니다.',
						},
						onChange: () => {
							clearErrors('result');
						},
					})}
					type='password'
					placeholder='password'
				/>
				<span style={{ color: 'red' }}>{errors.password?.message}</span>
				<input
					style={{ cursor: 'pointer' }}
					type='submit'
					value={loading ? 'Loading...' : 'Create Account'}
					disabled={loading}
				/>
				<span>{errors.result?.message}</span>
			</form>
			<span>
				Have your account? Please{' '}
				<a href={routes.home} style={{ color: 'blue' }}>
					Login
				</a>
			</span>
		</Layout>
	);
}
