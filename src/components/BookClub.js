import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function BookClub({ bookClubID, name, uid }) {
	let navigate = useNavigate();

	return (
		<div className="col-sm-5 col-lg-2 m-3 p-5 bg-white text-dark text-center text-capitalize rounded shadow">
			<div style={{ alignSelf: "flexStart" }}>
				<h4
					style={{
						color: "#17615c",
						fontFamily: "Poppins, Sans-Serif",
						fontWeight: "bold",
					}}
				>
					{" "}
					{name}
				</h4>
			</div>

			<div style={{ alignSelf: "flexEnd" }}>
				<Button
					style={{ backgroundColor: "#7A82AB", border: "none" }}
					onClick={() => {
						navigate(`/bookclubhome/${bookClubID}`);
					}}
					variant="secondary"
					size="sm"
				>
					Go to Book Club
				</Button>
			</div>
		</div>
	);
}

BookClub.propTypes = {
	bookClubID: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default BookClub;
