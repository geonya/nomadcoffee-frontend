import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import { useLoginMutation } from "../generated/graphql";
import { routes } from "../sharedData";
import { SignUpState } from "./SignUp";

const Container = styled.div`
	display: flex;
	height: 100vh;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const Wrapper = styled.div`
	max-width: 350px;
	width: 100%;
	form {
		flex-direction: column;
		input {
			border: 1px solid black;
			padding: 10px;
			width: 100%;
		}
	}
`;

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
	} = useForm<LoginFormValues>({ mode: "onChange" });
	const [loginMutation, { loading }] = useLoginMutation({
		onCompleted: (data) => {
			if (!data?.login) return;
			const {
				login: { ok, error, token },
			} = data;
			if (!ok) {
				setError("result", { message: error! });
			} else if (token) {
				logUserIn(token);
			}
		},
	});
	const onValid: SubmitHandler<LoginFormValues> = (data) => {
		if (loading) return;
		loginMutation({ variables: { ...data } });
	};
	return (
		<Container>
			<Wrapper>
				<span>{state.message}</span>
				<form onSubmit={handleSubmit(onValid)}>
					<input
						{...register("username", { required: "username is required" })}
						type="text"
						placeholder="username"
					/>
					<span style={{ color: "red" }}>{errors.username?.message}</span>
					<input
						{...register("password", { required: "password is required" })}
						type="password"
						placeholder="password"
					/>
					<span style={{ color: "red" }}>{errors.password?.message}</span>
					<input
						style={{ cursor: "pointer" }}
						type="submit"
						value={loading ? "Loading..." : "Log In"}
						disabled={loading}
					/>
					<span>{errors.result?.message}</span>
				</form>
				<span>
					Don't you have account?
					<a href={routes.signUp} style={{ color: "blue" }}>
						Sign Up
					</a>
				</span>
			</Wrapper>
		</Container>
	);
}
