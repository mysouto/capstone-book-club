import PropTypes from "prop-types";

function BookClub({ name }) {
	return (
		<div>
			<p>Book Club: {name} </p>

			{/* add delete button here */}
			{/* pass down prop from App */}
		</div>
	);
}

BookClub.propTypes = {
	name: PropTypes.string.isRequired,
};

export default BookClub;
