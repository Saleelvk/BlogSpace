import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import defaultAvatar from "../assets/images/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_7.avif";
import { MdDelete } from "react-icons/md";
import { api } from "./api";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

 
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const fetchComments = async () => {
    try {
      setLoading(true);
    
      const response = await api.get(`/comment/${postId}`);
      setComments(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments");
  
      setComments([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // Add a new comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Please log in to comment");
      return;
    }

    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      setLoading(true);
 
      await api.post(`/comment/${postId}`, 
      { text: newComment }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    

      setNewComment(""); 
      fetchComments(); 
      setError("");
    } catch (err) {
      console.error("Error adding comment:", err);
      setError(err.response?.data?.message || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  // Delete a comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      setLoading(true);

      await api.delete(`/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    

      // Remove the comment from state
      setComments(comments.filter((comment) => comment._id !== commentId));
      setError("");
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError(err.response?.data?.message || "Failed to delete comment");
    } finally {
      setLoading(false);
    }
  };

  // Like a comment
  const handleLikeComment = async (commentId) => {
    if (!token) {
      setError("Please log in to like comments");
      return;
    }

    try {
     
      await api.post(`/comment/${commentId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      

    
      fetchComments();
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mt-16 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex flex-col space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={
              token ? "Add a comment..." : "Please log in to comment"
            }
            disabled={!token || loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            rows="3"
          />

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={!token || loading}
            className="self-end px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {loading && comments.length === 0 ? (
          <div className="text-center text-gray-500">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="border-b border-gray-200 pb-6 last:border-0"
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                  {comment.user?.image ? (
                    <img
                      src={comment.user.image}
                      alt={comment.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-700 font-semibold">
                      {comment.user?.name ? (
                        comment.user.name.charAt(0).toUpperCase()
                      ) : (
                        <img
                          src={defaultAvatar}
                          alt="Default Avatar"
                          className="w-full h-full"
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Comment Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {comment.user?.name || "Anonymous"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>

                    {/* Delete button - show only if this is user's comment */}
                    {user && user.id === comment.user?._id && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    )}
                  </div>

                  {/* Comment text */}
                  <p className="mt-1 text-gray-800">{comment.text}</p>

                  {/* Like button */}
                  <div className="mt-2">
                    <button
                      onClick={() => handleLikeComment(comment._id)}
                      className="flex items-center text-gray-500 hover:text-blue-600 text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill={
                          comment.likes?.includes(user?.id)
                            ? "currentColor"
                            : "none"
                        }
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      {comment.likes?.length || 0}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
