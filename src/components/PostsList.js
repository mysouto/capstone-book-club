import PropTypes from "prop-types";

import Post from "./Post";

function PostsList({ postsData, currentBook, deletePost, currentBookClubUid }) {
	// creating book club list components
	const postsComponents = postsData.map((post) => {
		// console.log("post", post);
		// console.log("date", Date.now());
		return (
			<Post
				key={post.id}
				id={post.id}
				text={post.text}
				bookclubID={post.bookclubID}
				bookID={post.bookID}
				timestamp={post.createdAt.toDate() || Date.now()}
				authorUid={post.authorUid || "User ID unavailable"}
				authorName={post.authorName || "User name unavailable"}
				currentBook={currentBook}
				deletePost={deletePost}
				currentBookClubUid={currentBookClubUid}
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
