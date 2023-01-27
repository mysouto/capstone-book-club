import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

function NewBookClubForm({ createBookClub }) {
	// state to track add bookclub input
	const [newBookClubName, setNewBookClub] = useState("");

	const handleChange = (event) => {
		// const bookQuery = event.target.value;
		// setBook(bookQuery);

		const bookClubName = event.target.value;
		// console.log(event.target.value);
		setNewBookClub(bookClubName);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		createBookClub(newBookClubName);
	};

	return (
		<div>
			{/* CREATE book club */}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					id="name"
					name="name"
					placeholder="Book Club Name..."
					onChange={handleChange}
					// onChange={(event) => {
					// 	console.log(event.target.value);
					// 	setNewBookClub(event.target.value);
					// }}
				></input>

				<button onClick={() => createBookClub(newBookClubName)}>
					Create Book Club
				</button>
			</form>
		</div>
	);
}

NewBookClubForm.propTypes = {
	createBookClub: PropTypes.func.isRequired,
};

export default NewBookClubForm;
