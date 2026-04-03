import User from "../models/User.js";
import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;
    
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
        }

        if (!token) {
        return res.status(401).json({ message: "Unauthorised" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in authMiddleware: ", error.message)
    }
}

export default authMiddleware;