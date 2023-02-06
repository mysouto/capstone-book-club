import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

const BookCard = ({ currentBook }) => {
	return (
		<Card style={{ width: "16rem" }}>
			<Card.Img src={currentBook.cover} alt={currentBook.title} />
			<Card.Body>
				<Card.Title>{currentBook.title}</Card.Title>
				<Card.Text>Author: {currentBook.authors}</Card.Text>
				<Card.Text>Description {currentBook.description}</Card.Text>
			</Card.Body>
		</Card>
	);
};

BookCard.propTypes = {
	currentBook: PropTypes.object.isRequired,
};

export default BookCard;
