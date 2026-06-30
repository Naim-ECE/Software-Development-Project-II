import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          profilePicture: result.user.photoURL,
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success) {
        dispatch(signInSuccess(data.user));
        navigate("/");
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (err) {
      console.error("Google Sign-In failed:", err);
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="bg-linear-to-r from-green-500 via-orange-500 to-gray-500 text-white p-4 rounded-lg uppercase font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:opacity-90 hover:shadow-lg"
      >
        Continue with Google
      </button>
    </>
  );
}
