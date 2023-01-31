import PropTypes from "prop-types";

import Book from "./Book";

// params: title, author, img
const BookList = ({ searchResults, addBook }) => {
	const resultsComponents = searchResults.map((result) => {
		return (
			<Book
				bookApiID={result.id}
				cover={result.volumeInfo.imageLinks.thumbnail}
				title={result.volumeInfo.title}
				authors={result.volumeInfo.authors}
				addBook={addBook}
			/>
		);
	});
	return <div>{resultsComponents}</div>;
};

BookList.propTypes = {
	searchResults: PropTypes.arrayOf(
		PropTypes.shape({
			bookApiID: PropTypes.string.isRequired,
			cover: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			authors: PropTypes.array.isRequired,
		})
	),
	addBook: PropTypes.func,
};

export default BookList;
