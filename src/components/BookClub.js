import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function BookClub({ bookClubID, name, deleteBookClub }) {
	let navigate = useNavigate();

	return (
		<div>
			<div
			// style={{ cursor: "pointer" }}
			// // onClick={() => console.log("selecting a book club")}
			// onClick={() => updateSelected(bookClubID)}
			>
				Book Club: {name}
			</div>
			{/* <p>ID {bookClubID}</p> */}

			{/* NAVIGATE TO BOOK CLUB HOME PAGE */}
			<button
				onClick={() => {
					navigate(`/bookclubhome/${bookClubID}`);
				}}
			>
				Go to Club Page
			</button>

			{/* <button
				onClick={() => {
					deleteBookClub(bookClubID);
				}}
			>
				Delete book club
			</button> */}
		</div>
	);
}

BookClub.propTypes = {
	bookClubID: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	deleteBookClub: PropTypes.func.isRequired,
};

export default BookClub;
