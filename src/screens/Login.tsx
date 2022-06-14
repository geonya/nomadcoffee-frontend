import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { logUserIn } from '../apollo';
import AuthInput from '../components/auth/AuthInput';
import AuthLayout from '../components/auth/AuthLayout';
import SubmitButton from '../components/buttons/SubmitButton';
import FormError from '../components/FormError';
import { useLoginMutation } from '../generated/graphql';
import { routes } from '../sharedData';
import { SignUpState } from './SignUp';

interface LoginFormValues {
	username: string;
	password: string;
	result: string;
}
export default function Login() {
	const location = useLocation();
	const state = location.state as SignUpState;
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<LoginFormValues>({ mode: 'onChange' });
	const [loginMutation, { loading }] = useLoginMutation({
		onCompleted: (data) => {
			if (!data?.login) return;
			const {
				login: { ok, error, token },
			} = data;
			if (ok && token) {
				logUserIn(token);
			}
			if (!ok) {
				setError('result', { message: error! });
			}
		},
	});
	const onValid: SubmitHandler<LoginFormValues> = (data) => {
		if (loading) return;
		loginMutation({ variables: { ...data } });
	};
	return (
		<AuthLayout>
			<h1>{state?.message || 'Welcome to Nomad Coffee'}</h1>
			<form onSubmit={handleSubmit(onValid)}>
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
					hasError={Boolean(errors.username?.message)}
				/>
				<FormError message={errors.username?.message} />
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
					hasError={Boolean(errors.password?.message)}
				/>
				<FormError message={errors.password?.message} />
				<SubmitButton
					style={{ cursor: 'pointer' }}
					type='submit'
					value={loading ? 'Loading...' : 'Log In'}
					disabled={loading}
				/>
				<FormError message={errors.result?.message} />
			</form>
			<span>
				Don't you have account?
				<a href={routes.signUp} style={{ color: 'blue' }}>
					Sign Up
				</a>
			</span>
		</AuthLayout>
	);
}
