// import { auth } from "../firebase-config";
// import {
// 	createUserWithEmailAndPassword,
// 	signInWithEmailAndPassword,
// 	onAuthStateChanged, // trigerred every time there's a change in Auth state
// 	signOut,
// } from "firebase/auth";
// import { useEffect, useState } from "react";

// // import Login from "../pages/Login";
// // import SignUp from "../pages/SignUp";

// function AuthoState() {
// 	// const [registerEmail, setRegisterEmail] = useState("");
// 	// const [registerPassword, setRegisterPassword] = useState("");
// 	const [loginEmail, setLoginEmail] = useState("");
// 	const [loginPassword, setLoginPassword] = useState("");

// 	// state for user, so user stays logged in page refresh
// 	const [user, setUser] = useState({});

// 	// Toggle between LOGGED IN AND SIGN UP
// 	// const monitorAuthState = async () => {
// 	// 	onAuthStateChanged(auth, (user) => {
// 	// 		if (user) {
// 	// 			console.log(user);
// 	// 			showApp();
// 	// 			showLoginState(user);

// 	// 			hideLoginError();
// 	// 		} else {
// 	// 			showLoginForm();
// 	// 			lblAuthState.innerHTML = "You're not logged in.";
// 	// 		}
// 	// 	});
// 	// };

// 	useEffect(() => {
// 		onAuthStateChanged(auth, (currentUser) => {
// 			if (currentUser) {
// 				// user is signed in
// 				setUser(currentUser);
// 				console.log("signed in user ID: ", currentUser.uid);
// 			} else {
// 				console.log("User signed out");
// 			}
// 		});
// 	}, []);

// 	// const register = async () => {
// 	// 	try {
// 	// 		const user = await createUserWithEmailAndPassword(
// 	// 			auth,
// 	// 			registerEmail,
// 	// 			registerPassword
// 	// 		);
// 	// 		console.log(user);
// 	// 	} catch (error) {
// 	// 		alert(error.message);
// 	// 	}
// 	// };

// 	const login = async () => {
// 		try {
// 			const user = await signInWithEmailAndPassword(
// 				auth,
// 				loginEmail,
// 				loginPassword
// 			);
// 			console.log(user);
// 		} catch (error) {
// 			alert(error.message); // TODO: error handling on the frontend
// 		}
// 	};

// 	const logout = async () => {
// 		await signOut(auth);
// 	};

// 	return (
// 		<div>
// 			<Login
// 				setLoginEmail={setLoginEmail}
// 				setLoginPassword={setLoginPassword}
// 				user={user}
// 				login={login}
// 				logout={logout}
// 			></Login>

// 			<SignUp register={register}></SignUp>
// 		</div>
// 	);
// }

// export default AuthoState;
