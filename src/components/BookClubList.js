import PropTypes from "prop-types";

import BookClub from "./BookClub";

function BookClubList({ bookClubsData }) {
	// creating book club list components
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
		<div
			// style={{
			// 	display: "flex",
			// 	justifyContent: "space-evenly",
			// 	// alignItems: "center",
			// 	flexWrap: "wrap",
			// }}
			className= "row justify-content-center"
		>
			{bookClubComponents}
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
};

export default BookClubList;
