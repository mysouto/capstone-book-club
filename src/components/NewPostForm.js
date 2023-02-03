import { useState } from "react";
import PropTypes from "prop-types";

// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

// FEATURE: CREATE A POST
// todo: need other fields or data from post?
const NewPostForm = ({ addPost }) => {
	const [postText, setText] = useState("");
	const [charCount, setCount] = useState("");

	const onTextChange = (event) => {
		const postData = event.target.value;
		setText(postData);
		setCount(postData.length);
	};

	const onPostSubmit = (event) => {
		event.preventDefault();
		addPost(postText);
		setText("");
	};

	// additional feature
	let isSubmitDisabled = postText === "" || postText.length > 300;
	let showAlert = postText.length > 300;

	return (
		<div>
			<Form onSubmit={onPostSubmit}>
				<FloatingLabel controlId="floatingTextarea2" label="Comments">
					<Form.Control
						onChange={onTextChange}
						as="textarea"
						placeholder="Leave a comment here"
						style={{ height: "100px" }}
					></Form.Control>
				</FloatingLabel>
				{/* <Button type="submit" disabled={isSubmitDisabled}> */}
				<Button type="submit" disabled={isSubmitDisabled}>
					Post Comment
				</Button>{" "}
				<p> Characters: {charCount}</p>
				<Alert show={showAlert} key="warning" variant="warning">
					Too many characters, be more concise lol
				</Alert>
			</Form>

			{/* <form onSubmit={onPostSubmit}>
				<input
					onChange={onTextChange}
					placeholder="Leave a comment here"
				></input>
				<Button type="submit">Post Comment</Button>{" "}
			</form> */}
			{/* bootstrap component */}
		</div>
	);
};

NewPostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default NewPostForm;
