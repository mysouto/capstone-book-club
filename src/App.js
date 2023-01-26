import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import axios from "axios";

function App() {
	// BOOK CLUB COMPONENT
	// create reference to bookclubs collections
	const bookclubsCollectionRef = collection(db, "bookclubs");

	// state for bookclubs collection
	const [bookClubs, setBookClubs] = useState([]);
	// state to track add bookclub input
	const [newBookClubName, setNewBookClub] = useState("");

	// READ
	// query when rendering page with useEffect
	useEffect(() => {
		const getBookClubs = async () => {
			// API call to firestore db
			const bookClubsData = await getDocs(bookclubsCollectionRef);
			// console.log(bookClubsData.docs);

			setBookClubs(
				bookClubsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		};
		getBookClubs();
	}, []);

	// CREATE
	// add book club to "bookclubs" collection
	const createBookClub = async () => {
		// addDoc function, API call
		await addDoc(
			bookclubsCollectionRef,
			// obj to add
			{ name: newBookClubName }
		);
	};

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
		<div className="App">
			{/* CREATE book club */}
			<h1>Create a Book Club</h1>
			<input
				placeholder="Book Club Name..."
				onChange={(event) => {
					setNewBookClub(event.target.value);
				}}
			/>
			<button onClick={createBookClub}>Create Book Club</button>

			{/* READ book club collections */}
			{/* creating book club list components */}
			{bookClubs.map((bookclub) => {
				return <p>Book Club: {bookclub.name} </p>;
			})}

			{/* SEARCH book */}
			<h1>Search Book</h1>
			{/* search book form */}
			<form onSubmit={handleSubmit}>
				<input
					onChange={handleChange}
					type="text"
					placeholder="Find Book..."
				/>
				<button type="submit">Search</button>
			</form>

			{/* book results */}
			<h3>Results</h3>
			{searchResults.map((book) => (
				<img
					src={book.volumeInfo.imageLinks.thumbnail}
					alt={book.title}
				/>
			))}
		</div>
	);
}

export default App;
