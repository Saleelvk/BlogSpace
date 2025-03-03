import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, LogIn, AlertCircle } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import image from '../assets/images/AI-Profile-Picture.jpg';
import { api } from './api';
import { useAuth } from '../Context/AuthProvider';

const AuthPage = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const dataToSend = isLogin ? { email: formData.email, password: formData.password } : formData;

      const response = await api.post(endpoint, dataToSend);

      if (response.data) {
        login(response.data.user, response.data.token);
        navigate('/');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        
{/* Left Side - Branding */}
<div className="hidden md:block md:w-1/2 bg-indigo-600 p-16 relative">
  <div className="absolute inset-0 bg-indigo-700 opacity-20"></div>
  <div className="relative z-10 h-full flex flex-col justify-between items-center gap-8">
    
    {/* Header Text */}
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white">Welcome to BlogSpace</h1>
      <p className="text-indigo-200 mt-8 text-lg">
        Join thousands of users and start your journey today.
      </p>
    </div>

    {/* Logo Section */}
    <NavLink 
      to="/" 
      className="text-7xl font-bold bg-white px-12 rounded-full py-12 shadow-lg hover:scale-105 transition-transform"
    >
      B<span className="text-indigo-600">S</span>
    </NavLink>

    {/* Testimonial Box */}
    <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm text-center w-3/4 shadow-lg">
      <p className="text-white font-semibold mb-4 text-lg">What our users say</p>
      <p className="text-indigo-100 italic text-base">
        "This platform transformed how I work. The interface is intuitive and the features are exactly what I needed."
      </p>
      
      {/* User Info */}
      <div className="flex items-center justify-center mt-6">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-indigo-300">
          <img className="object-cover w-full h-full" src={image} alt="User" />
        </div>
        <div className="ml-4">
          <p className="text-white font-medium text-lg">Sarah Johnson</p>
          <p className="text-indigo-200 text-sm">Product Designer</p>
        </div>
      </div>
    </div>

  </div>
</div>


{/* Right Side - Form */}
<div className="max-w-md mx-auto my-12 p-8  border rounded-2xl shadow-xl bg-white">
  {/* Title */}
  <h2 className="text-3xl font-bold text-center text-gray-800 drop-shadow-sm">
    {isLogin ? "Sign In" : "Sign Up"}
  </h2>

  {/* Form */}
  <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
    {!isLogin && (
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        required
      />
    )}

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Email"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      required
    />

    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Password"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      required
    />

    {/* Submit Button */}
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out disabled:opacity-70"
    >
      {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
    </button>
  </form>

  {/* Toggle Sign in / Sign up */}
  <div className="text-center mt-6">
    <p className="text-gray-700 text-lg">
      {isLogin ? "Don't have an account?" : "Already have an account?"}
      <button
        type="button"
        onClick={toggleForm}
        className="ml-1 text-indigo-600 font-semibold hover:underline transition-all"
      >
        {isLogin ? "Sign up" : "Sign in"}
      </button>
    </p>
  </div>
</div>

      </div>
    </div>
  );
};

export default AuthPage;
