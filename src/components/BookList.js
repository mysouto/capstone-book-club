import PropTypes from "prop-types";

import Book from "./Book";

// params: title, author, img
const BookList = ({ searchResults, addBook }) => {
	const resultsComponents = searchResults.map((result) => {
		return (
			<Book
				key={result.bookApiID}
				bookApiID={result.bookApiID}
				cover={result.cover}
				title={result.title}
				authors={result.authors}
				description={result.description}
				addBook={addBook}
				// key={result.id}
				// bookApiID={result.id}
				// cover={
				// 	result.volumeInfo.imageLinks === undefined
				// 		? ""
				// 		: result.volumeInfo.imageLinks.thumbnail
				// }
				// title={result.volumeInfo.title}
				// authors={result.volumeInfo.authors}
				// description={result.volumeInfo.description}
				// addBook={addBook}

				// key={
				// 	result.id === undefined
				// 		? "No bookApiID from response"
				// 		: result.id
				// }
				// bookApiID={
				// 	result.id === undefined
				// 		? "No bookApiID from response"
				// 		: result.id
				// }
				// cover={
				// 	result.volumeInfo.imageLinks === undefined
				// 		? ""
				// 		: result.volumeInfo.imageLinks.thumbnail
				// }
				// title={result.volumeInfo.title}
				// authors={result.volumeInfo.authors}
				// description={
				// 	result.volumeInfo.description === undefined
				// 		? "No book description available."
				// 		: result.volumeInfo.description
				// }
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
			authors: PropTypes.string.isRequired,
			description: PropTypes.string,
		})
	),
	addBook: PropTypes.func,
};

export default BookList;
