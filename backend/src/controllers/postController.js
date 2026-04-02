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

const getPost = async (req, res) => {
    try {
        const post = await Post.find().sort({createdAt: -1});
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in getPost: ", error.message);
    }
}

const likeUnlikePost = async (req, res) => {
    try {
        const {id: postId} = req.params;
        const userId = req.user.username;

        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({message: "Post not found!"})
        }

        const userLikedPost = post.likes.includes(userId);
        if(userLikedPost){
            await Post.updateOne({_id: postId}, {$pull: {likes: userId}});
            res.status(200).json({message: "Post unliked!"})
        } else{
            post.likes.push(userId);
            await post.save()
            res.status(500).json({message: "Post liked!"})
        }

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in likeUnlikePost: ", error.message);
    }
}

export {createPost, getPost, likeUnlikePost};