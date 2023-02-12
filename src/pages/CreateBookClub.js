import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { app, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

import NewBookClubForm from "../components/NewBookClubForm";
import { UserContext } from "../UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function CreateBookClub() {
	const { user } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);

	// change loading state once rendered
	// setIsLoading(false);

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

	// console.log(user.displayName);
	// console.log(user.email);

	// if (isLoading) {
	// 	return (
	// 		<div
	// 			style={{
	// 				margin: "0 auto",
	// 				padding: "0 10vw",
	// 				display: "flex",
	// 				flexWrap: "wrap",
	// 				flexDirection: "column",
	// 				justifyContent: "center",
	// 				alignItems: "center",
	// 			}}
	// 		>
	// 			<Spinner animation="border" />
	// 		</div>
	// 	);
	// }

	if (user) {
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
				<div>
					<NewBookClubForm createBookClub={createBookClub} />
				</div>
				{/* <p>User logged in: {JSON.stringify(user, null, 2)}</p> */}
			</div>
		);
	} else {
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
				<h3>Login to create a book club</h3>
				<Button
					onClick={() => {
						navigate("/login");
					}}
				>
					Login
				</Button>
			</div>
		);
	}
}

export default CreateBookClub;
