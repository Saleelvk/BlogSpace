const BlogCard = ({ post, likes, views, handleLike, handleView, toggleVisibility }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const currentUserId = user?._id;

  const isAuthor = post.author?._id?.toString() === currentUserId?.toString();

  const handleReadMore = (e) => {
    e.preventDefault();
    handleView(post._id);
    navigate(`/post/${post._id}`);
  };

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
      {/* Image */}
      <div className="relative overflow-hidden border-b">
        <img
          src={`${imgUrl}${post.image}`}
          alt={post.title}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 justify-between">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 transition-colors line-clamp-2">
          {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
        </h3>

        {/* Author & Date */}
        <div className="flex justify-between items-center text-gray-600 text-sm mt-2">
          <div className="flex items-center gap-2">
            <span className="bg-gray-200 p-2 rounded-full flex items-center justify-center w-8 h-8 text-gray-800 font-semibold">
              {post.author?.name.charAt(0).toUpperCase()}
            </span>
            <span className="text-sm font-medium">{post.author?.name || "Unknown Author"}</span>
          </div>
          <div className="text-xs text-gray-500">{new Date(post.createdAt).toDateString()}</div>
        </div>

        {/* Visibility Toggle for Author - Now prominently displayed at top */}
        {isAuthor && (
          <div className="flex items-center justify-between mt-3 mb-3 p-2 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">
              {post.visibility === "private" ? "Private Post" : "Public Post"}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={post.visibility === "private"}
                onChange={() => toggleVisibility(post._id)}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                post.visibility === "private" ? "bg-green-500" : "bg-gray-300"
              }`}>
                <div className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 top-1 ${
                  post.visibility === "private" ? "right-1" : "left-1"
                }`}></div>
              </div>
            </label>
          </div>
        )}

        <div className="flex justify-between items-center pt-4 mt-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLike(post._id)}
              className={`flex items-center gap-1 text-sm font-medium transition-all ${
                likes[post._id]?.liked ? "text-red-500" : "text-gray-600"
              }`}
            >
              <Heart /> {likes[post._id]?.count || 0}
            </button>

            <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
              <Eye /> {views || 0}
            </div>
          </div>

          <a
            href={`/post/${post._id}`}
            onClick={handleReadMore}
            className="text-black text-sm font-medium flex items-center transition-all hover:text-blue-800"
          >
            Read More <ArrowRight size={18} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};
