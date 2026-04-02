import express from "express";
import {commentToPost, createPost, getPost, likeUnlikePost} from "../controllers/postController.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPost);
router.post("/create", authMiddleware, createPost);
router.post("/like/:id", authMiddleware, likeUnlikePost);
router.post("/comment/:id", authMiddleware, commentToPost)

export default router;