import "./App.css";
import { useState, useEffect } from "react";
import { app, db } from "./firebase-config";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// React Router
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Router encompasses all other  components
import Home from "./pages/Home";
// import BookClubsPage from "./pages/BookClubsPage";
import CreateBookClub from "./pages/CreateBookClub";
// import SearchPage from "./pages/SearchPage";
import BookClubHome from "./pages/BookClubHome";

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
						{/* <Nav.Link href="/searchbook">Search Book</Nav.Link> */}
					</Nav>
				</Container>
			</Navbar>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				{/* <Route path="/bookclubs" element={<BookClubsPage />}></Route> */}
				<Route
					path="/createbookclub"
					element={<CreateBookClub />}
				></Route>
				{/* <Route path="/searchbook" element={<SearchPage />}></Route> */}
				{/* dynamic variable */}
				<Route
					path="/bookclubhome/:bookclubid"
					element={<BookClubHome />}
				></Route>
			</Routes>
		</Router>
	);
}

export default App;
