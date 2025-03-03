"use client"

import { useState, useRef, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { RxHamburgerMenu } from "react-icons/rx"
import { useAuth } from "../Context/AuthProvider"
import { Search, ChevronDown, User, LogOut, Settings } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const isLoggedIn = isAuthenticated || Boolean(localStorage.getItem("token"))

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 bg-white shadow-md z-10 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold tracking-tight transition-transform hover:scale-105">
          Blog<span className="text-indigo-600">Space</span>
        </NavLink>

       
        <nav className="hidden md:flex space-x-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-medium hover:text-indigo-600 relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full transition-colors duration-300 ${
                  isActive ? "text-indigo-600 after:w-full" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

     
        <div className="flex items-center space-x-5">
    

          {isLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center space-x-2 group"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:shadow-indigo-200 group-hover:shadow-lg">
                  <span className="font-semibold text-lg">{user?.name?.charAt(0).toUpperCase() || "U"}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl py-2 z-20 border border-gray-100 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-top-5">


                  <NavLink
                    to="/profile"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Your Profile
                  </NavLink>


                  <div className="border-t border-gray-100 mt-1"></div>

                  <button
                    onClick={() => {
                      logout()
                      setIsProfileOpen(false)
                      navigate("/")
                    }}
                    className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-0.5"
            >
              Log in
            </NavLink>
          )}


          <button
            className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <RxHamburgerMenu className="text-2xl" />
          </button>
        </div>
      </div>

 
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-5">
          <ul className="container mx-auto px-4 py-3 space-y-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `block py-3 px-3 rounded-lg font-medium transition-colors ${
                      isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            {!isLoggedIn && (
              <li className="pt-2 mt-2 border-t border-gray-100">
                <NavLink
                  to="/login"
                  className="block py-3 px-3 font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Navbar

