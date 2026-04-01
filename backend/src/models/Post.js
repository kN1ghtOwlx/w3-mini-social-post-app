import { text } from "express";
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    username: String,
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    imageUrl: {
        type: String
    },
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [commentSchema],
        default: []
    }
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;