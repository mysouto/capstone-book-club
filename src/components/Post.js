import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import Placeholder from "react-bootstrap/Placeholder";

function Post({ id, text, bookclubID, bookID }) {
	return (
		// <div>
		// 	<p>Post content: {text}</p>
		// 	<p>Book Club ID: {bookclubID}</p>
		// 	<p>Book ID: {bookID}</p>
		// </div>

		<div className="media">
			{/* <Image src="..." class="mr-3" alt="..." /> */}
			<div className="media-body">
				<h5 class="mt-0">Post Title</h5>
				<p> Comment Content: {text}</p>
				<p>Book Club ID: {bookclubID}</p>
				<p>Book ID: {bookID}</p>
			</div>
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
