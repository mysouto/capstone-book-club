import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { app, db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import BookClubList from "../components/BookClubList";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
// import { Footer } from "./css-components/Footer";

function Home() {
	let navigate = useNavigate();
	const { user } = useContext(UserContext);
	const bookclubsCollectionRef = collection(db, "bookclubs");

	const [bookClubs, setBookClubs] = useState([]);

	useEffect(() => {
		const getBookClubs = async () => {
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
		<div className="container min-vw-100">
			<header
				style={{
					width: "100%",
					minHeight: "300px",
					textAlign: "center",
				}}
			>
				<h3
					className="display-1"
					style={{
						color: "#17615c",
						fontFamily: "Abril Fatface, Cursive",
					}}
				>
					readdit
				</h3>
				<div
					style={{
						fontFamily: "Poppins, Sans-Serif",
						marginRight: "20vw",
						marginLeft: "20vw",
					}}
				>
					<h3>Welcome to readdit! </h3>
					<p>
						Readdit makes it easy to explore your love for books and
						share your passion with others. Join and create book
						clubs, share your thoughts, discover new books, and
						participate in discussions. Come build your reading
						communities!
					</p>
					{!user && (
						<Button
							onClick={() => navigate("/signup")}
							style={{
								backgroundColor: "#7FC6A4", // #80475E
								border: "none",
							}}
						>
							Sign Up
						</Button>
					)}
				</div>
			</header>

			<div
				style={{
					display: "flex",
					backgroundColor: "#e9f4f4",
					flexDirection: "column",
					padding: "20px",
					textAlign: "center",
				}}
			>
				<h4
					className="display-4"
					style={{
						color: "#17615c",
						fontFamily: "Abril Fatface, Cursive",
					}}
				>
					Book Clubs
				</h4>
				<BookClubList bookClubsData={bookClubs} />
			</div>
			{/* <Footer></Footer> */}
		</div>
	);
}

export default Home;
