import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // next(errorHandler(500, "Error creating user"));
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid password"));
    }
    // res.status(200).json({ message: "User signed in successfully" });

    const { password: hashedPassword, ...rest } = user._doc;
    const tokenExpiry = process.env.JWT_EXPIRES_IN || "1h";
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: tokenExpiry,
    });
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
