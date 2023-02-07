import React from "react";

import { useState, useEffect } from "react";
import { app, db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

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

	return (
		// <div style={{ display: "flex", flexDirection: "column" }}>
		<div className="container">
			<h2 className="display-2 text-center" >Book Clubs</h2>
			{/* READ book club collections */}
			{/* <div style={{ display: "flex"}}> */}
			<BookClubList bookClubsData={bookClubs} /> {/* </div> */}
		</div>
	);
}

export default Home;
