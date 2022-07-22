import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { client, darkModeVar, isLoggedInVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import Add from './screens/Add';
import SignUp from './screens/SignUp';
import { routes } from './routes';
import { darkTheme, GlobalStyles, lightTheme } from './styles';
import Cafe from './screens/Cafe';
import Category from './screens/Category';
import Search from './screens/Search';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import EditCafe from './screens/EditCafe';
import NotFound from './components/NotFound';

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
            <Route path={routes.category} element={<Category />} />
            <Route
              path={routes.user}
              element={isLoggedIn ? <Profile /> : <Login />}
            />
            <Route
              path={routes.editProfile}
              element={isLoggedIn ? <EditProfile /> : <Login />}
            />
            <Route path={routes.category} element={<Category />} />
            <Route path={routes.editCafe} element={<EditCafe />} />
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
