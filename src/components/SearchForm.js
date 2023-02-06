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
import BookResList from "./BookResList";

// SEARCH BOOK feature
function SearchForm({ bookclubid, bookclubName, findBook }) {
	let navigate = useNavigate();

	const bookclubRef = doc(db, "bookclubs", bookclubid);

	const [bookQuery, setBookQuery] = useState("");
	const [searchResults, setResults] = useState([]);

	const URL =
		"https://www.googleapis.com/books/v1/volumes?q=" +
		bookQuery +
		"&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/imageLinks/thumbnail)&maxResults=5";

	const handleChange = (event) => {
		const query = event.target.value;
		setBookQuery(query);
	};

	const searchBook = (event) => {
		event.preventDefault();
		axios
			.get(URL)
			.then((response) => {
				console.log("API response:", response.data.items);

				// unpack API response and check of undefined data
				const booksAPIResCopy = response.data.items.map((book) => {
					return {
						bookApiID:
							book.id === undefined
								? "No bookApiID from response"
								: book.id,
						cover:
							book.volumeInfo.imageLinks === undefined
								? ""
								: book.volumeInfo.imageLinks.thumbnail,
						title: book.volumeInfo.title,
						authors: book.volumeInfo.authors.join(", "),
						description:
							book.volumeInfo.description === undefined
								? "No book description available."
								: book.volumeInfo.description,
					};
				});

				console.log("booksAPIResCopy", booksAPIResCopy);
				setResults(booksAPIResCopy);
				// setResults(response.data.items);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getSelectedBook = (bookApiID) => {
		let book = {};
		for (let result of searchResults) {
			if (result.bookApiID === bookApiID) {
				book = result;
			}
		}
		return book;
	};

	const addBook = async (bookApiID) => {
		const bookToAdd = getSelectedBook(bookApiID);
		console.log("bookToAdd", bookToAdd);
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
			<form onSubmit={searchBook}>
				<input
					onChange={handleChange}
					type="text"
					placeholder="Find Book..."
				/>
				<Button type="submit">Search</Button>
			</form>

			<h3>Results</h3>
			<BookResList
				searchResults={searchResults}
				addBook={addBook}
			></BookResList>
		</div>
	);
}

// Search.propTypes = {
// }

export default SearchForm;
