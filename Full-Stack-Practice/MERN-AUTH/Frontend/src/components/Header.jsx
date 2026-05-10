import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="bg-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-gray-800 p-4">Auth App</h1>
          </Link>
          <ul className="flex gap-4 p-4">
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
              <li className="text-gray-600 hover:text-gray-800 cursor-pointer">
                Sign In
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
