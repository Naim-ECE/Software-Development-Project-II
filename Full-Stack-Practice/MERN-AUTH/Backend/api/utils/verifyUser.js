import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  console.log("🍪 Cookies received:", req.cookies); // Debug log
  const token = req.cookies.access_token;
  console.log("🔑 Token:", token ? "Present ✅" : "Missing ❌");
  if (!token) {
    return next(errorHandler(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Token is not valid!" });
    }
    req.user = user;
    next();
  });
};
