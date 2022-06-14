import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { client, darkModeVar, isLoggedInVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import Add from './screens/Add';
import SignUp from './screens/SignUp';
import { routes } from './sharedData';
import { darkTheme, GlobalStyles, lightTheme } from './styles';
import Cafe from './screens/Cafe';
import Category from './screens/Category';
import Search from './screens/Search';
import Notification from './screens/Notification';
import Profile from './screens/Profile';

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
						{!isLoggedIn ? (
							<Route path={routes.signUp} element={<SignUp />} />
						) : null}
						<Route path={routes.add} element={<Add />} />
						<Route path={routes.cafe} element={<Cafe />} />
						<Route path={routes.search} element={<Search />} />
						<Route path={routes.notification} element={<Notification />} />
						<Route path={routes.category} element={<Category />} />
						<Route path={routes.user} element={<Profile />} />
						<Route path={'*'} element={<>Page Not found</>} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default App;
