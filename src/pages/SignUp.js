import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Footer } from "./css-components/Footer";

function SignUp() {
	const { user, logout } = useContext(UserContext);
	let navigate = useNavigate();

	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerName, setRegisterName] = useState("");

	const register = async () => {
		try {
			// const userCreated = await createUserWithEmailAndPassword(
			await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			);
			// console.log(userCreated);

			// const userDisplayName = await updateProfile(auth.currentUser, {
			await updateProfile(auth.currentUser, {
				displayName: registerName,
			});
			// console.log("displayName: ", userDisplayName);
			navigate("/createbookclub");
		} catch (error) {
			alert(error.message);
		}
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
			<h2 className="display-6">Create Account</h2>{" "}
			<Form
				className="p-3 rounded"
				style={{
					height: "360px",
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

				{user ? (
					<Button onClick={logout} variant="primary">
						Log out
					</Button>
				) : (
					<Button onClick={register} variant="primary">
						Sign Up
					</Button>
				)}
			</Form>
			<Footer />
		</div>
	);
}

export default SignUp;
