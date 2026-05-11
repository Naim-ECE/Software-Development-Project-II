import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { test } from "../controllers/user.controller.js";
dotenv.config();

const router = express.Router();

router.get("/", test);

export default router;