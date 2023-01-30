import React from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";

// use bookclubid to make request to db
//  request info
function BookClubHome() {
	let { bookclubid } = useParams();
	// console.log({ bookclubid });
	let navigate = useNavigate();

	return (
		<div>
			<h1>BOOK CLUB HOME PAGE</h1>
			<h2>Welcome to your Book Club!</h2>
			<p>Book Club ID: {bookclubid}</p>

			<div>
				<p>No books yet :(</p>
				<p>Get started here!</p>
				<button
					onClick={() => {
						navigate("/searchbook");
					}}
				>
					Search Book
				</button>
			</div>
		</div>
	);
}

export default BookClubHome;
