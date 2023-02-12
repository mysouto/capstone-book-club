import { createContext, useState, useEffect } from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const logout = async () => {
		await signOut(auth);
	};

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				// user is signed in
				setUser(currentUser);
				console.log("signed in user ID: ", currentUser.uid);
			} else {
				console.log("User logged out");
				setUser(null);
			}
		});
	}, []);

	return (
		<UserContext.Provider value={{ user, logout }}>
			{children}
		</UserContext.Provider>
	);
};
