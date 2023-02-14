import { useState } from "react";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

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

	let isSubmitDisabled = postText === "" || postText.length > 1000;

	return (
		<div style={{ marginTop: "20px" }}>
			<Form onSubmit={onPostSubmit}>
				<FloatingLabel controlId="floatingTextarea2" label="Comments">
					<Form.Control
						onChange={onTextChange}
						value={postText}
						as="textarea"
						value={postText}
						placeholder="Leave a comment here"
						style={{ height: "100px" }}
					></Form.Control>
				</FloatingLabel>
				<Button
					type="submit"
					disabled={isSubmitDisabled}
					style={{ marginTop: "10px" }}
				>
					Post Comment
				</Button>{" "}
			</Form>
		</div>
	);
};

NewPostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default NewPostForm;
