import Post from "../models/Post.js";
import User from "../models/User.js";

const createPost = async (req, res) => {
    // res.send("Post created successfully!");
    try {
        const {text, imageUrl} = req.body;

        if(!text && !imageUrl){
            return res.status(400).json({message: "Either image or text is required!"});
        }

        const user = await User.findOne(req.user.userId);
        if(!user){
            return res.status(404).json({message: "User not found!"})
        }

        if(user._id.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Unauthorised User!!!"})
        }

        const newPost = await Post.create({
            username: req.user.username,
            text: text || null,
            imageUrl: imageUrl || null
        })

        res.status(201).json({message: "Post created successfully: ", newPost})

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in createPost: ", error.message);
    }
}

export {createPost};