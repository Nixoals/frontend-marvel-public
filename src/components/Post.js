import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// components
import Reply from './Reply';

const Post = ({ post, setUpdateComment }) => {
	const [replyRequest, setReplyRequest] = useState(false);
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	const { username, avatar } = post.author.account;
	const { title, description, createdAt } = post;
	const replies = post.replies;

	const handleSubmitComment = async (data) => {
		const token = Cookies.get('token');

		if (token) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			};
			const body = {
				post: post._id,
				comment: data.comment,
			};
			// const url = 'http://localhost:4000/user/comment';
			const url = 'https://site--marvel--gsmxcbzt8tzm.code.run/user/comment';
			await axios.post(url, body, config);
			setUpdateComment(true);
			setReplyRequest(false);
		} else {
			navigate('/login');
		}
	};

	return (
		<>
			<section>
				<div className="post-wrapper">
					<div className="post-title-header">
						<div className="post-title">{title}</div>
						<div className="post-ref-author">
							<div className="post-avatar-user">
								<img
									src={avatar}
									alt=""
								/>
							</div>
							<div>{username}</div>
							<p>{createdAt.split('GMT')[0]}</p>
						</div>
					</div>

					<div className="post-description">
						<div>{description} </div>

						<div className="comments-reply">
							<div>
								{replies.map((reply) => {
									return (
										<Reply
											key={reply._id}
											reply={reply}
											replyRequest={replyRequest}
										></Reply>
									);
								})}
							</div>
							{replyRequest && (
								<div>
									<form
										className="reply-form"
										onSubmit={handleSubmit(handleSubmitComment)}
									>
										<textarea
											{...register('comment', { required: true })}
											id=""
											cols="30"
											rows="5"
										></textarea>
										<div>
											<input type="submit" />
											<button
												onClick={() => {
													setReplyRequest(false);
												}}
											>
												Cancel
											</button>
										</div>
									</form>
								</div>
							)}
						</div>
					</div>
					<div className="comment-reply-button">
						<button
							onClick={() => {
								setReplyRequest(true);
							}}
						>
							Reply
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default Post;
