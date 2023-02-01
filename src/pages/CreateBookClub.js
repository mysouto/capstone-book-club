import "../App.css";
import React from "react";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { app, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

// Components
import NewBookClubForm from "../components/NewBookClubForm";

function CreateBookClub() {
	// create reference to bookclubs collections
	const bookclubsCollectionRef = collection(db, "bookclubs");

	// let newBookClubID = "";
	// const [newBookClubID, setID] = useState("");

	let navigate = useNavigate();

	// CREATE
	// add book club to "bookclubs" collection
	const createBookClub = async (bookClubName) => {
		// addDoc function, API call
		const docRef = await addDoc(
			bookclubsCollectionRef,
			// obj to add
			{ name: bookClubName }
		);
		// TODO - get book club id from firebase db response
		// setID(docRef.id);
		// newBookClubID = docRef.id;
		// console.log(newBookClubID);

		// Open Book Club home page
		navigate(`/bookclubhome/${docRef.id}`);
	};

	// console.log("newBookClubID", newBookClubID);

	// navigate(`/bookclubhome/${bookClubID}/searchbook`);
	// OR
	// navigate(`/bookclubhome/${bookClubID}`);

	return (
		<div className="App">
			<h1>Create a Book Club</h1>
			<NewBookClubForm createBookClub={createBookClub} />
		</div>
	);
}

export default CreateBookClub;
