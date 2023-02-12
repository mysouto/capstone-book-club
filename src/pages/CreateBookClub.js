import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { app, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

// Components
import NewBookClubForm from "../components/NewBookClubForm";
import { UserContext } from "../UserContext";

function CreateBookClub() {
	const { user } = useContext(UserContext);

	const bookclubsCollectionRef = collection(db, "bookclubs");

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
		// Open Book Club home page
		navigate(`/bookclubhome/${docRef.id}`);
	};

	return (
		<div
			style={{
				margin: "0 auto",
				padding: "0 10vw",
				display: "flex",
				flexWrap: "wrap",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<h1>Create a Book Club</h1>
			{/* <h2>{val}</h2> */}
			<h3>User logged in: {JSON.stringify(user, null, 2)}</h3>
			{/* <button onClick={() => setValue("hey")}>change value</button> */}
			<div>
				<NewBookClubForm createBookClub={createBookClub} />
			</div>
		</div>
	);
}

export default CreateBookClub;
