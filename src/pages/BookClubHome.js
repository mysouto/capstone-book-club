import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc, deleteDoc, onSnapshot } from "firebase/firestore";

// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import SearchForm from "../components/SearchForm";
import NewPostForm from "../components/NewPostForm";

// use bookclubid to make request to db
// request info
function BookClubHome() {
	let { bookclubid } = useParams();
	let navigate = useNavigate();

	// GET book club doc data
	const bookclubRef = doc(db, "bookclubs", bookclubid);

	// book club data state
	const [currentBookClub, setBookClub] = useState([]);
	const [currentBook, setBook] = useState([]);

	// state for what type of page: Home or Search Page
	const [searchState, setSearchState] = useState(false);

	// 1. using getDoc
	// useEffect(() => {
	// 	const getBookclubData = async () => {
	// 		const response = await getDoc(bookclubRef);
	// 		const data = response.data();
	// 		setBookClub(data);

	// 		// console.log(typeof data);
	// 		// console.log(data.hasOwnProperty("currentbook"));
	// 		if (data.hasOwnProperty("currentbook")) {
	// 			const bookData = data.currentbook;
	// 			setBook(bookData);
	// 		}
	// 	};
	// 	getBookclubData();
	// }, []);

	// 2. onSnapshot
	useEffect(() => {
		const unsubscribe = onSnapshot(bookclubRef, (response) => {
			const data = response.data();
			setBookClub(data);
			// if (data.hasOwnProperty("currentbook")) {
			if (data.currentbook) {
				const bookData = data.currentbook;
				setBook(bookData);
			}
		});

		return unsubscribe;
	}, [setBookClub, bookclubRef]);

	// DELETE
	const deleteBookClub = async (id) => {
		console.log("calling deleteBookClub");
		const bookClubDoc = doc(db, "bookclubs", id);
		await deleteDoc(bookClubDoc);
		navigate("/");
	};

	// FEATURE: ADD POST TO DB
	const addPost = async (postText) => {
		console.log("calling addPost");
		console.log(postText);
	};

	// TODO - conditionals: Home vs <SearchPage/>
	// CALLBACK FOR FIND BOOK BUTTON
	const findBook = () => {
		console.log("caklling findBook");
		setSearchState(!searchState);
	};

	if (searchState) {
		return (
			<SearchForm
				bookclubid={bookclubid}
				bookclubName={currentBookClub.name}
				findBook={findBook}
			/>
		);
	} else {
		// if (currentBook === []) {
		if (currentBookClub.hasOwnProperty("currentbook")) {
			return (
				<div>
					<h1>{currentBookClub.name} BOOK CLUB HOME PAGE</h1>
					<h2>Welcome to your {currentBookClub.name} Book Club!</h2>
					<p>Book Club Name: {currentBookClub.name}</p>
					<p>Book Club ID: {bookclubid}</p>

					<h3>Current Book</h3>
					<Card style={{ width: "16rem" }}>
						<Card.Img
							src={currentBook.cover}
							alt={currentBook.title}
						/>
						<Card.Body>
							<Card.Title>{currentBook.title}</Card.Title>
							<Card.Text>Author: {currentBook.authors}</Card.Text>
							<Card.Text>Description</Card.Text>
						</Card.Body>
					</Card>

					<Button
						onClick={() => {
							deleteBookClub(bookclubid);
						}}
					>
						Delete book club
					</Button>

					<h2>Comments</h2>
					<NewPostForm addPost={addPost} />
				</div>
			);
		} else {
			return (
				<div>
					<h1>{currentBookClub.name} NEW BOOK CLUB HOME PAGE</h1>
					<div>
						<p>No books yet :(</p>
						<p>Get started here!</p>
						{/* <button
							onClick={() => {
								navigate("/searchbook");
							}}
						>
							Add Book
						</button> */}
						<Button onClick={findBook}>Find Book</Button>
					</div>

					<Button
						onClick={() => {
							deleteBookClub(bookclubid);
						}}
					>
						Delete book club
					</Button>
				</div>
			);
		}
	}
}

export default BookClubHome;
