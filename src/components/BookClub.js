import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function BookClub({ bookClubID, name, uid }) {
	let navigate = useNavigate();

	return (
		<div className="col-sm-5 col-lg-2 m-3 p-5 bg-white text-dark text-center text-capitalize rounded shadow">
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div>
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

				<div>
					<Button
						// style={{ backgroundColor: "#008093", border: "none" }}
						onClick={() => {
							navigate(`/bookclubhome/${bookClubID}`);
						}}
						variant="secondary"
						size="sm"
						// className="fw-light"
						// style={{ alignSelf: "end" }}
					>
						Go to Book Club
					</Button>
				</div>
			</div>
		</div>
	);
}

BookClub.propTypes = {
	bookClubID: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default BookClub;
