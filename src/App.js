import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, doc, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

function App() {
	// state for bookclubs collection
	const [bookClubs, setBookClubs] = useState([]);
	// create reference to bookclubs collections
	const bookclubsCollectionRef = collection(db, "bookclubs");

	// READ
	// query when rendering page with useEffect
	useEffect(() => {
		const getBookClubs = async () => {
			// API call to firestore db
			const bookClubsData = await getDocs(bookclubsCollectionRef);

			setBookClubs(
				bookClubsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		};
		getBookClubs();
	}, []);

	return (
		<div className="App">
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
