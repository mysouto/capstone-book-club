import { useState, useContext } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

import { UserContext } from "../UserContext";

function Login() {
	const { user, logout } = useContext(UserContext);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
			console.log("logged in user: ", user);
		} catch (error) {
			alert(error.message); // TODO: error handling on the frontend
		}
	};

	return (
		<div>
			<h3> Login </h3>
			<input
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
				<button onClick={logout}>logout</button>
			) : (
				<button onClick={login}>context Login</button>
			)}
		</div>
	);
}

export default Login;
