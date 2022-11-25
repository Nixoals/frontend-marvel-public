import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import hulkSignup from '../assets/images/hulkSignup.png';
import deadPool from '../assets/images/deadpoolSignup2.png';

const SignUp = ({ handleToken }) => {
	const [picture, setPicture] = useState('');
	const navigate = useNavigate();

	const { register, handleSubmit } = useForm();

	const handlePicture = (file) => {
		const url = URL.createObjectURL(file);

		setPicture(url);
	};

	const handleSubmitForm = async (data) => {
		const { password, confirmPassword, email, username } = data;
		if (password === confirmPassword && password) {
			const formData = new FormData();

			// const url = 'http://localhost:4000/user/signup';
			const url = 'https://site--marvel--gsmxcbzt8tzm.code.run/user/signup';
			const picture = data.avatar[0] ? data.avatar[0] : null;
			formData.append('email', email);
			formData.append('username', username);
			formData.append('password', password);
			formData.append('avatar', picture);
			const response = await axios.post(url, formData);
			const { token, _id, favorites, account } = response.data;
			const avatar = JSON.stringify(account);

			if (response.data.token) {
				handleToken(token, _id, favorites, avatar);
				return navigate('/');
			}
		}
	};
	return (
		<>
			<section className="form-container">
				<div className="form-wrapper">
					<h1>signup</h1>
					<div className="image-signup-container">
						<img
							src={picture ? picture : hulkSignup}
							alt="hulk-signup"
						></img>
					</div>
					<form onSubmit={handleSubmit(handleSubmitForm)}>
						<div className={'custom-file-input'}>
							<label htmlFor={'file-upload'}>
								<ion-icon name="cloud-upload-outline"></ion-icon>avatar
							</label>

							<input
								{...register('avatar', {
									onChange: (e) => {
										handlePicture(e.target.files[0]);
									},
								})}
								id={'file-upload'}
								type="file"
							></input>
						</div>
						<div className="absolute-for-deadpool">
							<div className="deadpool-wrapper-signup">
								<img
									src={deadPool}
									alt=""
								/>
							</div>
							<div>Username</div>

							<input
								{...register('username', { required: true })}
								type="text"
								placeholder="Ex: Hulk"
							></input>
						</div>
						<div>
							<div>Email</div>

							<input
								{...register('email', { required: true })}
								type="email"
								placeholder="Ex: hulk@gmail.com"
							></input>
						</div>
						<div>
							<div>Password</div>
							<input
								{...register('password', { required: true })}
								type="password"
								placeholder="**************"
							></input>
						</div>
						<div>
							<div>Check Password</div>
							<input
								{...register('confirmPassword', { required: true })}
								type="password"
								placeholder="Ex: hulk's pet name"
							></input>
						</div>
						<input
							className="submit-login-signup"
							type="submit"
							value="Go!!"
						/>
					</form>
				</div>
			</section>
		</>
	);
};

export default SignUp;
