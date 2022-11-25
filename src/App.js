// Style
import './App.css';

// Dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';

// Pages
import Home from './pages/Home';
import Comics from './pages/Comics';
import CharacterDetail from './pages/CharacterDetail';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import UserInfo from './pages/UserInfo';
import Blog from './pages/Blog';
import CreatePost from './pages/CreatePost';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
	const [token, setToken] = useState(Cookies.get('token') || null);
	const [, SetUserId] = useState(Cookies.get('id' || null));
	const [, setFavorites] = useState(Cookies.get('favorite' || null));
	const [user, setUser] = useState(Cookies.get('user' || null));

	const handleToken = (token, id, favorites, avatar) => {
		if (token) {
			setToken(token);
			SetUserId(id);
			setUser(avatar);
			setFavorites(favorites);

			favorites = JSON.stringify(favorites);

			Cookies.set('favorites', favorites, { expires: 7 });
			Cookies.set('token', token, { expires: 7 });
			Cookies.set('id', id, { expires: 7 });
			Cookies.set('user', avatar, { expires: 7 });
		} else {
			setToken(null);
			SetUserId(null);
			setFavorites(null);
			setUser(null);
			Cookies.remove('favorites');
			Cookies.remove('token');
			Cookies.remove('id');
			Cookies.remove('user');
		}
	};

	const handleFavorites = (favorites) => {
		setFavorites(favorites);

		favorites = JSON.stringify(favorites);
		Cookies.set('favorites', favorites, { expires: 7 });
	};

	return (
		<>
			<Router>
				<Header
					handleToken={handleToken}
					token={token}
					user={user}
				></Header>
				<Routes>
					<Route
						path={'/'}
						element={<Home></Home>}
					></Route>
					<Route
						path={'/character-details'}
						element={<CharacterDetail handleFavorites={handleFavorites}></CharacterDetail>}
					></Route>
					<Route
						path={'/comics'}
						element={<Comics handleFavorites={handleFavorites}></Comics>}
					></Route>
					<Route
						path={'/signup'}
						element={<SignUp handleToken={handleToken}></SignUp>}
					></Route>
					<Route
						path={'/login'}
						element={<Login handleToken={handleToken}></Login>}
					></Route>
					<Route
						path={'/user-info'}
						element={<UserInfo></UserInfo>}
					></Route>
					<Route
						path={'/blog'}
						element={<Blog></Blog>}
					></Route>
					<Route
						path={'/post'}
						element={<CreatePost></CreatePost>}
					></Route>
				</Routes>
				<Footer></Footer>
			</Router>
		</>
	);
}

export default App;
