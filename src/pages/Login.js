import "../App.css";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { auth, gmailProvider } from "../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { async } from "@firebase/util";

function Login() {
	let navigate = useNavigate();
	const { user, logout } = useContext(UserContext);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
			console.log("logged in user: ", user);
			navigate("/");
		} catch (error) {
			alert(error.message); // TODO: error handling on the frontend
		}
	};

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, gmailProvider);
			// console.log("gmail signed in:", user);
			// console.log("email:", user.email);
			// console.log("displayName:", user.displayName);
			navigate("/");
		} catch (error) {
			console.log(error);
			alert(error);
		}

		// signInWithPopup(auth, gmailProvider)
		// 	.then((result) => {
		// 		console.log("gmail signed in:", result);
		// 		console.log("email:", result.user.email);
		// 		console.log("email:", result.user.displayName);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 		alert(error);
		// 	});
	};

	return (
		<div
			style={{
				margin: "0 auto",
				padding: "0 10vw",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<h2> Login </h2>
			<Form className="p-3" style={{ height: "280px", width: "500px" }}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						value={loginEmail}
						placeholder="Email"
						onChange={(event) => {
							setLoginEmail(event.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={loginPassword}
						placeholder="Password"
						onChange={(event) => {
							setLoginPassword(event.target.value);
						}}
					/>
				</Form.Group>

				{/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
				{user ? (
					<Button onClick={logout} variant="primary" type="submit">
						Log Out
					</Button>
				) : (
					<Button onClick={login} variant="primary">
						Log In
					</Button>
				)}
			</Form>

			<button
				onClick={signInWithGoogle}
				type="button"
				class="login-with-google-btn"
			>
				Sign In With Google
			</button>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					margin: "20px",
				}}
			>
				<h2> Register </h2>
				<p>Not registered yet?</p>
				<Button onClick={() => navigate("/signup")}>Sign Up</Button>
			</div>
			{/* input version */}
			{/* <input
				value={loginEmail}
				placeholder="Email..."
				onChange={(event) => {
					setLoginEmail(event.target.value);
				}}
			/>{" "}
			<input
				value={loginPassword}
				placeholder="Password..."
				onChange={(event) => {
					setLoginPassword(event.target.value);
				}}
			/>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			{user ? (
				<button onClick={logout}>Log out</button>
			) : (
				<button onClick={login}>Log in</button>
			)} */}
		</div>
	);
}

export default Login;
