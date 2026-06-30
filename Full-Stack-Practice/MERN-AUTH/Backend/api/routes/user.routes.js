import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
dotenv.config();

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);

export default router;
