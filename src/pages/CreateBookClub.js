import React from "react";

import "../App.css";
import { useState } from "react";
import { app, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

// Components
import NewBookClubForm from "../components/NewBookClubForm";

function CreateBookClub() {
	// create reference to bookclubs collections
	const bookclubsCollectionRef = collection(db, "bookclubs");

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

	return (
		<div className="App">
			<h1>Create a Book Club</h1>
			<NewBookClubForm createBookClub={createBookClub} />
		</div>
	);
}

export default CreateBookClub;
