import PropTypes from "prop-types";

function BookClub({ id, name }) {
	return (
		<div>
			<p>Book Club: {name} </p>
            <p>ID {id}</p>

			{/* add delete button here */}
			{/* pass down prop from App */}
		</div>
	);
}

BookClub.propTypes = {
    id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
};

export default BookClub;
