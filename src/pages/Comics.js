import { useEffect, useState } from 'react';
import axios from 'axios';

import Loader from '../components/Loader';
import AutoComplete from '../components/AutoComplete';
import ComicsElement from '../components/ComicsElement';

const Comics = ({ handleFavorites }) => {
	const [isLoading, setIsloading] = useState(true);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [maxPage, setMaxPage] = useState(null);
	const [titleSearch, setTitleSearch] = useState('');
	const [displayDescription, setDisplayDescrition] = useState(false);

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
				if (page > maxPage) {
					setPage(1);
				}

				// const url = 'http://localhost:4000/comics';
				const url = 'https://site--marvel--gsmxcbzt8tzm.code.run/comics';
				const response = await axios.get(url, { params: { limit, title: titleSearch, skip } });
				const newPagesCount = Math.round(response.data.count / limit);

				setMaxPage(newPagesCount);
				setIsloading(false);
				setData(response.data);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, [isLoading, titleSearch, page, maxPage]);

	return (
		<>
			<section>
				<div className="secondary-nav-search">
					<AutoComplete
						setNameSearch={setTitleSearch}
						setIsloading={setIsloading}
						property={'title'}
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
						<section className="comic-card-wrapper">
							{data.results.map((comics) => {
								return (
									<ComicsElement
										key={comics._id}
										comics={comics}
										displayDescription={displayDescription}
										setDisplayDescrition={setDisplayDescrition}
										handleFavorites={handleFavorites}
									></ComicsElement>
								);
							})}
						</section>
					</>
				) : (
					<div style={{ width: '100vw', height: 'calc(100vh - 120px)' }}>
						<Loader></Loader>
					</div>
				)}
			</section>
		</>
	);
};

export default Comics;
