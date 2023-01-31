import React from "react";

import "../App.css";
import { useState, useEffect } from "react";
import { app, db } from "../firebase-config";
import {
	collection,
	doc,
	deleteDoc,
	getDocs,
} from "firebase/firestore";

// Components
import BookClubList from "../components/BookClubList";

function Home() {
	// create reference to bookclubs collections
	const bookclubsCollectionRef = collection(db, "bookclubs");

	// state for bookclubs db collection
	const [bookClubs, setBookClubs] = useState([]);

	// READ
	// query when rendering page with useEffect
	useEffect(() => {
		const getBookClubs = async () => {
			// API call to firestore db
			const bookClubsRes = await getDocs(bookclubsCollectionRef);

			setBookClubs(
				bookClubsRes.docs.map((doc) => ({
					...doc.data(),
					bookClubID: doc.id,
				}))
			);
		};
		getBookClubs();
	}, []);

	// DELETE
	const deleteBookClub = async (id) => {
		console.log("calling deleteBookClub");
		const bookClubDoc = doc(db, "bookclubs", id);
		await deleteDoc(bookClubDoc);
	};

	return (
		<div className="App">
			<h1>HOME PAGE</h1>

			<h2>Book Clubs List</h2>
			{/* READ book club collections */}
			<BookClubList
				bookClubsData={bookClubs}
				deleteBookClub={deleteBookClub}
			/>
		</div>
	);
}

export default Home;
