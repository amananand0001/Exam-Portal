import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeMenu = () => {
    setIsSidebarOpen(false);
  };

  return (
    <header className="text-white relative z-50">
      {/* Header Top */}
      <div className="py-2 text-xs text-teal-800" style={{ backgroundColor: '#EBF7F5' }}>
        <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/Facebook.svg" alt="Facebook" className="w-5 h-5" />
            <img src="/Instagram.svg" alt="Instagram" className="w-5 h-5" />
          </div>
          <div className="flex justify-end space-x-5">
            <span>info@nursingexamportal.com</span>
            <span>STUDENTS</span>
            <span>FACULTY</span>
            <span>ALUMNI</span>
            <span>SUPPORT@NURSINGEXAMPORTAL.COM</span>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <nav>
        <div className="max-w-7xl mx-auto px-7 flex justify-between items-center bg-teal-800 py-4 rounded-2xl">
          <div className="text-3xl font-bold">
            <Link to="/" className="hover:text-teal-400 transition-colors">
            Nursing Exam Portal
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 text-4sm">
            <li>
              <Link 
                to="/" 
                className={`hover:text-teal-400 transition-colors ${isActive('/') ? 'text-teal-400' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`hover:text-teal-400 transition-colors ${isActive('/about') ? 'text-teal-400' : ''}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/academics" 
                className={`hover:text-teal-400 transition-colors ${isActive('/academics') ? 'text-teal-400' : ''}`}
              >
                Programs
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`hover:text-teal-400 transition-colors ${isActive('/contact') ? 'text-teal-400' : ''}`}
              >
                Contact
              </Link>
            </li>
          </ul>
          
          {/* Desktop Exam Portal Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-s hover:bg-white hover:text-teal-800 transition-all rounded-2xl" onClick={() => navigate('/signup')}>
              NCLEX Exam
            </button>
          </div>

          {/* Mobile Burger Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-teal-400 transition-colors p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isSidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          />
        )}

        {/* Mobile Sidebar */}
        <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-teal-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex justify-between items-center p-6 border-b border-teal-700">
              <img 
                src="/SRB-Marine-1001.png" 
                alt="SRB Marine Logo" 
                className="h-8 w-auto"
              />
              <button
                onClick={closeMenu}
                className="text-white hover:text-teal-400 transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 px-6 py-4">
              <div className="space-y-4">
                <Link
                  to="/"
                  className={`block py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors ${isActive('/') ? 'bg-teal-700 text-teal-400' : 'text-white'}`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`block py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors ${isActive('/about') ? 'bg-teal-700 text-teal-400' : 'text-white'}`}
                  onClick={closeMenu}
                >
                  About
                </Link>
                <Link
                  to="/academics"
                  className={`block py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors ${isActive('/academics') ? 'bg-teal-700 text-teal-400' : 'text-white'}`}
                  onClick={closeMenu}
                >
                  Programs
                </Link>
                <Link
                  to="/contact"
                  className={`block py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors ${isActive('/contact') ? 'bg-teal-700 text-teal-400' : 'text-white'}`}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
                <div className="flex justify-center pt-4">
                  <button
                    className="px-6 py-3 rounded-lg text-white bg-teal-600 hover:bg-teal-700 transition-colors font-semibold"
                    onClick={() => {
                      closeMenu();
                      navigate('/signup');
                    }}
                  >
                    NCLEX Exam
                  </button>
                </div>
              </div>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-teal-700">
              <div className="text-sm text-white">
                <p>Nursing Exam Portal</p>
                <p className="mt-1">Your Gateway to Nursing Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 