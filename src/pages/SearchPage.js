import React from "react";
import "../App.css";

// Components
import SearchForm from "../components/SearchForm";

function SearchPage() {
	return (
		<div className="App">
			<h1>Search Book</h1>
			<SearchForm />
		</div>
	);
}

export default SearchPage;
