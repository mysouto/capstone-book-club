import PropTypes from "prop-types";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

const BookRes = ({
	bookApiID,
	title,
	cover,
	authors,
	description,
	publishedDate,
	addBook,
}) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div className="col mt-5">
			<Card style={{ width: "18rem", height: "40rem" }}>
				{/* / height: "100" */}
				<Card.Img
					src={cover}
					alt={title}
					variant="top"
					style={{ height: "20rem" }}
				/>
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text style={{ fontSize: "1rem" }}>
						Author(s): {authors}
					</Card.Text>
					<Card.Text>
						Description: {description.slice(0, 100)}...{" "}
						{/* <a href="#" data-toggle="modal" data-target={BookDetailsModal}> */}
						<Card.Link href="#" onClick={handleShow}>
							see more
						</Card.Link>
					</Card.Text>
					<Button
						variant="primary"
						onClick={() => addBook(bookApiID)}
					>
						Add Book
					</Button>

					{/* <Button onClick={handleShow}>See Book Details</Button> */}
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>{title}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<p>
								<strong>Author(s):</strong> {authors}
							</p>
							<p>
								<strong>Description</strong> <br></br>
								{description}
							</p>
							<p>
								<strong>Published: </strong>
								{publishedDate}
							</p>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button
								variant="primary"
								onClick={() => addBook(bookApiID)}
							>
								Add Book to Club
							</Button>
						</Modal.Footer>
					</Modal>
				</Card.Body>
			</Card>
		</div>
	);
};

BookRes.propTypes = {
	bookApiID: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	cover: PropTypes.string.isRequired,
	authors: PropTypes.string.isRequired,
	addBook: PropTypes.func.isRequired,
};

export default BookRes;
