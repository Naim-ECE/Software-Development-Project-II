import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const [isAnimating, setIsAnimating] = useState(false);
  const [imageError, setImageError] = useState(false);
  const prevUserRef = useRef(null);

  useEffect(() => {
    if (currentUser?.profilePicture !== prevUserRef.current?.profilePicture) {
      setIsAnimating(true);
      setImageError(false);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
    prevUserRef.current = currentUser;
  }, [currentUser]);

  const getInitials = (username) => {
    if (!username) return "U";
    return username.charAt(0).toUpperCase();
  };

  return (
    <>
      <div className="bg-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-gray-800 p-4">Auth App</h1>
          </Link>
          <ul className="flex gap-4 p-4 items-center">
            <Link to="/">
              <li className="text-gray-600 hover:text-gray-800 cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="text-gray-600 hover:text-gray-800 cursor-pointer">
                About
              </li>
            </Link>
            <Link to="/signin">
              {currentUser ? (
                <div
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 transition-all duration-300 ${
                    isAnimating ? "scale-0 opacity-0" : "scale-100 opacity-100"
                  }`}
                >
                  {!imageError ? (
                    <img
                      src={currentUser?.profilePicture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {currentUser?.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              ) : (
                <li className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Sign In
                </li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
