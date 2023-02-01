import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import { app, db } from "../firebase-config";
import { collection, doc, setDoc } from "firebase/firestore";

// Components
import BookList from "./BookList";

// SEARCH BOOK feature
function SearchForm({ bookclubid, bookclubName }) {
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
	// firestore ref
	const getBook = (bookApiID) => {
		console.log("bookID:", bookApiID);
		// loop searchResults
		// save to bookToAdd
		let book = {};
		for (let result of searchResults) {
			// console.log(result.id);
			if (result.id === bookApiID) {
				book = {
					bookApiID: result.id,
					cover: result.volumeInfo.imageLinks.thumbnail,
					title: result.volumeInfo.title,
					// refactor, map authors lst and convert to str
					authors: result.volumeInfo.authors.join(", "),
				};
				console.log(book);
			}
		}
		console.log("book to add: ", book);
		return book;
	};

	const bookclubRef = doc(db, "bookclubs", bookclubid);

	const addBook = async (bookApiID) => {
		const bookToAdd = getBook(bookApiID);

		console.log("calling add Book");
		// console.log("bookclub ID: ", bookclubid);
		// add bookToAdd to db => update / add currentbook field?
		await setDoc(bookclubRef, {
			name: bookclubName,
			currentbook: bookToAdd,
		});
		// navigate back to book club home page
	};

	// console.log("searchResults", searchResults);

	return (
		// <div className="search-area">
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

// import React from "react";
// import "../App.css";

// // Components
// import SearchForm from "../components/SearchForm";

// function SearchPage() {
// 	return (
// 		<div className="App">
// 			<h1>Search Book</h1>
// 			<SearchForm />
// 		</div>
// 	);
// }

// export default SearchPage;
