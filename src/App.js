import "./App.css";
import { useState, useEffect } from "react";
import { app, db } from "./firebase-config";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import axios from "axios";

// Components
import SearchForm from "./components/SearchForm";
import NewBookClubForm from "./components/NewBookClubForm";

function App() {
	// BOOK CLUB COMPONENT
	// create reference to bookclubs collections
	const bookclubsCollectionRef = collection(db, "bookclubs");

	// state for bookclubs collection
	const [bookClubs, setBookClubs] = useState([]);

	// READ
	// query when rendering page with useEffect
	useEffect(() => {
		const getBookClubs = async () => {
			// API call to firestore db
			const bookClubsData = await getDocs(bookclubsCollectionRef);
			// console.log(bookClubsData.docs);

			setBookClubs(
				bookClubsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		};
		getBookClubs();
	}, []);

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
			{/* CREATE book club */}
			<h1>Create a Book Club</h1>
			<NewBookClubForm
				createBookClub={createBookClub}
				bookClubsData={bookClubs}
			/>

			<h2>Book Clubs List</h2>
			{/* READ book club collections */}
			{/* creating book club list components */}
			{bookClubs.map((bookclub) => {
				return <p>Book Club: {bookclub.name} </p>;
			})}

			{/* SEARCH book */}
			<h1>Search Book</h1>
			{/* search book form */}
			<SearchForm />
		</div>
	);
}

export default App;
