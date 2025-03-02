import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import ReadingPage from "./pages/ReadingPage";
import AuthPage from "./Components/AuthPage";
import CreateBlog from "./Components/CreateBlog";
import Editpost from "./Components/Editpost";
import UserProfile from './Components/UserProfile';
import { AuthProvider } from './Context/AuthProvider';

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (  
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar /> 
        {isHome && <Hero />} 
        <main className="flex-1"> 
          <Routes>
            <Route path="/" element={isHome ? null : <Blogs />} />
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blogs />} /> 
            <Route path="createBlog" element={<CreateBlog />} />
            <Route path="profile" element={<UserProfile/>} />
            <Route path="editpost/:id" element={<Editpost/>} />
            <Route path="/post/:id" element={<ReadingPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<AuthPage/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
