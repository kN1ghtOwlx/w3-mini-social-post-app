import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateTokenAndSetCookies from "../utils/helpers/generateTokenAndSetCookies.js";

const signupUser = async (req, res) => {
    // res.send("Signed up succesfully!");
    try {
        const {username, email, password} = req.body;
        const user = await User.findOne({$or: [{username}, {email}]});

        if(user) {
            return res.status(400).json({message: "User already Exists!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        if(newUser){

            generateTokenAndSetCookies(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            });
        } else {
            res.status(400).json({message: "Invalid user data"})
        }

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in signupUser: ", err.message)
    }
}

export {signupUser};