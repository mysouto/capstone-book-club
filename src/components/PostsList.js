import PropTypes from "prop-types";

import Post from "./Post";

function PostsList({ postsData }) {
	// creating book club list components
	const postsComponents = postsData.map((post) => {
		return (
			<Post
				key={post.id}
				id={post.id}
				text={post.text}
				bookclubID={post.bookclubID}
				bookID={post.bookID}
			/>
		);
	});
	return (
		<div
			style={{
				height: "500px",
				overflow: "hidden",
				overflowY: "visible",
				marginTop: "20px",
			}}
			className="row justify-content-center"
		>
			<div className="list-group">{postsComponents}</div>
		</div>
	);
}

PostsList.propTypes = {
	postsData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			bookclubID: PropTypes.string.isRequired,
			bookID: PropTypes.string.isRequired,
		})
	),
};

export default PostsList;
