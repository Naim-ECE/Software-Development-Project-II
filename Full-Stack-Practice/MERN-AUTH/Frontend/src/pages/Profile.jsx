import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const getAvatarUrl = () => {
    // If profilePicture exists and isn't empty, use it
    if (currentUser?.profilePicture) {
      return currentUser.profilePicture;
    }
    // Fallback: Generate initials avatar
    const name = currentUser?.username || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=96&bold=true`;
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 text-center my-4">
        Profile
      </h1>
      <div className="min-h-screen bg-gray-50 py-6">
        {/* Profile Form */}
        <form className="max-w-md mx-auto p-5 space-y-4 bg-white rounded-2xl shadow-lg">
          {/* Profile Image with hover effects */}
          <div className="relative group w-24 h-24 mx-auto">
            <img
              src={getAvatarUrl()}
              alt="Profile Image"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl group-hover:border-blue-400"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e) => {
                // Fallback
                const name = currentUser?.username || "User";
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=96&bold=true`;
              }}
            />
            {/* Hover overlay effect */}
            <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center cursor-pointer">
              <span className="opacity-0 group-hover:opacity-100 text-white text-[10px] font-semibold transition-all duration-500 transform group-hover:scale-100 scale-75">
                Change Photo
              </span>
            </div>
          </div>

          {/* Username input with hover effects */}
          <div className="relative group">
            <input
              type="text"
              value={currentUser?.username}
              className="block w-full p-2.5 pl-9 border-2 border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 text-sm">
              👤
            </span>
          </div>

          {/* Email input with hover effects */}
          <div className="relative group">
            <input
              type="email"
              value={currentUser?.email}
              className="block w-full p-2.5 pl-9 border-2 border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 text-sm">
              📧
            </span>
          </div>

          {/* Password input with hover effects */}
          <div className="relative group">
            <input
              type="password"
              placeholder="New Password"
              className="block w-full p-2.5 pl-9 border-2 border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 text-sm">
              🔒
            </span>
          </div>

          {/* Update button with hover effects */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-200 active:scale-95 transform text-sm cursor-pointer"
          >
            ✏️ Update Profile
          </button>
        </form>

        {/* Bottom Actions Section */}
        <div className="max-w-md mx-auto px-5 pb-5">
          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-gray-50 text-gray-500">
                Account Settings
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Delete Account Button */}
            <button className="flex-1 py-2.5 px-4 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-200 active:scale-95 transform flex items-center justify-center gap-2 group text-sm cursor-pointer">
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete Account
            </button>

            {/* Sign Out Button */}
            <button className="flex-1 py-2.5 px-4 bg-linear-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg transition-all duration-300 hover:from-gray-700 hover:to-gray-800 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200 active:scale-95 transform flex items-center justify-center gap-2 group text-sm cursor-pointer">
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
