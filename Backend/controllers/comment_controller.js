const asyncHandler = require("express-async-handler");
const Comment = require("../models/commend_model");
const Post = require("../models/post_model");

// Add a comment
const addComment = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const { id } = req.params; // Post ID
    
    const post = await Post.findById(id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    
    const comment = await Comment.create({
        text,
        user: req.user._id, // Attach logged-in user
        post: id,
    });
    
    post.comments.push(comment._id);
    await post.save();
    
    res.status(201).json(comment);
});

// Get comments for a post
const getComments = asyncHandler(async (req, res) => {
    const { id } = req.params; // Post ID

    const comments = await Comment.find({ post: id }).populate("user", "name");
    res.status(200).json(comments);
});

// Delete a comment
// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params; // Comment ID
    
    const comment = await Comment.findById(id);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }
    
    // Ensure only the owner can delete
    if (comment.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    
    // Find the post this comment belongs to
    const post = await Post.findById(comment.post);
    if (post) {
        // Remove the comment ID from the post's comments array
        post.comments = post.comments.filter(
            commentId => commentId.toString() !== id.toString()
        );
        await post.save();
    }
    
    // Use deleteOne instead of remove
    await Comment.deleteOne({ _id: id });
    
    res.status(200).json({ message: "Comment deleted" });
});

module.exports = { addComment, getComments, deleteComment };
