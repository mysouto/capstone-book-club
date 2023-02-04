import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const NoBookAlert = ({ findBook }) => {
	return (
		<>
			<Alert variant="info">
				<Alert.Heading>No books here yet :(</Alert.Heading>
				<p>Get started here!</p>
				<hr />
				<div className="d-flex justify-content-end">
					<Button onClick={findBook} variant="outline-info">
						Find Book
					</Button>
				</div>
			</Alert>
		</>
	);
};

NoBookAlert.propTypes = {
	findBook: PropTypes.func.isRequired,
};

export default NoBookAlert;
