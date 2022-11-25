import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LazyLoad from 'react-lazy-load';
import Cookies from 'js-cookie';
import axios from 'axios';

import CharacterDetailComics from '../components/CharacterDetailsComics';

import thumbnails from '../assets/data/thumbnails';
import background from '../assets/images/450-300background.jpg';

const CharacterDetail = ({ handleFavorites }) => {
	const { state } = useLocation();
	const navigate = useNavigate();

	const { thumbnail, _id, name, description } = state.characters;
	const [isLoading, setIsloading] = useState(true);
	const [data, setData] = useState([]);
	const [alert, setAlert] = useState('');
	const token = Cookies.get('token');
	const favorites = Cookies.get('favorites') ? JSON.parse(Cookies.get('favorites')) : null;

	const detectThumbnail = state.detectThumbnail;
	// const landscape = thumbnails.landscape;
	// const standard = thumbnails.standard;
	const portrait = thumbnails.portrait;
	const url = !detectThumbnail ? `${thumbnail.path}/${portrait.uncanny}.${thumbnail.extension}` : background;

	useEffect(() => {
		const fetchData = async () => {
			// const url = `http://localhost:4000/comics/${_id}`;
			const url = `https://site--marvel--gsmxcbzt8tzm.code.run/comics/${_id}`;
			const response = await axios.get(url);
			setData(response.data);

			setIsloading(false);
		};
		fetchData();
		// eslint-disable-next-line
	}, []);

	const timeSleep = () => {
		setTimeout(() => {
			setAlert('');
		}, 3000);
	};

	const handleAddFavorite = async () => {
		try {
			if (token) {
				const data = { id: _id };
				// const url = `http://localhost:4000/user/characters`;
				const url = `https://site--marvel--gsmxcbzt8tzm.code.run/user/characters`;
				const response = await axios.post(url, data, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});
				if (response.data !== 'already in db') {
					let favorites = JSON.parse(Cookies.get('favorites'));
					favorites.characters.push(_id);

					handleFavorites(favorites);
				} else {
					setAlert('Already in your favorites');
					timeSleep();
				}
			} else {
				navigate('/login');
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<section>
				<div className="main-character-wrapper">
					<div className="name-and-favorite-wrapper">
						<div className="character-id-name">{name}</div>
						<button
							onClick={handleAddFavorite}
							className="add-to-favorite"
						>
							<ion-icon
								className="favorite-icon"
								style={favorites && favorites.characters.find((elemen) => elemen === _id) ? { color: 'red' } : { color: 'white' }}
								name="heart"
							></ion-icon>
							{favorites && favorites.characters.find((elemen) => elemen === _id) ? <p>added to favorite</p> : <p>to favorite</p>}
						</button>
					</div>
					<div className="character-id-card-wraper">
						<LazyLoad
							offset={300}
							height={450}
							width={300}
							threshold={0.95}
						>
							<img
								src={url}
								alt=""
							/>
						</LazyLoad>
						<div className="description-character">
							<div>{description}</div>
						</div>
						{alert && <p className="alerte-favorite">already in your favorites</p>}
					</div>
				</div>
			</section>
			{!isLoading ? (
				<>
					<section className="linked-commics-container">
						{data.comics.length > 0 && <div className="linked-commics-title">{name} related comics</div>}
						{data.comics.map((comics) => {
							return (
								<CharacterDetailComics
									key={comics._id}
									comics={comics}
								></CharacterDetailComics>
							);
						})}
					</section>
				</>
			) : (
				<div>loading</div>
			)}
		</>
	);
};

export default CharacterDetail;
