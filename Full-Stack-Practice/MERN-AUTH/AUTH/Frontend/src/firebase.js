// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-64dd7.firebaseapp.com",
  projectId: "mern-auth-64dd7",
  storageBucket: "mern-auth-64dd7.firebasestorage.app",
  messagingSenderId: "615068554308",
  appId: "1:615068554308:web:520ca3330a0c9e1dff9811",
  measurementId: "G-10NTLRY4K1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

export { app, auth };
export default app;