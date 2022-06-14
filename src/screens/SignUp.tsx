import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../components/auth/AuthInput';
import AuthLayout from '../components/auth/AuthLayout';
import SubmitButton from '../components/buttons/SubmitButton';
import FormError from '../components/FormError';
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
		<AuthLayout>
			<h1>Create Account</h1>
			<form onSubmit={handleSubmit(onValid)}>
				<AuthInput
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
						onChange: () => clearErrors('result'),
					})}
					type='text'
					placeholder='name'
				/>
				<FormError message={errors?.name?.message} />
				<AuthInput
					{...register('username', {
						required: '이름을 입력해주세요.',
						minLength: {
							value: 2,
							message: '2~10자 이내에 영문이나 숫자만 사용 가능합니다.',
						},
						maxLength: {
							value: 10,
							message: '2~10자 이내에 영문이나 숫자만 사용 가능합니다.',
						},
						pattern: {
							value: /^[a-z0-9]{2,10}$/g,
							message: '2~10자 이내에 영문이나 숫자만 사용 가능합니다.',
						},
						onChange: () => clearErrors('result'),
					})}
					type='text'
					placeholder='Username'
					hasError={Boolean(errors?.username?.message)}
				/>
				<FormError message={errors?.username?.message} />
				<AuthInput
					{...register('email', {
						required: '이메일을 입력해주세요.',
						pattern: {
							value:
								/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
							message: '이메일이 형식에 맞지 않습니다.',
						},
						onChange: () => {
							clearErrors('result');
						},
					})}
					type='test'
					placeholder='E-Mail'
					hasError={Boolean(errors?.email?.message)}
				/>
				<FormError message={errors?.email?.message} />
				<AuthInput
					{...register('password', {
						required: '비밀번호를 입력해주세요.',
						minLength: {
							value: 4,
							message: '비밀번호는 최소 4자 이상이여야 합니다.',
						},
						onChange: () => clearErrors('result'),
					})}
					type='password'
					placeholder='password'
					hasError={Boolean(errors?.password?.message)}
				/>
				<FormError message={errors?.password?.message} />
				<SubmitButton
					style={{ cursor: 'pointer' }}
					type='submit'
					value={loading ? 'Loading...' : 'Create Account'}
					disabled={loading}
				/>
				<FormError message={errors?.result?.message} />
			</form>
			<span>
				Have your account? Please{' '}
				<a href={routes.home} style={{ color: 'blue' }}>
					Login
				</a>
			</span>
		</AuthLayout>
	);
}
