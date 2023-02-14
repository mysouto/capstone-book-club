import PropTypes from "prop-types";

import BookClub from "./BookClub";

function BookClubList({ bookClubsData }) {
	const bookClubComponents = bookClubsData.map((bookclub) => {
		return (
			<BookClub
				key={bookclub.bookClubID}
				bookClubID={bookclub.bookClubID}
				name={bookclub.name}
				uid={bookclub.uid}
			/>
		);
	});
	return (
		<div className="row justify-content-center">{bookClubComponents}</div>
	);
}

BookClubList.propTypes = {
	bookClubsData: PropTypes.arrayOf(
		PropTypes.shape({
			bookClubID: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})
	),
};

export default BookClubList;
