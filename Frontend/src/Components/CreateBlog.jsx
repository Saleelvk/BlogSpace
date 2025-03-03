import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from './api';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      const token = localStorage.getItem('token'); 
      
      const response = await api.post('/post/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        } 
      });
      

      setSuccess(true);
      setTitle('');
      setContent('');
      setImage(null);
      // Reset file input
      const fileInput = document.getElementById('image-upload');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog post');
      console.error('Error creating blog post:', err);
    } finally {
      setLoading(false);
    }
    navigate("/blog");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white my-20 rounded-lg shadow-md">
    {/* Back Button */}
    <button
      onClick={() => navigate("/blog")}
      className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
    >
      ← Back to Blogs
    </button>
  
    <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
  
    {error && (
      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
        {error}
      </div>
    )}
  
    {success && (
      <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
        Blog post created successfully!
      </div>
    )}
  
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
  
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
  
      <div className="mb-6">
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image (Optional)
        </label>
        <input
          type="file"
          id="image-upload"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          accept="image/*"
        />
      </div>
  
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Creating Post...' : 'Create Post'}
      </button>
    </form>
  </div>
  
  );
}

export default CreateBlog;
