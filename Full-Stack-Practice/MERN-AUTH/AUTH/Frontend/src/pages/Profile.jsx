import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { cookies } from "../utils/cookies.js";
import {
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  signInStart,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const dispatch = useDispatch();

  // 🔥 NEW: State for form fields
  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);

    handleImageUpload(file);
  };

  const handleImageUpload = async (file) => {
    try {
      setUploading(true);
      setError("");
      setUploadSuccess(false);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      );

      console.log("🔥 Uploading to Cloudinary...");
      console.log("Cloud Name:", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      console.log(
        "Upload Preset:",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );

      if (!response.ok) {
        const errorData = await response.json();
        // console.error("Upload failed:", errorData);
        throw new Error(errorData.error?.message || "Upload failed");
      }

      const data = await response.json();
      console.log("✅ Upload successful! Image URL:", data.secure_url);

      setImage(data.secure_url);
      setUploadSuccess(true);
      setUploading(false);
      alert("✅ Image uploaded successfully! Check the console for URL.");
    } catch (error) {
      // console.error("❌ Upload error:", error);
      setError(error.message || "Failed to upload image");
      setUploading(false);
      setUploadSuccess(false);
    }
  };

  const getAvatarUrl = () => {
    if (image) {
      return image;
    }
    if (currentUser?.profilePicture) {
      return currentUser.profilePicture;
    }
    const name = currentUser?.username || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=96&bold=true`;
  };

  // 🔥 NEW: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);
      setError("");

      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password || undefined,
          profilePicture: image || currentUser?.profilePicture,
        }),
      });

      const data = await response.json();
      if (response.status === 401) {
        // 🔥 Handle unauthorized - clear cookie and redirect to login
        cookies.delete("access_token");
        alert("Your session has expired. Please sign in again.");
        window.location.href = "/signin";
        return;
      }
      // console.log("Update response:", data);

      if (data.success) {
        dispatch(updateUserSuccess(data.user));
        alert("✅ Profile updated successfully!");
        setPassword("");
        setUploadSuccess(true);
      } else {
        setError(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update profile");
    } finally {
      // dispatch(updateUserFailure(error.message || "Failed to update profile"));
      setUploading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 401) {
        cookies.delete("access_token");
        alert("Your session has expired. Please sign in again.");
        navigate("/signin");
        return;
      }
      if (data.success) {
        alert("✅ Account deleted successfully!");
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message || "Failed to delete account"));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200 && data.success) {
        alert("✅ Signed out successfully!");
        dispatch(signOut());
        navigate("/signin");
      } else {
        alert("❌ Failed to sign out. Please try again.");
      }
    } catch (error) {
      console.error("Sign out error:", error);
      alert("❌ An error occurred while signing out. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 text-center my-4">
        Profile
      </h1>
      <div className="min-h-screen bg-gray-50 py-6">
        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-5 space-y-4 bg-white rounded-2xl shadow-lg"
        >
          {/* Profile Image with hover effects */}
          <div className="relative group w-24 h-24 mx-auto">
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <img
              src={getAvatarUrl()}
              alt="Profile Image"
              className={`w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl group-hover:border-blue-400 ${
                uploading ? "opacity-50" : ""
              }`}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e) => {
                const name = currentUser?.username || "User";
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=96&bold=true`;
              }}
            />

            {uploading && (
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
              </div>
            )}

            {uploadSuccess && !uploading && (
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}

            <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center cursor-pointer">
              <span
                className="opacity-0 group-hover:opacity-100 text-white text-[10px] font-semibold transition-all duration-500 transform group-hover:scale-100 scale-75"
                onClick={() => fileRef.current.click()}
              >
                {uploading ? "Uploading..." : "Change Photo"}
              </span>
            </div>
          </div>

          {error && (
            <div className="text-center">
              <p className="text-red-500 text-xs">{error}</p>
            </div>
          )}
          {uploadSuccess && !uploading && (
            <div className="text-center">
              <p className="text-green-500 text-xs">
                ✅ Image uploaded successfully!
              </p>
            </div>
          )}

          {/* 🔥 FIXED: Username input with proper onChange */}
          <div className="relative group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full p-2.5 pl-9 border-2 border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 text-sm">
              👤
            </span>
          </div>

          {/* 🔥 FIXED: Email input with proper onChange */}
          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-2.5 pl-9 border-2 border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 text-sm">
              📧
            </span>
          </div>

          {/* 🔥 FIXED: Password input with proper onChange */}
          <div className="relative group">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-2.5 pl-9 border-2 border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 text-sm">
              🔒
            </span>
          </div>

          {/* Update button with hover effects */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-200 active:scale-95 transform text-sm cursor-pointer disabled:opacity-50"
            disabled={uploading}
          >
            ✏️ Update Profile
          </button>
        </form>

        {/* Bottom Actions Section */}
        <div className="max-w-md mx-auto px-5 pb-5">
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

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 py-2.5 px-4 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-200 active:scale-95 transform flex items-center justify-center gap-2 group text-sm cursor-pointer"
              onClick={handleDeleteAccount}
            >
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

            <button
              className="flex-1 py-2.5 px-4 bg-linear-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg transition-all duration-300 hover:from-gray-700 hover:to-gray-800 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200 active:scale-95 transform flex items-center justify-center gap-2 group text-sm cursor-pointer"
              onClick={handleSignOut}
            >
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
