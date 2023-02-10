import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import Placeholder from "react-bootstrap/Placeholder";

function Post({ id, text, bookclubID, bookID }) {
	return (
		<div className="list-group-item py-3">
			<h5 className="mb-1">USER name </h5>
			<p className="mb-1">{text}</p>
			<small className="mb-1">timestamp</small>
			<button>Delete</button>
		</div>
		// <div>
		// 	<p>Post content: {text}</p>
		// 	<p>Book Club ID: {bookclubID}</p>
		// 	<p>Book ID: {bookID}</p>
		// </div>

		// <div className="media">
		// 	{/* <Image src="..." class="mr-3" alt="..." /> */}
		// 	<div className="media-body">
		// 		<h5 className="mt-0">Post Title</h5>
		// 		<p> Comment Content: {text}</p>
		// 		<p>Book Club ID: {bookclubID}</p>
		// 		<p>Book ID: {bookID}</p>
		// 	</div>
		// </div>
	);
}

Post.propTypes = {
	id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	bookclubID: PropTypes.string.isRequired,
	bookID: PropTypes.string,
};

export default Post;
