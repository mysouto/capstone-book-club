import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function NewBookClubForm({ createBookClub }) {
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
	let showNoNameAlert = newBookClubName === "";
	let showLenAlert = newBookClubName.length > 32;

	return (
		<form
			onSubmit={handleSubmit}
			class="form-group"
			style={{
				height: "50vw",
				width: "40vw",
				marginTop: "20px",
			}}
		>
			<label for="name">Book Club Name</label>
			<input
				type="name"
				className="form-control"
				id="name"
				name="name"
				placeholder="Enter book club name..."
				onChange={handleChange}
				style={{
					marginTop: "10px",
				}}
			></input>

			<Alert
				show={showNoNameAlert}
				key="warning"
				variant="warning"
				style={{
					marginTop: "10px",
				}}
			>
				Book club name cannot be empty
			</Alert>
			<Alert
				show={showLenAlert}
				key="warning"
				variant="warning"
				style={{
					marginTop: "10px",
				}}
			>
				Book club name cannot exceed 32 characters
			</Alert>

			<Button
				type="submit"
				disabled={isSubmitDisabled}
				style={{
					display: "inline",
					backgroundColor: "#967AA1",
					border: "none",
				}}
			>
				<i class="bi bi-book m-2"></i>
				Create Book Club
			</Button>
		</form>
	);
}

NewBookClubForm.propTypes = {
	createBookClub: PropTypes.func.isRequired,
};

export default NewBookClubForm;
