import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import { app, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

import NewBookClubForm from "../components/NewBookClubForm";
import { Footer } from "./css-components/Footer";

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
			{
				name: bookClubName,
				uid: user.uid,
				bookClubAuthor: user.displayName,
			}
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
				className="container min-vw-100"
			>
				<h1>Create a Book Club</h1>
				<div>
					<NewBookClubForm createBookClub={createBookClub} />
				</div>
				<Footer />
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
				className="container min-vw-100"
			>
				<h1>Create a Book Club</h1>

				<h4>Login to create a book club</h4>
				<Button
					onClick={() => {
						navigate("/login");
					}}
				>
					Login
				</Button>

				<h2> Register </h2>
				<h4>Not registered yet?</h4>
				<Button onClick={() => navigate("/signup")}>Sign Up</Button>
				
				<Footer />
			</div>
		);
	}
}

export default CreateBookClub;
