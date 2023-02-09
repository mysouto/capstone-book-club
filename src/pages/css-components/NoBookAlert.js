import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const NoBookAlert = ({ findBook }) => {
	return (
		<Alert variant="info">
			<Alert.Heading className="display-4">
				No books here yet :(
			</Alert.Heading>
			<p className="lead">Get started by adding a book!</p>
			<div className="d-flex justify-content-start">
				<Button onClick={findBook} variant="info">
					Find Book
				</Button>
			</div>
		</Alert>
	);
};

NoBookAlert.propTypes = {
	findBook: PropTypes.func.isRequired,
};

export default NoBookAlert;
