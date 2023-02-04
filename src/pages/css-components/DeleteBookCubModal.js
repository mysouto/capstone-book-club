import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

const DeleteModal = ({
	bookclubid,
	currentBookClub,
	deleteBookClub,
	showDeleteModal,
	handleClose,
	handleShow,
}) => {
	return (
		<>
			<Alert variant="danger">
				<p>Danger Zone</p>
				<hr />
				<div className="d-flex justify-content-end">
					<Button variant="outline-danger" onClick={handleShow}>
						Delete Book Club modal
					</Button>
					<Modal show={showDeleteModal} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>
								Delete {currentBookClub.name} Book Club
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Are you sure you wanna delete this Book Club?
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button
								variant="danger"
								onClick={() => {
									deleteBookClub(bookclubid);
								}}
							>
								Delete Book Club
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</Alert>
		</>
	);
};

// DEBUG
// Failed prop type: Invalid prop `currentBookClub` of type `array` supplied to `DeleteModal`, expected `object`.
DeleteModal.propTypes = {
	bookclubid: PropTypes.string.isRequired,
	currentBookClub: PropTypes.object.isRequired,
	deleteBookClub: PropTypes.func.isRequired,
	showDeleteModal: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleShow: PropTypes.func.isRequired,
};

export default DeleteModal;
