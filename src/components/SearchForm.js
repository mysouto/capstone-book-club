import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import "../App.css";
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
		"&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/imageLinks/thumbnail)&maxResults=5";

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
				};
			}
		}
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
