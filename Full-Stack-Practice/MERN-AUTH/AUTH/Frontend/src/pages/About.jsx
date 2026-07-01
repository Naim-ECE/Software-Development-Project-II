// pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-4">
            About{" "}
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Us
            </span>
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-8 sm:p-12">
            {/* Mission Section */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎯</span>
                <h2 className="text-2xl font-bold text-gray-800">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg pl-12">
                To provide developers with a robust, secure, and beautiful
                authentication solution that makes user management effortless
                while maintaining the highest standards of security and user
                experience.
              </p>
            </motion.div>

            <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent my-8"></div>

            {/* What We Offer Section */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">✨</span>
                <h2 className="text-2xl font-bold text-gray-800">
                  What We Offer
                </h2>
              </div>
              <div className="pl-12 grid gap-4">
                {[
                  { icon: "🔐", text: "Secure JWT-based authentication" },
                  { icon: "📧", text: "Email and Google OAuth 2.0 sign-in" },
                  { icon: "🛡️", text: "Protected routes and private pages" },
                  { icon: "🎨", text: "Modern, responsive UI with animations" },
                  {
                    icon: "⚡",
                    text: "Redux state management with persistence",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent my-8"></div>

            {/* Tech Stack Section */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🛠️</span>
                <h2 className="text-2xl font-bold text-gray-800">Tech Stack</h2>
              </div>
              <div className="pl-12 flex flex-wrap gap-3">
                {[
                  "React",
                  "Redux",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "Tailwind CSS",
                  "JWT",
                  "bcryptjs",
                  "Cloudinary",
                ].map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-200 rounded-full text-sm font-medium text-gray-700 hover:from-blue-100 hover:to-purple-100 hover:text-blue-600 transition-all duration-300 cursor-default shadow-sm hover:shadow-md"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent my-8"></div>

            {/* CTA Section */}
            <motion.div variants={fadeInUp} className="text-center">
              <p className="text-gray-600 text-lg mb-6">
                Ready to experience secure authentication?
              </p>
              <Link
                to="/signin"
                className="inline-flex items-center px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get Started Now
                <svg
                  className="w-5 h-5 ml-2"
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
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center text-gray-400 text-sm mt-8"
        >
          Built with ❤️ using React, Node.js, and MongoDB
        </motion.p>
      </div>
    </div>
  );
};

export default About;
