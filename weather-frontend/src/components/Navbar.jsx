import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user prefers dark mode
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md dark:bg-gray-900/95 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Weather App</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated && (
            <>
              <Link to="/" className="text-sm font-medium transition-colors hover:text-blue-500 relative group">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/history" className="text-sm font-medium transition-colors hover:text-blue-500 relative group">
                History
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300 shadow-sm hover:shadow"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              "☀️"
            ) : (
              "🌙"
            )}
          </button>
          
          {isAuthenticated ? (
            <button 
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Logout
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="px-4 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 font-medium transition-all duration-300">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-md">
                Sign Up
              </Link>
            </div>
          )}
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              "✕"
            ) : (
              "☰"
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 py-3 space-y-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  className="block text-sm font-medium transition-colors hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/history" 
                  className="block text-sm font-medium transition-colors hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  History
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center text-sm font-medium text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block text-sm font-medium transition-colors hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block text-sm font-medium transition-colors hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;