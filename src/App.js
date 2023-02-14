// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

// React Router
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Router encompasses all other  components
import Home from "./pages/Home";
import CreateBookClub from "./pages/CreateBookClub";
import BookClubHome from "./pages/BookClubHome";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import React, { useContext } from "react";
// import UserContext
import { UserContext, UserContextProvider } from "./UserContext";

const Main = () => {
	const { user, logout } = useContext(UserContext);

	return (
		<>
			<Navbar
				key="xl"
				bg="light"
				expand="lg"
				className="mb-3"
				// bg="light"
				// variant="light"
				// bg-color="#2e9f9e"
				// className="bg-light expand navbar-expand-lg"
			>
				<Container>
					<Navbar.Brand href="#home">Navbar</Navbar.Brand>
					<Navbar.Toggle
						aria-controls={"offcanvasNavbar-expand-lg"}
					/>
					<Navbar.Offcanvas
						id={"offcanvasNavbar-expand-md"}
						aria-labelledby={"offcanvasNavbarLabel-expand-lg"}
						placement="end"
					>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title
								id={"offcanvasNavbarLabel-expand-lg"}
							>
								Offcanvas
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className="justify-content-end flex-grow-1 pe-3">
								<Nav.Link href="/">Home</Nav.Link>
								{/* <Nav.Link href="/bookclubs">Book Clubs</Nav.Link> */}
								<Nav.Link href="/createbookclub">
									Create a Book Club
								</Nav.Link>
								{/* <Nav.Link href="/signup">Sign Up</Nav.Link> */}
								{!user ? (
									<Nav.Link href="/login">Login</Nav.Link>
								) : (
									<Button
										onClick={logout}
										variant="outline-success"
									>
										Logout
									</Button>
								)}
								{/* <button
									aria-controls="offcanvasNavbar-expand-false"
									type="button"
									aria-label="Toggle navigation"
									class="navbar-toggler collapsed"
								>
									<span class="navbar-toggler-icon"></span>
								</button> */}
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>

			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route
					path="/createbookclub"
					element={<CreateBookClub />}
				></Route>
				{/* dynamic variable */}
				<Route
					path="/bookclubhome/:bookclubid"
					element={<BookClubHome />}
				></Route>
				<Route path="/signup" element={<SignUp />}></Route>
				<Route path="/login" element={<Login />}></Route>
			</Routes>
		</>
	);
};

function App() {
	return (
		<Router>
			{/* wrap components with Provider */}
			<UserContextProvider>
				<Main />
			</UserContextProvider>
		</Router>
	);
}

export default App;
