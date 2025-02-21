import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import NAHoldfastLogo from '../assets/NA Holdfast.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/', icon: 'fa-solid fa-house' },
    { name: 'League History', path: '/leagueHistory', icon: 'fa-solid fa-trophy' },
    { name: 'Tournament History', path: '/tournamentHistoryLoad', icon: 'fa-solid fa-medal' },
    { name: 'Regiment Records', path: '/regimentRecordsLoad', icon: 'fa-solid fa-scroll'},
    { name: 'Player Pickup Statistics', path: '/pickups', icon: 'fa-solid fa-chart-line' },
    { name: 'Matchmaking', path: '/matchmaking', icon: 'fa-solid fa-users' },
    { name: 'Admin Page', path: '/adminLoad', icon: 'fa-solid fa-user-shield' }
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="bg-sky-700 p-4 flex justify-between items-center">
          <span className="text-white text-xl font-bold">Holdfast War Archives</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="bg-sky-700 shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 text-white hover:bg-gray-700 ${
                  isActivePath(item.path) ? 'bg-gray-700' : ''
                }`}
              >
                <i className={`${item.icon} mr-3`}></i>
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <div className="bg-sky-700 h-screen w-64 fixed left-0 top-0 flex flex-col">
          <div className="p-4 justify-between items-center">
          <div className="flex items-center">
            <img src={NAHoldfastLogo} alt="App Logo" className="w-10 h-10 mr-3" />
            <span className="text-white text-xl font-bold text-align: center">Holdfast War Archives</span>
          </div>
          </div>
          <nav className="flex-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-white hover:bg-gray-700 ${
                  isActivePath(item.path) ? 'bg-gray-700' : ''
                }`}
              >
                <i className={`${item.icon} mr-3`}></i>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Margin for Desktop */}
      <div className="lg:ml-64">
        {/* Your page content will go here */}
      </div>
    </>
  );
};

export default Navbar;
