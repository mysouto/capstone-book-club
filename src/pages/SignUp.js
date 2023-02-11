import { auth } from "../firebase-config";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged, // trigerred every time there's a change in Auth state
	signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

function SignUp() {
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");

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
			const user = await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			);
			console.log(user);
		} catch (error) {
			//alert(error.message);
			console.log(error);
		}
	};

	const logout = async () => {
		await signOut(auth);
	};

	return (
		<div>
			<h3>Register User / Sign Up</h3>
			<input
				placeholder="Email..."
				onChange={(event) => {
					setRegisterEmail(event.target.value);
				}}
				// value={registerEmail}
			/>
			<input
				placeholder="Password..."
				onChange={(event) => {
					setRegisterPassword(event.target.value);
				}}
				// value={registerPassword}
			/>
			<button onClick={register}>Create User</button>
			<button onClick={logout}>Sign Out</button>
		</div>
	);
}

export default SignUp;
