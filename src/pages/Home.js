import React from "react";

import { useState, useEffect } from "react";
import { app, db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import BookClubList from "../components/BookClubList";
import { Footer } from "./css-components/Footer";

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
		<div
			className="container min-vw-100"
			// style={{
			// margin: "0 auto",
			// padding: "0 40px",
			// }}
		>
			<header
				style={{
					// backgroundColor: "#e9f4f4",
					width: "100%",
					minHeight: "300px",
					textAlign: "center",
				}}
			>
				<h1
					className="display-3"
					style={{
						color: "#17615c",
						fontFamily: "Abril Fatface, Cursive",
					}}
				>
					Book Clubs
				</h1>
				<div
					style={{
						fontFamily: "Poppins, Sans-Serif",
						// width: "500px"
						marginRight: "20vw",
						marginLeft: "20vw",
					}}
				>
					<h3>Welcome to readdit! </h3>
					<p>
						{/* With our user-friendly interface, you can join or create
						a book club, share your thoughts and opinions on your
						latest reads, and discover new books based on your
						preferences. You can also keep track of your reading
						progress, participate in exciting discussions, and
						attend virtual book events hosted by your club. Whether
						you're a passionate reader, a book club organizer, or a
						literature lover, our web app offers something for
						everyone. So come join the Book Club Hero community,
						where the joy of reading never ends! */}
						Join and create book clubs, share your thoughts,
						discover new books, and participate in discussions. Come
						build your reading communities!
					</p>
				</div>
			</header>

			<div
				style={{
					backgroundColor: "#e9f4f4",
					textAlign: "center",
					width: "100%",
				}}
			>
				<BookClubList bookClubsData={bookClubs} />
			</div>
			<Footer></Footer>
		</div>
	);
}

export default Home;
