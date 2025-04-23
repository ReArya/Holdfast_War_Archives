import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Regiment63eLogo from '../assets/63e.png';

const Dropdown = ({ title, options, isOpen, toggleDropdown, id, onOptionClick }) => {
  const dropdownRef = useRef(null);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="dropdown-toggle w-full flex items-center justify-center bg-white px-4 py-3 text-base font-semibold text-sky-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 rounded-md group transition-all"
        id={`dropdown-button-${id}`}
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 ml-2 text-sky-600 transition-transform group-hover:translate-x-1 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div 
          className="absolute left-0 right-0 z-10 mt-1 max-h-36 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-menu"
          style={{ maxHeight: 'calc(4 * 36px)' }}
        >
          {options.map((option, index) => (
            <a
              key={index}
              href={option.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700"
              role="menuitem"
              tabIndex="-1"
              onClick={(e) => {
                e.preventDefault();
                onOptionClick && onOptionClick(option);
              }}
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const Regiment63e = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRegiment, setSelectedRegiment] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const regimentOptions = [
    { label: '2.BIR', href: '/regiment2.BIR'},
    { label: '45e', href: '/regiment45e' },
    { label: '51st', href: '/regiment51st' },
    { label: '63e', href: '/regiment63e' },
    { label: '77th', href: '/regiment77th' },
    { label: '7Fuß', href: '/regiment7Fuß' },
    { label: 'KRA', href: '/regimentKRA' },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    console.log(`Navigation triggered to: ${option.href}`);
    setSelectedRegiment(option);
    setDropdownOpen(false);
    navigate(option.href);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen) {
        const dropdownElements = document.querySelectorAll('.dropdown-menu');
        const toggleButtons = document.querySelectorAll('.dropdown-toggle');
        
        let clickedInside = false;
        
        dropdownElements.forEach(element => {
          if (element.contains(event.target)) {
            clickedInside = true;
          }
        });
        
        toggleButtons.forEach(button => {
          if (button.contains(event.target)) {
            clickedInside = true;
          }
        });
        
        if (!clickedInside) {
          setDropdownOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Top blue line */}
      <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-2 w-full" />

      {/* Header Section */}
      <header className={`max-w-6xl mx-auto px-4 pt-12 pb-8 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-2">
        </div>
        <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
          Holdfast War Archives
        </h1>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-sky-700 mb-6">
          63e Regiment
        </h2>
        <div className="w-24 h-1 bg-sky-700 mx-auto mb-8 rounded-full" />
      </header>

      {/* Regiment Dropdown Section */}
      <section className="max-w-md mx-auto mb-12">
        <div className="relative bg-white rounded-xl shadow-lg overflow-visible transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-700 to-blue-600" />
          <div className="p-8">
            <div className="relative z-20">
              <Dropdown
                title={selectedRegiment ? selectedRegiment.label : "Select Regiment"}
                options={regimentOptions}
                isOpen={dropdownOpen}
                toggleDropdown={toggleDropdown}
                id="regiment"
                onOptionClick={handleOptionClick}
              />
            </div>
            <div className="pt-4 pb-0">
              <h3 className="text-gray-800 text-xl font-semibold mb-3 text-center">Regiment List</h3>
              <p className="text-gray-600 text-center">
                View historical data for North American regiments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <main className={`max-w-6xl mx-auto px-4 pb-16 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Regiment Description and Achievements */}
          <div className="w-full md:w-1/2">
            <section className="bg-white rounded-xl shadow-lg overflow-visible border border-gray-100 mb-8">
            <div className="relative">
            <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full rounded-t-xl" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Regiment Overview
                </h3>
                <div className="text-lg leading-relaxed text-gray-700 mb-6">
                  <p>
                    The 63e Regiment is one of the premier North American regiments in Holdfast: Nations at War. A regiment that is over 10 years old with its roots in the Mount and Blade Warband Napoleonic Wars community. The 63e is well known throughout the years as being one of the top competitive powerhouses with many victories under their belt.
                  </p>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Key Achievements
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-medal text-gray-400 text-2xl"></i>
                    <span className="text-lg font-semibold text-gray-800">
                      RGL 1 - 2nd Place
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-medal text-gray-400 text-2xl"></i>
                    <span className="text-lg font-semibold text-gray-800">
                      RGL Season 2 - 2nd Place
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-trophy text-yellow-500 text-2xl"></i>
                    <span className="text-lg font-semibold text-gray-800">
                      RGL Season 3 - 1st Place
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-trophy text-yellow-500 text-2xl"></i>
                    <span className="text-lg font-semibold text-gray-800">
                      RGL Season 4 - 1st Place
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-award text-orange-500 text-2xl"></i>
                    <span className="text-lg font-semibold text-gray-800">
                      NWL Season 2 - 3rd Place
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-award text-orange-500 text-2xl"></i>
                    <span className="text-lg font-semibold text-gray-800">
                      NWL Season 3 - 3rd Place
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-award text-orange-500 text-2xl"></i>
                    <span className="text-lg font-semibold text-gray-800">
                      NWL Season 4 - 3rd Place
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-trophy text-yellow-500 text-2xl"></i>
                    <span className="text-lg font-semibold text-gray-800">
                      NWL Season 5 - 1st Place
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-trophy text-yellow-500 text-2xl"></i>
                    <span className="text-lg font-semibold text-gray-800">
                      NWL Season 6 - 1st Place
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-award text-orange-500 text-2xl"></i>
                    <span className="text-lg font-semibold text-gray-800">
                      HAL Season 2 - 3rd Place
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
          
          {/* Video and Notable Players Section */}
          <div className="w-full md:w-1/2">
            {/* Regiment Logo Section */}
            <section className="bg-white rounded-xl shadow-lg overflow-visible border border-gray-100 mb-8">
              <div className="relative">
                <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full rounded-t-xl" />
              </div>
              <div className="p-8 flex justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-sky-50 rounded-full flex items-center justify-center shadow-md border border-sky-100">
                  <img 
          src={Regiment63eLogo}
          alt="63e Regiment Logo"
          className="w-full h-full object-contain"
        />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Regiment Logo
                  </h3>
                </div>
              </div>
            </section>
            
            {/* Video */}
            <section className="bg-white rounded-xl shadow-lg overflow-visible border border-gray-100 mb-8">
            <div className="relative">
              <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full rounded-t-xl" />
            </div>
            <div className="p-8">
              <div className="mb-5 text-center">
                <p className="text-sky-600 font-medium mb-1">63e Regiment Highlights</p>
                <p className="text-gray-600">
                  Competitive Gameplay Footage
                </p>
              </div>
              
              <div className="overflow-hidden rounded-lg shadow-lg relative transition-transform hover:scale-[1.02] duration-300">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/BWSrzR0OZE0?autoplay=1&mute=1"
                    title="63e Regiment Battle Footage"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
            
            {/* Notable Players Section */}
            <section className="bg-white rounded-xl shadow-lg overflow-visible border border-gray-100">
              <div className="relative">
                <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full rounded-t-xl" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Notable Players
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-user-circle text-sky-700 text-2xl"></i>
                    <div>
                      <span className="text-lg font-semibold text-gray-800">JacobT</span>
                    </div>
                  </li>
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-user-circle text-sky-700 text-2xl"></i>
                    <div>
                      <span className="text-lg font-semibold text-gray-800">Z0FT</span>
                    </div>
                  </li>
                  <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                    <i className="fas fa-user-circle text-sky-700 text-2xl"></i>
                    <div>
                      <span className="text-lg font-semibold text-gray-800">Fires</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Regiment63e;