import { auth } from "../firebase-config";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged, // trigerred every time there's a change in Auth state
	signOut,
	updateProfile,
} from "firebase/auth";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SignUp() {
	const { user, logout } = useContext(UserContext);

	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerName, setRegisterName] = useState("");

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				console.log("signed in user ID: ", currentUser.uid);
			} else {
				console.log("User signed out");
			}
		});
	}, []);

	const register = async () => {
		try {
			const userCreated = await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			);
			console.log(userCreated);

			const userDisplayName = await updateProfile(auth.currentUser, {
				displayName: registerName,
			});
			console.log(userDisplayName);
		} catch (error) {
			//alert(error.message);
			console.log(error);
		}
	};

	// const logout = async () => {
	// 	await signOut(auth);
	// };

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
			<h2>Create Account</h2>{" "}
			<Form
				className="p-3 rounded"
				style={{
					height: "400px",
					width: "500px",
					backgroundColor: "#e9f4f4",
				}}
			>
				<Form.Group className="mb-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="name"
						value={registerName}
						placeholder="Name"
						onChange={(event) => {
							setRegisterName(event.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						value={registerEmail}
						placeholder="Email"
						onChange={(event) => {
							setRegisterEmail(event.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={registerPassword}
						placeholder="Password"
						onChange={(event) => {
							setRegisterPassword(event.target.value);
						}}
					/>
				</Form.Group>

				<pre>{JSON.stringify(user, null, 2)}</pre>
				{user ? (
					<Button
						onClick={logout}
						// style={{ backgroundColor: "#2e9f9e !important" }}
						variant="primary"
					>
						Log out
					</Button>
				) : (
					<Button onClick={register} variant="primary">
						Sign Up
					</Button>
				)}
			</Form>
			{/* <input
				placeholder="Name..."
				onChange={(event) => {
					setRegisterName(event.target.value);
				}}
				value={registerName}
			/> */}
			{/* <input
				placeholder="Email..."
				onChange={(event) => {
					setRegisterEmail(event.target.value);
				}}
				value={registerEmail}
			/> */}
			{/* <input
				placeholder="Password..."
				onChange={(event) => {
					setRegisterPassword(event.target.value);
				}}
				value={registerPassword}
			/> */}
			{/* <button onClick={register}>Create User</button> */}
			{/* <button onClick={logout}>Sign Out</button> */}
		</div>
	);
}

export default SignUp;
