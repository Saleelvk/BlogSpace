import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { api, imgUrl } from "./api";

function FeaturedArticles() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get("/post/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPosts(response.data.reverse().slice(0, 3)); 
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [token]);

  return (
    <section className="py-20 bg-gray-50 ">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          Your Latest blogs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <NavLink to={`/post/${post._id}`} className="block" key={post._id}>
              <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full">
                <img
                  src={
                    post.image
                      ? `${imgUrl}${post.image}`
                      : "/api/placeholder/600/400"
                  }
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{post.description}</p>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 flex justify-center items-center rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <p className=" text-lg font-semibold ">
                        {post.author?.name.charAt(0).toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        {post.author?.name || "Unknown Author"}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center"></p>
                    </div>
                  </div>
                </div>
              </article>
            </NavLink>
          ))}
        </div>

        <div className="text-center mt-12">
          <NavLink
            to="/blog"
            className="inline-block px-6 py-3 border border-black text-black font-medium rounded-md hover:bg-black hover:text-white transition-colors"
          >
            View All Articles
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default FeaturedArticles;
