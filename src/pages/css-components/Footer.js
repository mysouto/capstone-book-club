import { useNavigate } from "react-router-dom";

export const Footer = () => {
	let navigate = useNavigate();
	return (
		<footer
			class="text-center text-white"
			style={{
				backgroundColor: "#064c72",
				position: "absolute",
				bottom: "0",
				width: "100%",
                left: "0",
                right: "0"
			}}
		>
			<div className="container p-4 pb-0">
				<section className="">
					<p className="d-flex justify-content-center align-items-center">
						{/* <span className="me-3">Register for free</span> */}
						<a
							href="/"
							className="me-3 text-white"
							style={{ textDecoration: "none" }}
						>
							Home
						</a>
						{/* <Nav.Link href="/bookclubs">Book Clubs</Nav.Link> */}
						<a
							href="/createbookclub"
							className="me-3 text-white"
							style={{ textDecoration: "none" }}
						>
							Create a Book Club
						</a>
						<button
							type="button"
							className="btn btn-outline-light btn-rounded"
							onClick={() => navigate("/signup")}
						>
							Sign up!
						</button>
					</p>
				</section>
			</div>

			<div
				className="text-center p-3"
				style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
			>
				<a
					className="text-white"
					href="https://github.com/mysouto"
					target="_blank"
					rel="noopener noreferrer"
					style={{ textDecoration: "none" }}
				>
					Built by Milena Yamada Souto
				</a>
			</div>
		</footer>
	);
};

/* <footer
				style={{
					backgroundColor: "#020402",
					display: "block",
					position: "fixed",
					bottom: "0",
					height: "auto",
					width: "100%",
				}}
			>
				<div style={{ height: "60px", alignContent: "center" }}>
					<a
						href="https://github.com/mysouto"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							color: "#E5E7EB",
							textDecoration: "none",
						}}
					>
						Built by Milena Yamada Souto
					</a>
				</div>
			</footer> */
