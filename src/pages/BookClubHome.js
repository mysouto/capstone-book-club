import { React, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { app, db } from "../firebase-config";

import { UserContext } from "../UserContext";

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
	Timestamp,
} from "firebase/firestore";

import SearchPage from "./SearchPage";
import NewPostForm from "../components/NewPostForm";
import PostsList from "../components/PostsList";
import DeleteModal from "./css-components/DeleteBookCubModal";
import NoBookAlert from "./css-components/NoBookAlert";
import NoPermissionAlert from "./css-components/NoPermissionAlert";
import BookCard from "./css-components/BookCard";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function BookClubHome() {
	const { user, login } = useContext(UserContext);

	let { bookclubid } = useParams();
	let navigate = useNavigate();

	const bookclubRef = doc(db, "bookclubs", bookclubid);
	const postsRef = collection(db, "posts");

	const [currentBookClub, setBookClub] = useState({});
	const [currentBook, setBook] = useState();
	const [currentBookClubUid, setUid] = useState("");
	const [currentBookClubAuthor, setAuthor] = useState("");
	const [postsData, setPostsData] = useState([]);
	const [searchState, setSearchState] = useState(false);
	const [showDeleteModal, setDeleteModal] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const handleClose = () => setDeleteModal(false);
	const handleShow = () => setDeleteModal(true);

	useEffect(() => {
		const unsubscribe = onSnapshot(bookclubRef, (response) => {
			const data = response.data();
			if (!data) {
				navigate("/");
				return;
			}
			setBookClub(data);
			setUid(data.uid);
			setAuthor(data.bookClubAuthor);

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
			const resData = querySnapshot.docs.map((doc) => {
				if (
					!doc.data().createdAt &&
					querySnapshot.metadata.hasPendingWrites
				) {
					const ts = Timestamp.now();
					return { ...doc.data(), id: doc.id, createdAt: ts };
				} else {
					return { ...doc.data(), id: doc.id };
				}
			});

			setPostsData(resData);
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
			uid: user.uid,
			authorName: user.displayName,
		});
	};

	const deletePost = async (postId) => {
		const postDoc = doc(db, "posts", postId);
		await deleteDoc(postDoc);
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
				uid={currentBookClub?.uid}
				bookclubName={currentBookClub?.name}
				findBook={findBook}
				currentBookClubUid={currentBookClubUid}
			/>
		);
	}

	if (currentBookClub?.currentbook) {
		return (
			<div style={{ margin: "0 auto", padding: "0 10vw" }}>
				<header style={{ fontFamily: "Abril Fatface, Cursive" }}>
					<h1 className="text-capitalize display-4">
						{currentBookClub?.name} Book Club
					</h1>
					<div style={{ fontFamily: "Poppins, Sans-Serif" }}>
						<h3>Welcome to your book club!</h3>
						<p>
							Created by:{" "}
							{currentBookClubAuthor ||
								"No author info available"}{" "}
						</p>
					</div>
				</header>

				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "space-between",
					}}
				>
					<div style={{ marginTop: "20px" }}>
						<h2
							style={{
								fontFamily: "Poppins, Sans-Serif",
								fontWeight: "bold",
							}}
						>
							<i class="bi bi-bookmark m-1"></i>
							Reading Now
						</h2>
						<BookCard
							currentBook={currentBook}
							deleteCurrentBook={deleteCurrentBook}
							currentBookClubUid={currentBookClubUid}
						/>
					</div>

					<div style={{ width: "45vw", marginTop: "20px" }}>
						<div>
							{" "}
							<h2
								style={{
									fontFamily: "Poppins, Sans-Serif",
									fontWeight: "bold",
								}}
							>
								<i className="bi bi-chat-left-dots m-1"></i>
								Comments
							</h2>
							{user ? (
								<NewPostForm addPost={addPost} />
							) : (
								<>
									<h5
										style={{
											fontFamily: "Poppins, Sans-Serif",
										}}
									>
										Login to create comment
									</h5>
									<Button
										onClick={() => {
											navigate("/login");
										}}
									>
										Login
									</Button>
								</>
							)}
						</div>

						<div className="col-lg" style={{ marginTop: "20px" }}>
							<h4
								style={{
									fontFamily: "Poppins, Sans-Serif",
									fontWeight: "bold",
								}}
							>
								Showing {postsData.length} Comments
							</h4>
							<PostsList
								postsData={postsData}
								currentBook={currentBook}
								deletePost={deletePost}
							/>
						</div>
					</div>
				</div>
				<div style={{ width: "18rem" }}>
					{user && currentBookClubUid === user.uid && (
						<DeleteModal
							bookclubid={bookclubid}
							currentBookClub={currentBookClub}
							deleteBookClub={deleteBookClub}
							showDeleteModal={showDeleteModal}
							handleClose={handleClose}
							handleShow={handleShow}
						/>
					)}
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
			<header style={{ fontFamily: "Abril Fatface, Cursive" }}>
				<h1 className="text-capitalize display-4">
					{currentBookClub?.name} Book Club
				</h1>
				<div style={{ fontFamily: "Poppins, Sans-Serif" }}>
					<h3>Welcome to your book club!</h3>
					<p>
						Created by:{" "}
						{currentBookClubAuthor || "No author info available"}{" "}
					</p>
				</div>
			</header>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				{user && currentBookClubUid === user.uid ? (
					<NoBookAlert findBook={findBook} />
				) : (
					<NoPermissionAlert findBook={findBook} />
				)}

				<div style={{ height: "160px", width: "280px" }}>
					{user && currentBookClubUid === user.uid && (
						<DeleteModal
							bookclubid={bookclubid}
							currentBookClub={currentBookClub}
							deleteBookClub={deleteBookClub}
							showDeleteModal={showDeleteModal}
							handleClose={handleClose}
							handleShow={handleShow}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default BookClubHome;
