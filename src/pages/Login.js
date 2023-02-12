import { useEffect, useState, useContext } from "react";
import { auth } from "../firebase-config";
import {
	signInWithEmailAndPassword,
	onAuthStateChanged, // trigerred every time there's a change in Auth state
	signOut,
} from "firebase/auth";

import { UserContext } from "../UserContext";

function Login() {
	const { user, setUser } = useContext(UserContext);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	// state for user, so user stays logged in page refresh
	// const [user, setUser] = useState({});

	// useEffect(() => {
	// 	onAuthStateChanged(auth, (currentUser) => {
	// 		if (currentUser) {
	// 			// user is signed in
	// 			setUser(currentUser);
	// 			console.log("signed in user ID: ", currentUser.uid);
	// 		} else {
	// 			console.log("User logged out");
	// 		}
	// 	});
	// }, []);

	const login = async () => {
		try {
			const userData = await signInWithEmailAndPassword(
				auth,
				loginEmail,
				loginPassword
			);
			console.log("logged in user: ", user);
			setUser(userData);
		} catch (error) {
			alert(error.message); // TODO: error handling on the frontend
		}
	};

	const logout = async () => {
		// call server
		await signOut(auth);
		// change user state in provider
		setUser(null);
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
				{/* <button onClick={login}>Login</button> */}
			</div>

			<pre>{JSON.stringify(user, null, 2)}</pre>
			{user ? (
				<button onClick={logout}>logout</button>
			) : (
				<button onClick={login}>context Login</button>
			)}

			{/* <h4>User Logged In: {auth.currentUser || "no user"}</h4> */}
			{/* <h4>User Logged In: {user ? user.email : "Not Logged In"}</h4> */}

			{/* <button onClick={logout}>Log Out</button> */}
		</div>
	);
}

export default Login;
