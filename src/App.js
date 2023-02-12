// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// React Router
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Router encompasses all other  components
import Home from "./pages/Home";
import CreateBookClub from "./pages/CreateBookClub";
import BookClubHome from "./pages/BookClubHome";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import React, { useState, useMemo } from "react";
// import UserContext
import { UserContextProvider } from "./UserContext";

function App() {
	return (
		<Router>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="#home">Navbar</Navbar.Brand>
					<Nav>
						<Nav.Link href="/">Home</Nav.Link>
						{/* <Nav.Link href="/bookclubs">Book Clubs</Nav.Link> */}
						<Nav.Link href="/createbookclub">
							Create a Book Club
						</Nav.Link>
						<Nav.Link href="/signup">Sign Up</Nav.Link>
						<Nav.Link href="/login">Login</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			{/* wrap components with Provider */}
			<UserContextProvider>
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
			</UserContextProvider>
		</Router>
	);
}

export default App;
