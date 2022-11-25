import { useState } from 'react';
import RingLoader from 'react-spinners/RingLoader';

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
};
const Loader = () => {
	let [loading] = useState(true);
	let [color] = useState('red');
	return (
		<>
			<div className="sweet-loading">
				<RingLoader color={color} loading={loading} cssOverride={override} size={60} aria-label="Loading Spinner" data-testid="loader" />
			</div>
		</>
	);
};

export default Loader;
