import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

function BookClubHome() {
	let { bookclubid } = useParams();
	// use bookclubid to make request to db
	//  request info
	return (
		<div>
			<h1>THIS IS A BOOK CLUB HOME PAGE</h1>
			<h2>Book Club ID: {bookclubid}</h2>
		</div>
	);
}

export default BookClubHome;
