import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import { app, db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";

// Components
import BookList from "./BookList";

// SEARCH BOOK feature
function SearchForm({ bookclubid, bookclubName, findBook }) {
	let navigate = useNavigate();

	const [book, setBook] = useState("");
	const [searchResults, setResults] = useState([]);

	const URL =
		"https://www.googleapis.com/books/v1/volumes?q=" +
		book +
		"&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/imageLinks/thumbnail)&maxResults=5";

	const handleChange = (event) => {
		const bookQuery = event.target.value;
		setBook(bookQuery);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// console.log(book);
		axios
			.get(URL)
			.then((response) => {
				setResults(response.data.items);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getBook = (bookApiID) => {
		let book = {};
		for (let result of searchResults) {
			if (result.id === bookApiID) {
				book = {
					bookApiID: result.id,
					cover: result.volumeInfo.imageLinks.thumbnail,
					title: result.volumeInfo.title,
					authors: result.volumeInfo.authors.join(", "),
					description: result.volumeInfo.description,
				};
				// if (result.id === undefined) {
				// 	book.bookApiID = "Undefined data from books API";
				// 	console.log(book.bookApiID);
				// } else {
				// 	book.bookApiID = result.id;
				// }
				// if (result.volumeInfo.imageLinks.thumbnail === undefined) {
				// 	book.cover = "Undefined image from books API";
				// 	console.log(book.cover);
				// } else {
				// 	book.cover = result.volumeInfo.imageLinks.thumbnail;
				// }
				// book.title = result.volumeInfo.title;
				// book.authors = result.volumeInfo.authors.join(", ");
				// if (result.id === undefined) {
				// 	book.title = "Undefined title from books API";
				// 	console.log(book.title);
				// } else {
				// 	book.title = result.volumeInfo.title;
				// }
				// if (result.authors === undefined) {
				// 	book.authors = "Undefined authors from books API";
				// 	console.log(book.authors);
				// } else {
				// 	book.authors = result.volumeInfo.authors.join(", ");
				// }
			}
		}

		// console.log(typeof book);
		// for (let bookField in book) {
		// 	if (bookField === undefined) {
		// 		book.bookField = "Undefined data from books API";
		// 		console.log(book.bookField);
		// 	}
		// }

		return book;
	};

	const bookclubRef = doc(db, "bookclubs", bookclubid);

	const addBook = async (bookApiID) => {
		const bookToAdd = getBook(bookApiID);
		await setDoc(bookclubRef, {
			name: bookclubName,
			currentbook: bookToAdd,
		});
		// navigate back to book club home page
		findBook();
		navigate(`/bookclubhome/${bookclubid}`);
	};

	return (
		<div className="App">
			<h1>Search Book</h1>
			<form onSubmit={handleSubmit}>
				<input
					onChange={handleChange}
					type="text"
					placeholder="Find Book..."
				/>
				<Button type="submit">Search</Button>
			</form>

			<h3>Results</h3>
			<BookList
				searchResults={searchResults}
				addBook={addBook}
			></BookList>
		</div>
	);
}

// Search.propTypes = {
// }

export default SearchForm;
