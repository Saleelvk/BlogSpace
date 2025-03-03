const mongoose = require("mongoose");
const Post = require("../models/post_model");

const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().populate("author", "name"); 
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


const togglePostVisibility = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }
    
   
        post.visibility = post.visibility === "private" ? "public" : "private";
        await post.save();
    
        res.status(200).json({ message: "Visibility updated", visibility: post.visibility });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
};

const ViewCount = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        const userId = req.user.id; 
        console.log(userId) 
    
        
        if (!post.viewedBy.includes(userId)) {
          post.views += 1;
          post.viewedBy.push(userId);
          await post.save();
        }
    
        res.json({ message: "View count updated", views: post.views });
      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
  }

 
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate({
            path: "author",
            select: "name email"
        });

        if (!post) return res.status(404).json({ message: "Post not found" });

       
        if (post.visibility === "private" && (!req.user || post.author._id.toString() !== req.user._id.toString())) {
            return res.status(403).json({ message: "This post is private" });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createPost = async (req, res) => {
    try {
        const { title, content, visibility } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userId = new mongoose.Types.ObjectId(req.user._id);   
        const imageUrl = req.file ? `/uploads/blogs/${req.file.filename}` : null; 

        const newPost = new Post({ 
            title, 
            content, 
            author: userId, 
            visibility: visibility || "public",
            image: imageUrl 
        });
   
        await newPost.save();
        const savedPost = await newPost.populate("author", "name email");
        console.log("Post saved:", savedPost);  

        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

 
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this post" });
        }

        const imageUrl = req.file ? `/uploads/blogs/${req.file.filename}` : post.image;

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { ...req.body, image: imageUrl }, 
            { new: true }
        )
        .populate({ path: "author", select: "name email" });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "you Can't delete this post " });
        }

        await post.deleteOne();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    togglePostVisibility,
    ViewCount
};
