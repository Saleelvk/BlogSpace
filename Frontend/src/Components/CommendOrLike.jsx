import React, { useState, useEffect } from "react";
import { Calendar, MessageSquare, Eye, Clock, ArrowRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { api, imgUrl } from "./api";

const ModernPopularPostsWidget = () => {
  const [activeTab, setActiveTab] = useState("viewed");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await api.get("/post/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        

        if (response.data && Array.isArray(response.data)) {
          const filteredPosts = response.data.filter(
            (post) => post.visibility !== "private"
          );
          setPosts(filteredPosts);
        } else {
          setPosts([]);
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  
  const getMostViewedPosts = () => {
    return [...posts]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 6);
  };

  const getMostCommentedPosts = () => {
    return [...posts]
      .sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0))
      .slice(0, 6);
  };

  const handleViewCount = async (e, postId) => {
    e.preventDefault(); 
    const token = localStorage.getItem("token");

    try {
     
      console.log("Updating view count for post:", postId);

      const response = await api.post(
        `/post/${postId}/view`, 
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      

      console.log("View count response:", response.data);

      
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, views: response.data.views } : post
        )
      );

     
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error("Failed to update view count", error);
      
      navigate(`/post/${postId}`);
    }
  };

  
  const activePosts =
    activeTab === "viewed" ? getMostViewedPosts() : getMostCommentedPosts();


  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/api/placeholder/600/400";
    
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    
    const formattedPath = imagePath.startsWith("/")
      ? imagePath
      : `/${imagePath}`;
    return `${imgUrl}${formattedPath}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-6xl px-4 sm:px-6 md:px-0 mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Popular Content</h2>
        </div>
        <div className="text-center py-12">Loading popular posts...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-6xl px-4 sm:px-6 md:px-0 mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Popular Content</h2>
        </div>
        <div className="text-center py-6 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl px-4 sm:px-6 md:px-0 mx-auto">
      {/* Heading & Tabs */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-black bg-clip-text text-transparent mb-4 md:mb-0">
          Popular Content
        </h2>

        {/* Tab Buttons */}
        <div className="flex bg-black rounded-full overflow-hidden">
          {["viewed", "commented"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 sm:px-6 text-xs sm:text-sm rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? "bg-white text-black font-medium shadow-md"
                  : "text-white hover:bg-gray-900"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {tab === "viewed" ? (
                  <Eye size={16} />
                ) : (
                  <MessageSquare size={16} />
                )}
                <span className="hidden sm:inline">
                  {tab === "viewed" ? "Most Viewed" : "Most Commented"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-3">
        {activePosts.length === 0 ? (
          <div className="text-center py-8">No posts available</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {activePosts.map((post) => (
              <div
                key={post._id}
                className="group relative flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden border-b">
                  <img
                    src={getImageUrl(post.image)}
                    alt={post.title || "Blog post"}
                    className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="font-semibold text-base sm:text-lg text-black group-hover:text-black transition-colors line-clamp-2">
                    {post.title || "Untitled Post"}
                  </h3>

                  {/* Author Info */}
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-700 mt-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-black font-bold text-lg">
                      {post.author?.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <span className="text-black font-medium">
                      {post.author?.name || "Unknown Author"}
                    </span>
                    <span>{post.readTime || 5} min read</span>
                  </div>

                  {/* Stats & Button */}
                  <div className="flex justify-between items-center pt-4 mt-auto">
                    <div className="flex items-center text-black font-medium">
                      {activeTab === "viewed" ? (
                        <>
                          <Eye size={16} className="mr-1" />
                          {(post.views || 0).toLocaleString()}
                        </>
                      ) : (
                        <>
                          <MessageSquare size={16} className="mr-1" />
                          {post.comments?.length || 0}
                        </>
                      )}
                    </div>

                    <a
                      href={`/post/${post._id}`}
                      onClick={(e) => handleViewCount(e, post._id)}
                      className="text-black text-xs sm:text-sm font-medium flex items-center group-hover:text-black transition-all"
                    >
                      Read More
                      <ArrowRight
                        size={16}
                        className="ml-1 group-hover:translate-x-1 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View All Button */}
      <div className="mt-6 sm:mt-8 text-center">
        <NavLink
          to="/blog"
          className="px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium text-white bg-black rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
          View All Posts
        </NavLink>
      </div>
    </div>
  );
};

export default ModernPopularPostsWidget;
