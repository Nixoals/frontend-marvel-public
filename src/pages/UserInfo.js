import Cookies from 'js-cookie';

import FavoriteCharacters from '../components/FavoriteCharacters';

const UserInfo = () => {
	const favorites = JSON.parse(Cookies.get('favorites'));
	const { characters } = favorites;

	const userInfo = JSON.parse(Cookies.get('user'));
	return (
		<>
			<section className="user-info-container">
				<div className="personal-info">
					<div className="personal-info-avatar">
						<img
							src={userInfo.avatar}
							alt="avatar"
						></img>
					</div>
					<div className="personal-info-username">{userInfo.username}</div>
				</div>

				<div>
					{characters.length > 0 ? (
						<>
							<div className="user-favorite-container">
								<div className="favorite-character-container">
									<h1>My Favorites Characters </h1>
									<div className="favorite-character-wrapper">
										{favorites.characters.map((character) => {
											return (
												<FavoriteCharacters
													key={character}
													id={character}
												></FavoriteCharacters>
											);
										})}
									</div>
								</div>
							</div>
						</>
					) : (
						<>
							<div className="favorite-character-container">
								<h1>No favorite yet!!</h1>
							</div>
						</>
					)}
				</div>
			</section>
		</>
	);
};
export default UserInfo;
