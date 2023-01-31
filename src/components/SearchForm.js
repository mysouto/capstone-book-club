import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

// Components
import BookList from "./BookList";

// SEARCH BOOK feature
function SearchForm() {
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
				// console.log(response);
				// console.log(response.data.items);
				setResults(response.data.items);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// TO DO
	// grab id of selected book, similar to book club list/id param
	// create book + book results list component
	// book li item selected => grab item id
	// => use id to get book info
	const addBook = (bookId) => {
		console.log("calling add Book");
	};

	// console.log("searchResults", searchResults);

	return (
		<div className="search-area">
			<form onSubmit={handleSubmit}>
				<input
					onChange={handleChange}
					type="text"
					placeholder="Find Book..."
				/>
				<Button type="submit">Search</Button>
			</form>

			{/* book search results */}
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
