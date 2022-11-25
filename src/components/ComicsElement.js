import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import LazyLoad from 'react-lazy-load';
import thumbnails from '../assets/data/thumbnails';
import background from '../assets/images/316-224background.jpg';

const ComicsElement = ({ comics, handleFavorites }) => {
	const { description, title, thumbnail, _id } = comics;
	const navigate = useNavigate();

	const [alert, setAlert] = useState('');
	const token = Cookies.get('token');
	const favorites = Cookies.get('favorites') ? JSON.parse(Cookies.get('favorites')) : null;

	// const landscape = thumbnails.landscape;
	// const standard = thumbnails.standard;
	const portrait = thumbnails.portrait;
	const detectThumbnail = thumbnail.path.split('/').includes('image_not_available');
	const url = !detectThumbnail ? `${thumbnail.path}/${portrait.incredible}.${thumbnail.extension}` : background;

	const timeSleep = () => {
		setTimeout(() => {
			setAlert('');
		}, 3000);
	};

	const handleAddFavorite = async () => {
		try {
			if (token) {
				const data = { id: _id };
				// const url = `http://localhost:4000/user/comics`;
				const url = `https://site--marvel--gsmxcbzt8tzm.code.run/user/comics`;

				const response = await axios.post(url, data, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});
				if (response.data !== 'already in db') {
					let favorites = JSON.parse(Cookies.get('favorites'));
					favorites.comics.push(_id);

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
			<section className="comics-card-container">
				<div className="flip-comics-card">
					<div className="flip-comics-card-inner">
						<div className="flip-comics-card-front">
							<LazyLoad
								offset={300}
								height={324}
								width={216}
								threshold={0.95}
							>
								<img
									src={url}
									alt=""
								/>
							</LazyLoad>
						</div>

						<div className="flip-comics-card-back">
							<button
								onClick={handleAddFavorite}
								className="add-to-favorite-comics"
							>
								<ion-icon
									className="favorite-icon-comics"
									style={favorites && favorites.comics.find((elemen) => elemen === _id) ? { color: 'red' } : { color: 'wheat' }}
									name="heart"
								></ion-icon>
								{favorites && favorites.comics.find((elemen) => elemen === _id) ? <p>added to favorite</p> : <p>to favorite</p>}
								{alert && <p className="alerte-favorite-comics">already in your favorites</p>}
							</button>
							<h1 dangerouslySetInnerHTML={{ __html: title }} />
							<p dangerouslySetInnerHTML={{ __html: description }} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ComicsElement;
