import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function SearchForm() {
	// SEARCH BOOK
	const [book, setBook] = useState("");
	const [searchResults, setResults] = useState([]);
	const [booksAPI, setBooksApi] = useState(process.env.REACT_APP_BOOKS_API);

	// const URL =
	// 	"https://www.googleapis.com/books/v1/volumes?q=" +
	// 	book +
	// 	"&fields=items(volumeInfo/imageLinks/thumbnail)&maxResults=2&Key=" +
	// 	booksAPI;
	const URL =
		"https://www.googleapis.com/books/v1/volumes?q=" +
		book +
		"&fields=items(volumeInfo/title, volumeInfo/authors, volumeInfo/imageLinks/thumbnail)&maxResults=2&Key=" +
		booksAPI;
	// console.log(URL);

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

			{/* book results */}
			<h3>Results</h3>
			{searchResults.map((book) => (
				<Card style={{ width: "18rem" }}>
					<Card.Img
						src={book.volumeInfo.imageLinks.thumbnail}
						alt={book.volumeInfo.title}
					/>
					<Card.Body>
						<Card.Title>{book.volumeInfo.title}</Card.Title>
						<Card.Text>
							Authors: {book.volumeInfo.authors}
						</Card.Text>
						<Card.Text>Description</Card.Text>
						<Button variant="primary">Add Book</Button>
					</Card.Body>
				</Card>
			))}
		</div>
	);
}

// Search.propTypes = {

// }

export default SearchForm;
