import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// JSON firebase variables
import firebase_var from "./data/variables.json";

const firebaseConfig = firebase_var;

// initialize app
export const app = initializeApp(firebaseConfig);

// connect to database
export const db = getFirestore(app);

// Authentication
export const auth = getAuth(app);

// Signin with Google
export const gmailProvider = new GoogleAuthProvider();
