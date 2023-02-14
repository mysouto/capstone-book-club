import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import { app, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

import NewBookClubForm from "../components/NewBookClubForm";
import { Footer } from "./css-components/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function CreateBookClub() {
	const { user } = useContext(UserContext);

	const bookclubsCollectionRef = collection(db, "bookclubs");

	let navigate = useNavigate();

	const createBookClub = async (bookClubName) => {
		const docRef = await addDoc(bookclubsCollectionRef, {
			name: bookClubName,
			uid: user.uid,
			bookClubAuthor: user.displayName,
		});

		navigate(`/bookclubhome/${docRef.id}`);
	};

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
				<h1 style={{ fontFamily: "Poppins, Sans-Serif" }}>
					Create a Book Club
				</h1>
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
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						fontFamily: "Poppins, Sans-Serif",
						margin: "50px",
					}}
				>
					<h1 style={{ fontWeight: "bolder" }}>Create a Book Club</h1>

					<h4>Login to create a book club</h4>
					<Button
						onClick={() => {
							navigate("/login");
						}}
					>
						Login
					</Button>
				</div>

				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						fontFamily: "Poppins, Sans-Serif",
					}}
				>
					<h2 style={{ fontWeight: "bolder" }}> Register </h2>
					<h4
						style={{
							fontFamily: "Poppins, Sans-Serif",
						}}
					>
						Not registered yet?
					</h4>
					<Button onClick={() => navigate("/signup")}>Sign Up</Button>
				</div>

				<Footer />
			</div>
		);
	}
}

export default CreateBookClub;
