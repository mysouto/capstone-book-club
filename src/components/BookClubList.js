import PropTypes from "prop-types";

import BookClub from "./BookClub";

function BookClubList({ bookClubsData, deleteBookClub, updateSelected }) {
	// creating book club list components
	const bookClubComponents = bookClubsData.map((bookclub) => {
		return (
			<BookClub
				key={bookclub.bookClubID}
				bookClubID={bookclub.bookClubID}
				name={bookclub.name}
				currentBook={bookclub.currentbook}
				deleteBookClub={deleteBookClub}
				updateSelected={updateSelected}
			/>
		);
	});
	return (
		<div>
			<ul>{bookClubComponents}</ul>
		</div>
	);
}

BookClubList.propTypes = {
	bookClubsData: PropTypes.arrayOf(
		PropTypes.shape({
			bookClubID: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})
	),
	deleteBookClub: PropTypes.func.isRequired,
};

export default BookClubList;
