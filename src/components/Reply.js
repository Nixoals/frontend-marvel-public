const Reply = ({ reply, replyRequest }) => {
	const { author, comment } = reply;

	const { username, avatar } = author.account;
	return (
		<>
			<div>
				<div className="reply-user-info">
					<div className="post-avatar-user">
						<img src={avatar} alt="" />
					</div>
					<div>{username}</div>
				</div>
				<div className="reply-comment">{comment}</div>
			</div>
		</>
	);
};

export default Reply;
