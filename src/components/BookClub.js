import PropTypes from "prop-types";

function BookClub({ bookClubID, name, currentBook, deleteBookClub }) {
	return (
		<div>
			<li>Book Club: {name} </li>
			{/* <p>ID {bookClubID}</p> */}
			{/* <p>Current Book ID: {currentBook}</p> */}

			<button
				onClick={() => {
					deleteBookClub(bookClubID);
				}}
			>
				Delete book club
			</button>
		</div>
	);
}

BookClub.propTypes = {
	bookClubID: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	deleteBookClub: PropTypes.func.isRequired,
};

export default BookClub;
