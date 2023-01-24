import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

function App() {
	// create reference to bookclubs collections
	const bookclubsCollectionRef = collection(db, "bookclubs");

	// state for bookclubs collection
	const [bookClubs, setBookClubs] = useState([]);
	// state to track add bookclub input
	const [newBookClubName, setNewBookClub] = useState("");

	// READ
	// query when rendering page with useEffect
	useEffect(() => {
		const getBookClubs = async () => {
			// API call to firestore db
			const bookClubsData = await getDocs(bookclubsCollectionRef);
			console.log(bookClubsData.docs);

			setBookClubs(
				bookClubsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		};
		getBookClubs();
	}, []);

	// CREATE
	// add book club to "bookclubs" collection
	const createBookClub = async () => {
		// addDoc function, API call
		await addDoc(
			bookclubsCollectionRef,
			// obj to add
			{ name: newBookClubName }
		);
	};

	return (
		<div className="App">
			{/* CREATE book club */}
			<input
				placeholder="Book Club Name..."
				onChange={(event) => {
					setNewBookClub(event.target.value);
				}}
			/>
			<button onClick={createBookClub}>Create Book Club</button>

			{/* READ book club collections */}
			{/* creating book club list components */}
			{bookClubs.map((bookclub) => {
				return (
					<div>
						<h2>Book Club: {bookclub.name} </h2>
					</div>
				);
			})}
		</div>
	);
}

export default App;
