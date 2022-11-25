import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';

import Loader from '../components/Loader';
import thumbnails from '../assets/data/thumbnails';

// import background from '../assets/images/background.png';

const FavoriteCharacters = ({ id }) => {
	const [isLoading, setIsloading] = useState(true);
	const [data, setData] = useState([]);
	const portrait = thumbnails.portrait;

	useEffect(() => {
		const fetchData = async () => {
			// const url = `http://localhost:4000/character/${id}`;
			const url = `https://site--marvel--gsmxcbzt8tzm.code.run/character/${id}`;
			const response = await axios.get(url);

			setData(response.data);
			setIsloading(false);
		};
		fetchData();
		// eslint-disable-next-line
	}, []);

	// const url = data.length > 0 ? `${data.thumbnail.path}/${portrait.incredible}.${data.thumbnail.extension}` : null;
	return !isLoading ? (
		<>
			<section className="image-wrapper">
				<div className="favorite-character-name">{data.name}</div>
				<LazyLoad
					offset={300}
					height={325}
					width={216}
					threshold={0.95}
				>
					<img
						src={`${data.thumbnail.path}/${portrait.incredible}.${data.thumbnail.extension}`}
						alt=""
					/>
				</LazyLoad>
			</section>
		</>
	) : (
		<>
			<div
				className="image-wrapper"
				style={{ height: '325px', minWidth: '216px' }}
			>
				<Loader></Loader>
			</div>
		</>
	);
};

export default FavoriteCharacters;
