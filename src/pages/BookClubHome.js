import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { app, db } from "../firebase-config";

import {
	addDoc,
	collection,
	deleteDoc,
	deleteField,
	doc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from "firebase/firestore";

import SearchPage from "./SearchPage";
import NewPostForm from "../components/NewPostForm";
import PostsList from "../components/PostsList";
import DeleteModal from "./css-components/DeleteBookCubModal";
import NoBookAlert from "./css-components/NoBookAlert";
import BookCard from "./css-components/BookCard";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function BookClubHome() {
	let { bookclubid } = useParams();
	let navigate = useNavigate();

	const bookclubRef = doc(db, "bookclubs", bookclubid);
	const postsRef = collection(db, "posts");

	const [currentBookClub, setBookClub] = useState({});
	const [currentBook, setBook] = useState();
	const [postsData, setPostsData] = useState([]);
	const [searchState, setSearchState] = useState(false);
	const [showDeleteModal, setDeleteModal] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const handleClose = () => setDeleteModal(false);
	const handleShow = () => setDeleteModal(true);

	useEffect(() => {
		const unsubscribe = onSnapshot(bookclubRef, (response) => {
			const data = response.data();
			// if no bookclub doc data found in db, navigate home and return to stop onSnapshot listener
			if (!data) {
				navigate("/");
				return;
			}
			setBookClub(data);

			if (data.currentbook) {
				const bookData = data.currentbook;
				setBook(bookData);
			}

			// change loading state once rendered
			setIsLoading(false);
		});
		// Stop listening to changes
		return unsubscribe;
	}, [bookclubid]);

	useEffect(() => {
		if (!currentBook) {
			return;
		}

		const postsQuery = query(
			collection(db, "posts"),
			where("bookclubID", "==", bookclubid),
			where("bookID", "==", currentBook.bookApiID),
			orderBy("createdAt", "desc")
		);

		const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
			setPostsData(
				querySnapshot.docs.map((doc) => ({
					// doc.data() is never undefined for query doc snapshots
					...doc.data(),
					id: doc.id,
				}))
			);

		});
		return unsubscribe;
	}, [currentBook]);

	const findBook = () => {
		setSearchState(!searchState);
	};

	const addPost = async (postText) => {
		await addDoc(postsRef, {
			text: postText,
			bookclubID: bookclubid,
			bookID: currentBook.bookApiID,
			createdAt: serverTimestamp(),
		});
	};
	const deleteBookClub = async (id) => {
		const bookClubDoc = doc(db, "bookclubs", id);
		await deleteDoc(bookClubDoc);
	};

	const deleteCurrentBook = async (id) => {
		await updateDoc(bookclubRef, { currentbook: deleteField() });
	};

	if (isLoading) {
		return (
			<div
				style={{
					display: "flex",
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					height: "50vh",
				}}
			>
				<Spinner animation="border" />
			</div>
		);
	}

	if (searchState) {
		return (
			<SearchPage
				bookclubid={bookclubid}
				bookclubName={currentBookClub?.name}
				findBook={findBook}
			/>
		);
	}

	if (currentBookClub?.currentbook) {
		return (
			<div style={{ margin: "0 auto", padding: "0 10vw" }}>
				<header>
					<h1 className="text-capitalize">
						{currentBookClub?.name} Book Club
					</h1>
					<h2>Welcome to your book club!</h2>
				</header>

				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "space-between",
					}}
				>
					<div style={{ marginTop: "20px" }}>
						<h2>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-bookmark-fill"
								viewBox="0 0 20 20"
							>
								<path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
							</svg>
							Reading Now
						</h2>
						<div style={{ marginTop: "20px" }}>
							<BookCard currentBook={currentBook} />
							<Button
								onClick={() => deleteCurrentBook()}
								variant="warning"
							>
								Delete book
							</Button>
						</div>
					</div>

					<div style={{ width: "45vw", marginTop: "20px" }}>
						<div>
							{" "}
							<h2>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									className="bi bi-chat-square-text-fill"
									viewBox="0 0 20 20"
								>
									<path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
								</svg>
								Comments
							</h2>
							<NewPostForm addPost={addPost} />
						</div>

						{/* READ POSTS */}
						<div className="col-lg" style={{ marginTop: "20px" }}>
							<h3>Showing {postsData.length} Comments</h3>
							<PostsList
								postsData={postsData}
								currentBook={currentBook}
							/>
						</div>
					</div>
				</div>
				<div style={{ width: "18rem" }}>
					<DeleteModal
						bookclubid={bookclubid}
						currentBookClub={currentBookClub}
						deleteBookClub={deleteBookClub}
						showDeleteModal={showDeleteModal}
						handleClose={handleClose}
						handleShow={handleShow}
					/>
				</div>
			</div>
		);
	}

	return (
		<div
			style={{
				margin: "0 auto",
				padding: "0 10vw",
			}}
		>
			<h1 className="text-capitalize">
				{currentBookClub?.name} Book Club
			</h1>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<NoBookAlert findBook={findBook} />

				<div style={{ height: "160px", width: "280px" }}>
					<DeleteModal
						bookclubid={bookclubid}
						currentBookClub={currentBookClub}
						deleteBookClub={deleteBookClub}
						showDeleteModal={showDeleteModal}
						handleClose={handleClose}
						handleShow={handleShow}
					/>
				</div>
			</div>
		</div>
	);
}

export default BookClubHome;
