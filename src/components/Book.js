import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Book = ({ bookApiID, title, cover, authors, description, addBook }) => {
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Img
				src={cover}
				alt={title}
			/>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>Authors: {authors.join(", ")}</Card.Text>
				<Card.Text>Description: {description}</Card.Text>
				<Button variant="primary" onClick={() => addBook(bookApiID)}>
					Add Book
				</Button>
			</Card.Body>
		</Card>
	);
};

Book.propTypes = {
	bookApiID: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	cover: PropTypes.string,
	authors: PropTypes.array.isRequired,
	addBook: PropTypes.func,
};

export default Book;
