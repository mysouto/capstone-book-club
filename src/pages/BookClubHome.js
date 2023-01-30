import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";

// use bookclubid to make request to db
// request info
function BookClubHome() {
	// book club data state
	const [currentBookClub, setBookClub] = useState([]);

	// current book state
	const [currentBook, setBook] = useState([]);

	let { bookclubid } = useParams();
	// console.log({ bookclubid });
	let navigate = useNavigate();

	// GET book club doc data
	const bookclubRef = doc(db, "bookclubs", bookclubid);

	// remove console.log => return/display book data
	// useEffect(() => {
	// const getBookclubData = async () => {
	// 	console.log("calling getBookclubData");
	// 	// 1. using getDoc
	// 	const response = await getDoc(bookclubRef);
	// 	console.log("Document data:", response.data());
	// 	// setBookClub(response.data());
	// };
	// 	getBookclubData();
	// }, []);

	// 2. onSnapshot
	useEffect(() => {
		const getData = async () => {
			onSnapshot(bookclubRef, (doc) => {
				setBookClub(doc.data());
			});
			console.log("current bookClub", currentBookClub);
		};
		getData();
	}, []);

	return (
		<div>
			<h1>BOOK CLUB HOME PAGE</h1>
			<h2>Welcome to your {currentBookClub.name} Book Club!</h2>
			<p>Book Club Name: {currentBookClub.name}</p>
			<p>Book Club ID: {bookclubid}</p>

			<h3>Current Book</h3>
			<p>Book ID: {currentBookClub.currentbook}</p>

			<h1>NEW BOOK CLUB</h1>
			<div>
				{/* <p>No books yet :(</p> */}
				{/* <p>Get started here!</p> */}
				<button
					onClick={() => {
						navigate("/searchbook");
					}}
				>
					Search Book
				</button>
			</div>
		</div>
	);
}

export default BookClubHome;
