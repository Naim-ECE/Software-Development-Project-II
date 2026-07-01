import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.username) {
      dispatch(
        signInFailure({
          message: "Please enter all required fields",
        }),
      );
      return;
    }
    try {
      setIsLoading(true);
      const fetchRequest = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await fetchRequest.json();

      setIsLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      setError(false);
      navigate("/signin");
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4 p-3 max-w-lg mx-auto"
      >
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-4 rounded-lg uppercase font-semibold hover:opacity-95 cursor-pointer disabled:opacity-80 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 justify-center mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>

      <p className="text-red-700 mt-5 text-center">
        {error && "An error occurred while signing up."}
      </p>
    </>
  );
}
