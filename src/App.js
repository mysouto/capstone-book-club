import React, { useContext } from "react";
import { UserContext, UserContextProvider } from "./UserContext";

// CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

// React Router
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateBookClub from "./pages/CreateBookClub";
import BookClubHome from "./pages/BookClubHome";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
// import { Footer } from "./pages/css-components/Footer";

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
					<Navbar.Brand href="/" className="flex">
						{" "}
						<i class="bi bi-book-half m-2"></i>readdit
					</Navbar.Brand>
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
								<Nav.Link href="/" className="text-dark">
									Home
								</Nav.Link>
								<Nav.Link
									href="/createbookclub"
									className="text-dark"
								>
									Create a Book Club
								</Nav.Link>
								{!user ? (
									<Nav.Link
										href="/login"
										className="text-dark"
									>
										{" "}
										Login
									</Nav.Link>
								) : (
									<Button onClick={logout} variant="light">
										Logout
									</Button>
								)}
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
		<Router className="App">
			{/* wrap components with Provider */}
			<UserContextProvider>
				<Main />
			</UserContextProvider>
		</Router>
	);
}

export default App;
