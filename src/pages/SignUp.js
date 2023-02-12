import { auth } from "../firebase-config";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged, // trigerred every time there's a change in Auth state
	signOut,
	updateProfile,
} from "firebase/auth";
import { useEffect, useState, useContext } from "react";

import { UserContext } from "../UserContext";

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
		<div>
			<h3>Create Account</h3>{" "}
			<input
				placeholder="Name..."
				onChange={(event) => {
					setRegisterName(event.target.value);
				}}
				value={registerName}
			/>
			<input
				placeholder="Email..."
				onChange={(event) => {
					setRegisterEmail(event.target.value);
				}}
				value={registerEmail}
			/>
			<input
				placeholder="Password..."
				onChange={(event) => {
					setRegisterPassword(event.target.value);
				}}
				value={registerPassword}
			/>
			{/* <button onClick={register}>Create User</button> */}
			{/* <button onClick={logout}>Sign Out</button> */}
			<pre>{JSON.stringify(user, null, 2)}</pre>
			{user ? (
				<button onClick={logout}>Log out</button>
			) : (
				<button onClick={register}>Sign Up</button>
			)}
		</div>
	);
}

export default SignUp;
