import { Link, useNavigate } from 'react-router-dom';

import logoMarvel from '../assets/images/Marvel_Logo.svg';

const Header = ({ token, handleToken, user }) => {
	let userInfo;
	if (token) {
		userInfo = JSON.parse(user);
	}

	const navigate = useNavigate();

	return (
		<>
			<header className="nav-container">
				<nav className="primary-nav">
					<div className="primary-nav-left">
						<Link to={'/'}>
							<div className="logo-marvel">
								<img
									src={logoMarvel}
									alt="logo-marvel"
								></img>
							</div>
						</Link>
						<div className="primary-nav-left-button">
							<div>
								<Link
									to="/"
									style={{ textDecoration: 'none' }}
								>
									<div className="nav-selection-section">Characters</div>
								</Link>
							</div>
							<div>
								<Link
									to="/comics"
									style={{ textDecoration: 'none' }}
								>
									<div className="nav-selection-section">Comics</div>
								</Link>
							</div>
							<div>
								<Link
									to="/blog"
									style={{ textDecoration: 'none' }}
								>
									<div className="nav-selection-section">Post</div>
								</Link>
							</div>
						</div>
					</div>
					<div className="primary-nav-right">
						{token !== null ? (
							<>
								<div
									onClick={() => {
										navigate('user-info');
									}}
									className="user-info"
								>
									<div>{userInfo.username}</div>
									<div className="user-avatar-picture">
										<img
											src={userInfo.avatar}
											alt="avatar"
										></img>
									</div>
								</div>
								<button
									onClick={() => {
										handleToken();
										navigate('/');
									}}
								>
									Logout
								</button>
							</>
						) : (
							<button
								onClick={() => {
									navigate('/login');
								}}
							>
								Login/Signup
							</button>
						)}
					</div>
				</nav>
				<section></section>
			</header>
		</>
	);
};

export default Header;
