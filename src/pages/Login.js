import { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import {
	signInWithEmailAndPassword,
	onAuthStateChanged, // trigerred every time there's a change in Auth state
	signOut,
} from "firebase/auth";

function Login() {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	// state for user, so user stays logged in page refresh
	const [user, setUser] = useState({});

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				// user is signed in
				setUser(currentUser);
				console.log("signed in user ID: ", currentUser.uid);
			} else {
				console.log("User logged out");
			}
		});
	}, []);

	const login = async () => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				loginEmail,
				loginPassword
			);
			console.log(user);
		} catch (error) {
			alert(error.message); // TODO: error handling on the frontend
		}
	};

	const logout = async () => {
		await signOut(auth);
	};

	return (
		<div>
			<div>
				<h3> Login </h3>
				<input
					// value={loginEmail}
					placeholder="Email..."
					onChange={(event) => {
						setLoginEmail(event.target.value);
					}}
				/>{" "}
				<input
					// value={loginPassword}
					placeholder="Password..."
					onChange={(event) => {
						setLoginPassword(event.target.value);
					}}
				/>
				<button onClick={login}>Login</button>
			</div>

			{/* <h4>User Logged In: {auth.currentUser || "no user"}</h4> */}
			<h4>User Logged In: {user ? user.email : "Not Logged In"}</h4>

			<button onClick={logout}>Log Out</button>
		</div>
	);
}

export default Login;
