import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

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

	// 1. using getDoc
	useEffect(() => {
		const getBookclubData = async () => {
			const response = await getDoc(bookclubRef);
			const data = response.data();
			setBookClub(data);

			console.log(typeof data);

			console.log(data.hasOwnProperty("currentbook"));
			if (data.hasOwnProperty("currentbook")) {
				const bookData = data.currentbook;
				setBook(bookData);
			}
		};
		getBookclubData();
	}, []);

	// 2. onSnapshot
	// 	const getData = async () => {
	// onSnapshot(bookclubRef, (doc) => {
	// 	console.log(doc.data(), doc.id);
	// 	// setBookClub(doc.data());
	// });
	// };

	// if (currentBook === []) {
	if (currentBookClub.hasOwnProperty("currentbook")) {
		return (
			<div>
				<h1>BOOK CLUB HOME PAGE</h1>
				<h2>Welcome to your {currentBookClub.name} Book Club!</h2>
				<p>Book Club Name: {currentBookClub.name}</p>
				<p>Book Club ID: {bookclubid}</p>

				<h3>Current Book</h3>
				<Card style={{ width: "16rem" }}>
					<Card.Img src={currentBook.cover} alt={currentBook.title} />
					<Card.Body>
						<Card.Title>{currentBook.title}</Card.Title>
						<Card.Text>Author: {currentBook.author}</Card.Text>
						<Card.Text>Description</Card.Text>
					</Card.Body>
				</Card>
			</div>
		);
	} else {
		return (
			<div>
				<h1>NEW BOOK CLUB</h1>
				<div>
					<p>No books yet :(</p>
					<p>Get started here!</p>
					<button
						onClick={() => {
							navigate("/searchbook");
						}}
					>
						Add Book
					</button>
				</div>
			</div>
		);
	}
}

export default BookClubHome;
