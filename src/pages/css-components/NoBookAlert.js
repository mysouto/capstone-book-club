import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const NoBookAlert = ({ findBook }) => {
	return (
		<Alert variant="info">
			<div style={{ display: "flex", justifyContent: "space-around" }}>
				<div>
					<Alert.Heading className="display-4">
						No books here yet
					</Alert.Heading>
					<p className="lead">Get started by adding a book!</p>
					<Button onClick={findBook} variant="info">
						Find Book
					</Button>
				</div>
				<div>
					<iframe
						src="https://giphy.com/embed/tvGOBZKNEX0ac"
						width="280"
						height="136"
						title="John Travolta confused gif"
						className="giphy-embed"
						allowFullScreen
					></iframe>
				</div>
			</div>
		</Alert>
	);
};

NoBookAlert.propTypes = {
	findBook: PropTypes.func.isRequired,
};

export default NoBookAlert;
