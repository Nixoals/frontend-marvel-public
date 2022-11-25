import LazyLoad from 'react-lazy-load';

import thumbnails from '../assets/data/thumbnails';
import background from '../assets/images/168-262background.jpg';

const CharacterDetailComics = ({ comics }) => {
	const { description, thumbnail, title } = comics;
	// const landscape = thumbnails.landscape;
	// const standard = thumbnails.standard;
	const portrait = thumbnails.portrait;

	const detectThumbnail = thumbnail.path.split('/').includes('image_not_available');
	const url = !detectThumbnail ? `${thumbnail.path}/${portrait.fantastic}.${thumbnail.extension}` : background;
	return (
		<>
			<div className="associated-comics-wrapper">
				<div>
					<LazyLoad
						offset={300}
						height={262}
						width={168}
						threshold={0.95}
					>
						<img
							src={url}
							alt=""
						/>
					</LazyLoad>
				</div>
				<div className="associated-comics-description">
					<div>{title}</div>
					{description && <div dangerouslySetInnerHTML={{ __html: description }} />}
				</div>
			</div>
		</>
	);
};

export default CharacterDetailComics;
