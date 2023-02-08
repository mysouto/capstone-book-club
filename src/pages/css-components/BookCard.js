import PropTypes from "prop-types";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Modal } from "react-bootstrap";

const BookCard = ({ currentBook }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<Card style={{ width: "16rem", height: "40rem" }}>
				<Card.Img
					src={currentBook.cover}
					alt={currentBook.title}
					style={{ height: "20rem" }}
				/>
				<Card.Body>
					<Card.Title>{currentBook.title}</Card.Title>
					<Card.Text>
						<strong>Author: </strong>
						<p className="text-muted">{currentBook.authors}</p>
					</Card.Text>
					<Card.Text>
						{" "}
						<strong>Description </strong>
						<p className="text-muted">
							{currentBook.description.slice(0, 100)} ...{" "}
							{/* <a href="#" data-toggle="modal" data-target={BookDetailsModal}> */}
							<Card.Link href="#" onClick={handleShow}>
								see more
							</Card.Link>
						</p>
					</Card.Text>
				</Card.Body>
			</Card>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{currentBook.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Card.Img
						src={currentBook.cover}
						alt={currentBook.title}
						style={{ height: "220px", width: "180px" }}
					/>
					<p>
						<strong>Author(s):</strong> {currentBook.authors}
					</p>
					<p>
						<strong>Description</strong> <br></br>
						{currentBook.description}
					</p>
					<p>
						<strong>Published: </strong>
						{currentBook.publishedDate}
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

BookCard.propTypes = {
	currentBook: PropTypes.object.isRequired,
};

export default BookCard;
