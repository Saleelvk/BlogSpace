const express = require("express");
const { addComment, getComments, deleteComment } = require("../controllers/comment_controller");
const { likeComment } = require("../controllers/like_controller");
const { protect } = require("../middleware/auth_middleware");
 
const router = express.Router();

router.post("/:id", protect, addComment); 
router.get("/:id", getComments); 
router.delete("/:id", protect, deleteComment); 
router.post("/:id/like", protect, likeComment); 

module.exports = router;
