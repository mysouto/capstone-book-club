// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

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
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="#home">Navbar</Navbar.Brand>
					<Nav>
						<Nav.Link href="/">Home</Nav.Link>
						{/* <Nav.Link href="/bookclubs">Book Clubs</Nav.Link> */}
						<Nav.Link href="/createbookclub">
							Create a Book Club
						</Nav.Link>
						{/* <Nav.Link href="/signup">Sign Up</Nav.Link> */}
						{!user ? (
							<Nav.Link href="/login">Login</Nav.Link>
						) : (
							<Button onClick={logout} variant="outline-success">
								Logout
							</Button>
						)}
					</Nav>
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
