import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("Server Started on Port: ", PORT)
    })
});