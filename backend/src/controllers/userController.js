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

            const token = generateTokenAndSetCookies(newUser._id, res);
            res.status(201).json({
              _id: newUser._id,
              username: newUser.username,
              email: newUser.email,
              token // ✅ send token in response
            });
        } else {
            res.status(400).json({message: "Invalid user data!"})
        }

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in signupUser: ", error.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found!"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid password!!"})
        }

        const token = generateTokenAndSetCookies(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        })

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in loginUser: ", error.message)
    }
}

const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 1});
        res.status(200).json({message: "User logged out successfully"})
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in logoutUSer: ", error.message)
    }
}

const getMeUser = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in getMeUSer: ", error.message);
    }
}

export {signupUser, loginUser, logoutUser, getMeUser};