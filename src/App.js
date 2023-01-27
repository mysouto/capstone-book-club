import "./App.css";
import { useState, useEffect } from "react";
import { app, db } from "./firebase-config";
import {
	addDoc,
	collection,
	doc,
	deleteDoc,
	getDocs,
} from "firebase/firestore";

// Components
import SearchForm from "./components/SearchForm";
import NewBookClubForm from "./components/NewBookClubForm";
import BookClubList from "./components/BookClubList";

// React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Router encompasses all other  components
import Home from "./pages/Home";
import BookClubsPage from "./pages/BookClubsPage";
import SearchPage from "./pages/SearchPage";

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
			const bookClubsRes = await getDocs(bookclubsCollectionRef);
			// console.log(bookClubsRes.docs.id);

			setBookClubs(
				bookClubsRes.docs.map((doc) => ({
					...doc.data(),
					bookClubID: doc.id,
				}))
			);
		};
		getBookClubs();
	}, []);

	// how to get id from bookClub document in bookClubs collection -> doc.id
	// for (const bookclub of bookClubs) {
	// 	console.log(bookclub.id);
	// }

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

	// DELETE
	const deleteBookClub = async (id) => {
		console.log("calling deleteBookClub");
		const bookClubDoc = doc(db, "bookclubs", id);
		await deleteDoc(bookClubDoc);
	};

	// return (
	// 	<div className="App">
	// 		{/* CREATE book club */}
	// 		<h1>Create a Book Club</h1>
	// 		<NewBookClubForm
	// 			createBookClub={createBookClub}
	// 			bookClubsData={bookClubs}
	// 		/>

	// 		<h2>Book Clubs List</h2>
	// 		{/* READ book club collections */}
	// 		<BookClubList
	// 			bookClubsData={bookClubs}
	// 			deleteBookClub={deleteBookClub}
	// 		/>

	// 		{/* SEARCH book */}
	// 		<h1>Search Book</h1>
	// 		{/* search book form */}
	// 		<SearchForm />
	// 	</div>
	// );

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/bookclubs" element={<BookClubsPage />}></Route>
				<Route path="/searchbook" element={<SearchPage />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
