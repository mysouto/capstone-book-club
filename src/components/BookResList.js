import PropTypes from "prop-types";
import BookRes from "./BookRes";

// params: title, author, img
const BookResList = ({ searchResults, addBook }) => {
	const resultsComponents = searchResults.map((result) => {
		return (
			<BookRes
				key={result.bookApiID}
				bookApiID={result.bookApiID}
				cover={result.cover}
				title={result.title}
				authors={result.authors}
				description={result.description}
				addBook={addBook}
			/>
		);
	});
	return <div>{resultsComponents}</div>;
};

BookResList.propTypes = {
	searchResults: PropTypes.arrayOf(
		PropTypes.shape({
			bookApiID: PropTypes.string.isRequired,
			cover: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			authors: PropTypes.string.isRequired,
			description: PropTypes.string,
		})
	),
	addBook: PropTypes.func,
};

export default BookResList;
