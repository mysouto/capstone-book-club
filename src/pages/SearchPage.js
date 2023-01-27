import React from "react";
import "../App.css";
// import { useState, useEffect } from "react";
// import { app, db } from "../firebase-config";
// import {
// 	addDoc,
// 	collection,
// 	doc,
// 	deleteDoc,
// 	getDocs,
// } from "firebase/firestore";

// Components
import SearchForm from "../components/SearchForm";

function SearchPage() {
	// create reference to bookclubs collections
	// const bookclubsCollectionRef = collection(db, "bookclubs");

	return (
		<div className="App">
			<h1>Search Book</h1>
			<SearchForm />
		</div>
	);
}

export default SearchPage;
