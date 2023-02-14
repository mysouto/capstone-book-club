import PropTypes from "prop-types";
import BookRes from "./BookRes";

const BookResList = ({ searchResults, addBook, currentBookClubUid }) => {
	const resultsComponents = searchResults.map((result) => {
		return (
			<BookRes
				key={result.bookApiID}
				bookApiID={result.bookApiID}
				cover={result.cover}
				title={result.title}
				authors={result.authors}
				description={result.description}
				publishedDate={result.publishedDate}
				addBook={addBook}
				currentBookClubUid={currentBookClubUid}
			/>
		);
	});
	return (
		<div className="row justify-content-between">{resultsComponents}</div>
	);
};

BookResList.propTypes = {
	searchResults: PropTypes.arrayOf(
		PropTypes.shape({
			bookApiID: PropTypes.string.isRequired,
			cover: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			authors: PropTypes.string.isRequired,
			publishedDate: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
		})
	),
	addBook: PropTypes.func,
};

export default BookResList;
