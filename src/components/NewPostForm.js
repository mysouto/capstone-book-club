import { useState } from "react";
import PropTypes from "prop-types";

// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

// FEATURE: CREATE A POST
// todo: need other fields or data from post?
const NewPostForm = ({ addPost }) => {
	const [postText, setText] = useState("");

	const onTextChange = (event) => {
		const postData = event.target.value;
		setText(postData);
	};

	const onPostSubmit = (event) => {
		event.preventDefault();
		addPost(postText);
		setText("");
	};

	// additional feature
	// const isSubmitDisabled = postText.text === "" || postText.text.length > 30;

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
				<Button type="submit">Post Comment</Button>{" "}
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
