import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import hulkLogin from '../assets/images/hulkLogin.png';

const Login = ({ handleToken }) => {
	const navigate = useNavigate();
	const [alert, setAlert] = useState('');

	const { register, handleSubmit } = useForm();

	const handleSubmitForm = async (data) => {
		try {
			// const url = 'http://localhost:4000/user/login';
			const url = 'https://site--marvel--gsmxcbzt8tzm.code.run/user/login';
			const body = { email: data.email, password: data.password };
			const response = await axios.post(url, body);

			const { token, id, favorites, account } = response.data;
			const avatar = JSON.stringify(account);
			if (response.data.token) {
				handleToken(token, id, favorites, avatar);
				return navigate('/');
			}
		} catch (error) {
			if (error.response.status === 401) {
				setAlert('Login or password incorrect!! Try again');
			}
		}
	};
	return (
		<>
			<section className="form-container">
				<div className="form-wrapper">
					<h1>Login</h1>
					<form onSubmit={handleSubmit(handleSubmitForm)}>
						<div>
							<div className="title-login-for-hulk">Email</div>

							<input
								{...register('email', { required: true })}
								type="email"
							></input>
							<div className="image-login-container">
								<img
									src={hulkLogin}
									alt="hulk-login"
								></img>
							</div>
						</div>
						<div>
							<div>Password</div>
							<input
								{...register('password', { required: true })}
								type="password"
							></input>
						</div>
						<input
							className="submit-login-signup"
							type="submit"
							value="Go!!"
						/>
					</form>
					<div>
						Don't have an account?
						<span
							className="span-login-to-signup"
							onClick={() => {
								navigate('/signup');
							}}
						>
							Sign up
						</span>
					</div>
					{alert && <p>{alert}</p>}
				</div>
			</section>
		</>
	);
};

export default Login;
