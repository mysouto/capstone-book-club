import PropTypes from "prop-types";

import BookClub from "./BookClub";

function BookClubList({ bookClubsData }) {
	// creating book club list components
	const bookClubComponents = bookClubsData.map((bookclub) => {
		return (
			<BookClub key={bookclub.id} id={bookclub.id} name={bookclub.name} />
		);
	});
	return <div>{bookClubComponents}</div>;
}

BookClubList.propTypes = {
	bookClubsData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		})
	),
};

export default BookClubList;
