import React from "react";

import "../App.css";
import { useState, useEffect } from "react";
import { app, db } from "../firebase-config";
import {
	addDoc,
	collection,
	doc,
	deleteDoc,
	getDocs,
	getDoc,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";

// Components
import NewBookClubForm from "../components/NewBookClubForm";
import BookClubList from "../components/BookClubList";

function BookClubsPage() {
	// BOOK CLUB COMPONENT
	// create reference to bookclubs collections
	const bookclubsCollectionRef = collection(db, "bookclubs");

	// state for bookclubs collection
	const [bookClubs, setBookClubs] = useState([]);

	// READ
	// query when rendering page with useEffect
	useEffect(() => {
		const getBookClubs = async () => {
			// API call to firestore db
			const bookClubsRes = await getDocs(bookclubsCollectionRef);
			// console.log(bookClubsRes.docs);
			// console.log(bookClubsRes.docs.currentbook);

			setBookClubs(
				bookClubsRes.docs.map((doc) => ({
					...doc.data(),
					bookClubID: doc.id,
				}))
			);
		};
		getBookClubs();
	}, []);

	// how to get id from bookClub document in bookClubs collection -> doc.id
	// for (const bookclub of bookClubs) {
	// 	console.log(bookclub.id);
	// }

	// CREATE
	// add book club to "bookclubs" collection
	const createBookClub = async (bookClubName) => {
		// addDoc function, API call
		await addDoc(
			bookclubsCollectionRef,
			// obj to add
			{ name: bookClubName }
		);
	};

	// DELETE
	const deleteBookClub = async (id) => {
		console.log("calling deleteBookClub");
		const bookClubDoc = doc(db, "bookclubs", id);
		await deleteDoc(bookClubDoc);
	};

	// BOOKS COLLECTION
	// create reference to bookclubs collections
	const booksCollectionRef = collection(db, "books");
	const [booksCollection, setBooks] = useState([]);

	// READ books collection
	useEffect(() => {
		const getCurrentBook = async () => {
			// API call to firestore db
			const booksRes = await getDocs(booksCollectionRef);
			// console.log(booksRes.docs);

			setBooks(
				booksRes.docs.map((doc) => ({
					...doc.data(),
					currentBookID: doc.id,
				}))
			);
			// console.log(books);
		};
		getCurrentBook();
	}, []);

	// USE "ID" in BOOK CLUB OBJ TO QUERY FIREBASE BOOKS COLLECTIONS AND PULL BOOK INFO
	// -- Filter books collection data with query
	// const bookQuery = query(
	// 	booksCollectionRef,
	// 	where("id", "==", "qN9KG7gOeZq1xbfOARu1")
	// );

	// -- GET 1 doc
	const docRef = doc(db, "books", "qjWWWBaoFAapAZP9IfrP");

	const getBookData = () => {
		console.log("calling getBookData");
		// method 1 - getDoc
		// getDoc(docRef).then((doc) => {
		// 	// console.log(data.docs);
		// 	console.log(doc.data(), doc.id);
		// });

		// another method - get realtime updated data, changes in doc
		onSnapshot(docRef, (doc) => {
			console.log(doc.data(), doc.id);
		});
	};

	return (
		<div className="App">
			<h1>Create a Book Club</h1>
			<NewBookClubForm
				createBookClub={createBookClub}
				bookClubsData={bookClubs}
			/>

			<h2>Book Clubs List</h2>
			{/* READ book club collections */}
			<BookClubList
				bookClubsData={bookClubs}
				deleteBookClub={deleteBookClub}
			/>

			{/* Books Collections */}
			<h3>Books Collection</h3>
			<div>
				{booksCollection.map((book) => {
					return (
						<div>
							<p>Title: {book.title}</p>
						</div>
					);
				})}
			</div>
			<h3>Book Query</h3>
			<button onClick={getBookData}>Get 1 Book by ID</button>
		</div>
	);
}

export default BookClubsPage;
