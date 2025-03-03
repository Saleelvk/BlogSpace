import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import defaultAvatar from "../assets/images/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_7.avif";
import blogs from "../assets/images/blog.png";
import CommentSection from "../Components/CommendSection"; // Import the comment section component
import { api, imgUrl } from "../Components/api";

function ReadingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
 
  // Decode the token to get the user ID
  let loggedInUserId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      loggedInUserId = decodedToken.id; // Adjust based on your token payload
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    api
      .get(`/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setPost(response.data))
      .catch((error) => {
        console.error("Error fetching post details:", error);
        setError("Failed to load post");
      });
  }, [id, token]);


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      await api.delete(`/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      navigate("/blog");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        `Failed to delete post (${err.response?.status || "unknown error"})`;
      setError(errorMessage);
      console.error("Error deleting post:", err);
      setIsDeleting(false);
    }
  };

  if (!post && !error) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/blog")}
        >
          Return to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header with Title, Edit & Delete Buttons - Mobile Friendly */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          {post.title}
        </h1>

        {loggedInUserId === post.author?._id && (
          <div className="flex gap-3 self-start">
            {/* Edit Button */}
            <button
              onClick={() => navigate(`/editpost/${id}`)}
              className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-md hover:bg-gray-700 transition"
            >
              Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300 transition"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>

      {/* Author Section */}
      <div className="flex items-center space-x-4 mt-4">
        {post.author?.image ? (
          <img
            src={post.author.image}
            alt={post.author.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300"
          />
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-gray-700 font-semibold">
            {post.author?.name ? (
              post.author.name.charAt(0).toUpperCase()
            ) : (
              <img
                src={defaultAvatar}
                alt="Default Avatar"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              />
            )}
          </div>
        )}
        <div>
          <p className="text-base sm:text-lg font-semibold text-gray-700">
            {post.author?.name || "Unknown"}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Published on {new Date(post.createdAt).toDateString()}
          </p>
        </div>
      </div>

      {/* Image */}
      {post?.image && (
        <div className="mt-6 sm:mt-8 overflow-hidden rounded-lg shadow-lg">
          <img
            src={`${imgUrl}${post.image}`}
            alt={post.title || "Blog Post Image"}
            className="w-full object-cover max-h-[300px] sm:max-h-[400px]" 
          />
        </div>
      )}

      {/* Content */}
      <div className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-800 leading-relaxed space-y-4 sm:space-y-6">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index} className="first-letter:text-lg sm:first-letter:text-xl first-letter:text-gray-900">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Comment Section */}
      <CommentSection postId={id} />
    </div>
  );
}

export default ReadingPage;
