// Albert Mendez IV
// Navbar.jsx
// Holdfast War Archives
// Containst the navigation bar which is present on every site 


import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NAHoldfastLogo from '../assets/HoldfastWarArchivesLogo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // sets the navigation for the navigation bar options
  const navigation = [
    { name: 'Home', path: '/', icon: 'fa-solid fa-house' },
    { name: 'League History', path: '/leagueHistory', icon: 'fa-solid fa-trophy' },
    { name: 'Tournament History', path: '/tournamentHistoryLoad', icon: 'fa-solid fa-medal' },
    { name: 'Regiment Records', path: '/regimentRecordsLoad', icon: 'fa-solid fa-scroll'},
    { name: 'Player Statistics', path: '/statisticsLoad', icon: 'fa-solid fa-chart-line' },
    { name: 'Matchmaking', path: '/matchmaking', icon: 'fa-solid fa-users' },
    { name: 'Admin', path: '/adminLoad', icon: 'fa-solid fa-user-shield' }
  ];

  const isActivePath = (path) => location.pathname === path;

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-nav-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Mobile Navigation Header */}
      <div className="lg:hidden">
        <div className={`bg-gray-900 p-4 flex justify-between items-center shadow-md transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
          <div className="flex items-center">
            <img src={NAHoldfastLogo} alt="App Logo" className="w-8 h-8 mr-8" />
            <span className="text-white text-xl font-bold">Holdfast War Archives</span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown with Animation */}
        <div className={`mobile-nav-container fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-72 bg-gray-900 shadow-lg transform">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <div className="flex items-center">
                <img src={NAHoldfastLogo} alt="App Logo" className="w-8 h-8 mr-3" />
                <span className="text-white font-bold">War Archives</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="py-6 px-3">
              {navigation.map((item) => {
                const active = isActivePath(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`relative flex items-center px-4 py-3 my-1 rounded-lg text-white group transition-all duration-200 ${
                      active 
                        ? 'bg-blue-600 shadow-md' 
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${active ? 'text-white' : 'text-blue-400 group-hover:text-blue-300'}`}>
                      <i className={`${item.icon} text-lg`}></i>
                    </div>
                    <span className="ml-3 font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
              <div className="px-4 py-2 text-sm text-gray-400">
                Holdfast War Archives
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <div className={`bg-gray-900 h-screen w-64 fixed left-0 top-0 flex flex-col transition-all duration-300 shadow-lg ${scrolled ? 'shadow-xl' : ''}`}>
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center">
              <img src={NAHoldfastLogo} alt="App Logo" className="w-16 h-16 mr-3" />
              <span className="text-center text-white text-xl font-bold">Holdfast War Archives</span>
            </div>
          </div>
          <nav className="flex-1 py-6 px-3">
            {navigation.map((item) => {
              const active = isActivePath(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center px-4 py-3 my-1 rounded-lg text-white group transition-all duration-200 ${
                    active 
                      ? 'bg-blue-600 shadow-md' 
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${active ? 'text-white' : 'text-blue-400 group-hover:text-blue-300'}`}>
                    <i className={`${item.icon} text-lg`}></i>
                  </div>
                  <span className="ml-3 font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <div className="px-4 py-2 text-sm text-gray-400">
              Holdfast War Archives
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;