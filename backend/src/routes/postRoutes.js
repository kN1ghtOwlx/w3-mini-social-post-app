import express from "express";
import {createPost} from "../controllers/postController.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);

export default router;