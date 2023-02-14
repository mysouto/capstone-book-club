import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function Post({
	id,
	text,
	bookclubID,
	bookID,
	timestamp,
	authorUid,
	authorName,
	currentBook,
	deletePost,
	// currentBookClubUid,
}) {
	const { user } = useContext(UserContext);
	const [timeAgoValue, setTimeAgoValue] = useState("");
	const [postTime, setTimestamp] = useState(timestamp);

	function timeAgo(postTimestamp) {
		let now = Date.now();
		const elapsedTime = now - timestamp;

		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;

		// if (elapsedTime < minute) {
		// 	return Math.round(elapsedTime / second) + " seconds ago";
		// } else if (elapsedTime < hour) {
		if (elapsedTime < hour) {
			return Math.round(elapsedTime / minute) + " minutes ago";
		} else if (elapsedTime < day) {
			return Math.round(elapsedTime / hour) + " hours ago";
		} else {
			return Math.round(elapsedTime / day) + " days ago";
		}
	}

	useEffect(() => {
		setInterval(() => {
			setTimeAgoValue(timeAgo(postTime));
		}, 1000);
	}, [postTime]);

	return (
		<div className="list-group-item py-3">
			<h5 className="mb-1">{authorName || "User name unavailable"}</h5>
			<p className="mb-1">{text}</p>
			<small className="mb-1">
				{" "}
				{timeAgoValue} &middot; {currentBook.title}{" "}
			</small>

			<div className="m-1">
				{user && authorUid === user.uid && (
					<Button onClick={() => deletePost(id)}>Delete</Button>
				)}
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
