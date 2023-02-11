import { auth } from "../firebase-config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged, // trigerred every time there's a change in Auth state
	signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

function SignUp() {
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	// state for user, so user stays logged in page refresh
	const [user, setUser] = useState({});

	// Toggle between LOGGED IN AND SIGN UP
	// const monitorAuthState = async () => {
	// 	onAuthStateChanged(auth, (user) => {
	// 		if (user) {
	// 			console.log(user);
	// 			showApp();
	// 			showLoginState(user);

	// 			hideLoginError();
	// 		} else {
	// 			showLoginForm();
	// 			lblAuthState.innerHTML = "You're not logged in.";
	// 		}
	// 	});
	// };

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				// user is signed in
				setUser(currentUser);
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
			alert(error.message);
		}
	};

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
				<h3>Register User / Sign Up</h3>
				<input
					placeholder="Email..."
					onChange={(event) => {
						setRegisterEmail(event.target.value);
					}}
					value={registerEmail}
				/>{" "}
				<input
					placeholder="Password..."
					onChange={(event) => {
						setRegisterPassword(event.target.value);
					}}
					value={registerPassword}
				/>
				<button onClick={register}>Create User</button>
			</div>

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
				<button onClick={login}>Login</button>
			</div>

			<h4>User Logged In: {user ? user.email : "Not Logged In"}</h4>

			<button onClick={logout}>Sign Out</button>
		</div>
	);
}

export default SignUp;
