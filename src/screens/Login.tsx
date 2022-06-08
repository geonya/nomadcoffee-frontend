import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { logUserIn } from '../apollo';
import Layout from '../components/Layout';
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
		<Layout>
			<h1>{state?.message || 'Welcome to Nomad Coffee'}</h1>
			<form onSubmit={handleSubmit(onValid)}>
				<input
					{...register('username', { required: 'username is required' })}
					type='text'
					placeholder='username'
				/>
				<span style={{ color: 'red' }}>{errors.username?.message}</span>
				<input
					{...register('password', { required: 'password is required' })}
					type='password'
					placeholder='password'
				/>
				<span style={{ color: 'red' }}>{errors.password?.message}</span>
				<input
					style={{ cursor: 'pointer' }}
					type='submit'
					value={loading ? 'Loading...' : 'Log In'}
					disabled={loading}
				/>
				<span>{errors.result?.message}</span>
			</form>
			<span>
				Don't you have account?
				<a href={routes.signUp} style={{ color: 'blue' }}>
					Sign Up
				</a>
			</span>
		</Layout>
	);
}
