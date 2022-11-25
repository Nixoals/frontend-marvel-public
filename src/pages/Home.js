import { useEffect, useState } from 'react';
import axios from 'axios';

import Character from '../components/Character';
import Hero from '../components/hero';
import Loader from '../components/Loader';
import AutoComplete from '../components/AutoComplete';

const Home = () => {
	const [isLoading, setIsloading] = useState(true);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [maxPage, setMaxPage] = useState(null);
	const [nameSearch, setNameSearch] = useState('');

	const handlePagePlus = () => {
		if (page < maxPage) {
			const newPage = page + 1;
			setPage(newPage);
			setIsloading(true);
		}
	};

	const handlePageMinus = () => {
		if (page > 1) {
			const newPage = page - 1;
			setPage(newPage);
			setIsloading(true);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const limit = 100;
				let skip = page * limit - limit;
				// if (nameSearch) {
				// 	setPage(1);
				// 	skip = 1 * limit - limit;
				// }

				// const url = 'http://localhost:4000/characters';
				const url = 'https://site--marvel--gsmxcbzt8tzm.code.run/characters';
				const response = await axios.get(url, { params: { limit, name: nameSearch, skip } });
				const newPagesCount = Math.round(response.data.count / limit);

				setMaxPage(newPagesCount);
				setIsloading(false);
				setData(response.data);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
		// eslint-disable-next-line
	}, [isLoading]);

	return (
		<>
			<Hero></Hero>
			<section>
				<div className="secondary-nav-search">
					<AutoComplete
						setNameSearch={setNameSearch}
						setIsloading={setIsloading}
						property={'name'}
					></AutoComplete>
					<div className="search-pages-wrapper">
						<button
							onClick={() => {
								handlePageMinus();
							}}
						>
							Prev
						</button>
						<div>
							{page}/{maxPage}
						</div>
						<button
							onClick={() => {
								handlePagePlus();
							}}
						>
							Next
						</button>
					</div>
				</div>
				{!isLoading ? (
					<>
						<section className="container-character">
							<div className="character-wrapper">
								{data.results.map((characters) => {
									return (
										<Character
											key={characters._id}
											characters={characters}
										></Character>
									);
								})}
							</div>
						</section>
					</>
				) : (
					<div style={{ width: '100vw', height: 'calc(100vh - 420px)' }}>
						<Loader></Loader>
					</div>
				)}
			</section>
		</>
	);
};

export default Home;
