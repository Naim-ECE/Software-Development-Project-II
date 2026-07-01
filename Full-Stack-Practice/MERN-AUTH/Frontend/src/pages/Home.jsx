// pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"; // npm install framer-motion

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden"
      >
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight">
                Welcome to{" "}
                <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Auth App
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
            >
              The ultimate authentication solution for your React applications.
              Secure, fast, and beautifully designed.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              {currentUser ? (
                <Link
                  to="/profile"
                  className="group inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <span>Go to Profile</span>
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="group inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                  <Link
                    to="/about"
                    className="group inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-gray-700 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-blue-400"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Why Choose{" "}
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Auth App
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🔒",
              title: "Secure Authentication",
              description:
                "State-of-the-art security with JWT tokens, encrypted passwords, and secure cookie storage.",
            },
            {
              icon: "🚀",
              title: "Lightning Fast",
              description:
                "Optimized for performance with React, Redux, and modern web technologies.",
            },
            {
              icon: "🎨",
              title: "Beautiful UI",
              description:
                "Stunning, responsive design with smooth animations and intuitive user experience.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "10K+", label: "Active Users" },
            { number: "99.9%", label: "Uptime" },
            { number: "24/7", label: "Support" },
            { number: "5★", label: "Rating" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
