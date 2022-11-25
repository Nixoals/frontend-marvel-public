import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import Post from '../components/Post';

const Blog = () => {
	const [alert, setAlert] = useState('');
	const [isLoading, setIsloading] = useState(true);
	const [data, setData] = useState([]);
	const [updateComment, setUpdateComment] = useState(false);

	const navigate = useNavigate();

	const handleCreatePost = () => {
		const token = Cookies.get('token');
		if (token) {
			navigate('/post');
		} else {
			setAlert('You must be logged in to post a new comment');
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			// const url = 'http://localhost:4000/blog/posts';
			const url = 'https://site--marvel--gsmxcbzt8tzm.code.run/blog/posts';
			const response = await axios.get(url);

			setData(response.data);
			setIsloading(false);
			setUpdateComment(false);
		};
		fetchData();
	}, [updateComment]);

	return !isLoading ? (
		<>
			<section>
				<div className="blog-wrapper">
					<div className="post-header">
						<h1 className="post-title">Marvel Post</h1>
						<button
							onClick={handleCreatePost}
							className="create-new-post"
						>
							Create new Post
						</button>
						{alert && <p className="alerte-create-post">{alert}</p>}
					</div>
					<div className="disclaimer-wrapper">
						<div>Disclaimer!!</div>
						<div>There is no moderation content, feel free to write anything you want as long as you stay respectfull!</div>
					</div>
					<div className="post-container">
						{data.map((post) => {
							return (
								<Post
									key={post._id}
									post={post}
									setUpdateComment={setUpdateComment}
								></Post>
							);
						})}
					</div>
				</div>
			</section>
		</>
	) : (
		<>Loading...</>
	);
};

export default Blog;
