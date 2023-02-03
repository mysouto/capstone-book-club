import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

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

	let isSubmitDisabled =
		newBookClubName === "" || newBookClubName.length > 32;

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

				<Alert show={isSubmitDisabled} key="warning" variant="warning">
					Book Club name cannot be empty
				</Alert>

				<Button type="submit" disabled={isSubmitDisabled}>
					Create Book Club
				</Button>
			</form>
		</div>
	);
}

NewBookClubForm.propTypes = {
	createBookClub: PropTypes.func.isRequired,
};

export default NewBookClubForm;
