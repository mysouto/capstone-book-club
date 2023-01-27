import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

// CREATE book club
function NewBookClubForm({ createBookClub }) {
	// state to track add bookclub input
	const [newBookClubName, setNewBookClub] = useState("");

	const handleChange = (event) => {
		const bookClubName = event.target.value;
		setNewBookClub(bookClubName);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		createBookClub(newBookClubName);
	};

	return (
		<div>
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

				<button type="submit">Create Book Club</button>
			</form>
		</div>
	);
}

NewBookClubForm.propTypes = {
	createBookClub: PropTypes.func.isRequired,
};

export default NewBookClubForm;
