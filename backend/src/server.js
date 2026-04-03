import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001

app.use(
    cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes)

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("Server Started on Port: ", PORT)
    })
});