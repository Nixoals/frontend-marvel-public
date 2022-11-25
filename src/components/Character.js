import { useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

import thumbnails from '../assets/data/thumbnails';
import background from '../assets/images/background.png';

const Character = ({ characters }) => {
	const { name, thumbnail } = characters;
	const navigate = useNavigate();

	const detectThumbnail = thumbnail.path.split('/').includes('image_not_available');
	const landscape = thumbnails.landscape;
	// const standard = thumbnails.standard;
	// const portrait = thumbnails.portrait;

	const url = !detectThumbnail ? `${thumbnail.path}/${landscape.xlarge}.${thumbnail.extension}` : background;
	return (
		<>
			<section
				className="character-card-container"
				onClick={() => {
					navigate('/character-details', { state: { characters, detectThumbnail } });
				}}
			>
				<div className="character-image">
					<LazyLoad
						offset={300}
						height={200}
						width={270}
						threshold={0.95}
					>
						<img
							src={url}
							alt=""
						/>
					</LazyLoad>
					<div
						className="character-title"
						dangerouslySetInnerHTML={{ __html: name }}
					/>
				</div>
			</section>
		</>
	);
};

export default Character;
