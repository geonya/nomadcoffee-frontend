import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { routes } from "./sharedData";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
	const isDarkMode = useReactiveVar(darkModeVar);
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
				<GlobalStyles />
				<BrowserRouter basename={process.env.PUBLIC_URL}>
					<Routes>
						<Route
							path={routes.home}
							element={isLoggedIn ? <Home /> : <Login />}
						/>
						{!isLoggedIn && <Route path={routes.signUp} element={<SignUp />} />}
						<Route element={<>Page Not found</>} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default App;
