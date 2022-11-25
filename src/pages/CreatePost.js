import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import axios from 'axios';

const CreatePost = () => {
	const [checkTerms, setCheckTerms] = useState(false);
	const [alert, setAlert] = useState('');
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();

	const handleSubmitPost = async (data) => {
		const token = Cookies.get('token');

		if (token) {
			if (!checkTerms) {
				return setAlert('You must accept terms');
			}
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			};
			const body = {
				title: data.title,
				description: data.description,
			};
			// const url = 'http://localhost:4000/user/post';
			const url = 'https://site--marvel--gsmxcbzt8tzm.code.run/user/post';
			await axios.post(url, body, config);

			navigate('/blog');
		} else {
			navigate('/login');
		}
	};

	return (
		<>
			<section className="form-container">
				<div className="form-wrapper">
					<form onSubmit={handleSubmit(handleSubmitPost)}>
						<div>
							<div>Title</div>
							<input
								{...register('title', { required: true })}
								type="text"
							/>
						</div>
						<div>
							<div>Your Post</div>
							<textarea
								className="post-content"
								{...register('description', { required: true })}
								type="text"
							/>
						</div>
						<input
							className="submit-login-signup"
							type="submit"
							value="Post"
						/>
					</form>
					<div>
						<div>
							<div className="terms-and-conditions">Terms and conditions</div>
							<div className="terms-and-conditions-check">
								<input
									{...register('terms')}
									type="checkbox"
									defaultChecked={false}
									onChange={() => {
										setCheckTerms(!checkTerms);
									}}
								/>
								<span style={alert ? { color: 'red' } : { color: 'white' }}>{!alert ? 'I accept terms and conditions' : alert}</span>
							</div>

							<ul className="terms-list">
								<li>Keep your comments on topic. At least, try!</li>
								<li>Be respectful of others who use this website (only if they know what they are talking about!)</li>
								<li>Don’t break the law. This includes defamation, condoning illegal activity</li>
								<li>Don’t use this blog to promote your web developper business, products, services</li>
								<li>Keep it easy!!</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default CreatePost;
