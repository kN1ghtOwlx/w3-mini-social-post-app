import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json());

app.use("/api/users", userRoutes)

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("Server Started on Port: ", PORT)
    })
});