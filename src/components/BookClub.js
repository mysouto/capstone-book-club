import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function BookClub({ bookClubID, name }) {
	let navigate = useNavigate();

	return (
		<div
			className="col-sm-5 col-lg-2 m-3 p-5 bg-info text-white text-center text-capitalize rounded shadow"
			// style={{
			// 	display: "flex",
			// 	flexDirection: "column",
			// 	flexWrap: "wrap",
			// }}
		>
			{/* <div
			style={{ cursor: "pointer" }}
			>
				Book Club: {name}
			</div> */}

			<p className="lead"> {name}</p>
			{/* NAVIGATE TO BOOK CLUB HOME PAGE */}
			<Button
				onClick={() => {
					navigate(`/bookclubhome/${bookClubID}`);
				}}
				// variant="secondary" size="sm"
				variant="outline-secondary"
				size="sm"
				// className="fw-light"
			>
				Go to Book Club
			</Button>
		</div>
	);
}

BookClub.propTypes = {
	bookClubID: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default BookClub;
