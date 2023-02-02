import PropTypes from "prop-types";

function Post({ id, text, bookclubID, bookID }) {
	return (
		<div>
			<p>Post content: {text}</p>
			<p>Book Club ID: {bookclubID}</p>
			<p>Book ID: {bookID}</p>
		</div>
	);
}

Post.propTypes = {
	id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	bookclubID: PropTypes.string.isRequired,
	bookID: PropTypes.string,
};

export default Post;
