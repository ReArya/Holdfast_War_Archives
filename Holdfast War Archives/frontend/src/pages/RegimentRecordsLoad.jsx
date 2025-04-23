import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NAHoldfastLogo from '../assets/NA Holdfast.png';

const Dropdown = ({ title, options, isOpen, toggleDropdown, onOptionClick }) => {
  const dropdownRef = useRef(null);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="dropdown-toggle w-full flex items-center justify-center bg-white px-4 py-3 text-base font-semibold text-sky-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 rounded-md group transition-all"
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

const RegimentRecordsLoad = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRegiment, setSelectedRegiment] = useState(null);

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
    // Navigate to the selected regiment page
    navigate(option.href);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const closeDropdowns = (event) => {
      const isDropdownButton = event.target.closest('.dropdown-toggle');
      const isDropdownMenu = event.target.closest('.dropdown-menu');
      
      if (!isDropdownButton && !isDropdownMenu) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', closeDropdowns);
    return () => document.removeEventListener('mousedown', closeDropdowns);
  }, []);

  // Add pagination controls for viewing more regiments
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(regimentOptions.length / itemsPerPage);
  
  const paginatedOptions = regimentOptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
        <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-2 w-full" />

        <header className={`max-w-6xl mx-auto px-4 pt-12 pb-8 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-2">
          </div>
          <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
            Holdfast War Archives
          </h1>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-sky-700 mb-6">
            Regiment Records
          </h2>
          <div className="w-24 h-1 bg-sky-700 mx-auto mb-8 rounded-full" />
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This page serves as an archive for North American Regiment Accolades.
          </p>
          <p className="text-center font-medium text-lg text-sky-800 mt-4 mb-8">
            Choose a regiment to view from the dropdown menu below
          </p>
        </header>

        <main className={`max-w-6xl mx-auto px-4 pb-16 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Dropdown Section */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative bg-white rounded-xl shadow-lg overflow-visible transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-sky-600" />
              <div className="p-8">
                <div className="relative z-20">
                  <Dropdown
                    title={selectedRegiment ? selectedRegiment.label : "Select Regiment"}
                    options={regimentOptions}
                    isOpen={dropdownOpen}
                    toggleDropdown={toggleDropdown}
                    onOptionClick={handleOptionClick}
                  />
                </div>
                <br />
                <h3 className="text-gray-800 text-xl font-semibold mb-3 text-center">Regiment List</h3>
                <p className="text-gray-600 text-center mb-4">
                  View historical data for North American regiments
                </p>
              </div>
            </div>
          </div>

          {/* Content Section - Logo and Video */}
          <div className="flex flex-col md:flex-row gap-8 justify-center relative">
            {/* Logo Section */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-xl shadow-md w-full border border-gray-100 relative overflow-hidden">
                {/* Blue gradient strip at the very top of the container */}
                <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full" />
                
                <div className="p-6">
                  <div className="mb-5 text-center">
                    <p className="text-sky-600 font-medium mb-1">North American Holdfast Competitive Leagues</p>
                    <p className="text-gray-600">
                      NA Logo
                    </p>
                  </div>
                  
                  <div className="overflow-hidden rounded-lg shadow-lg relative transition-transform hover:scale-[1.02] duration-300">
                    <div className="aspect-video flex items-center justify-center">
                      <img
                        src={NAHoldfastLogo}
                        alt="North American Competitive Holdfast Logo"
                        className="max-h-full object-contain"
                        style={{ maxHeight: '215px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-xl shadow-md w-full border border-gray-100 relative overflow-hidden">
                {/* Blue gradient strip at the very top of the container */}
                <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full" />
                
                <div className="p-6">
                  <div className="mb-5 text-center">
                    <p className="text-sky-600 font-medium mb-1">RGL Season 5 Final</p>
                    <p className="text-gray-600">
                      Latest League Final
                    </p>
                  </div>
                  
                  <div className="overflow-hidden rounded-lg shadow-lg relative transition-transform hover:scale-[1.02] duration-300">
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/IJtR43b-gHI?playlist=IJtR43b-gHI&loop=1&autoplay=1&mute=1"
                        title="Holdfast Regiment Battle Footage"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RegimentRecordsLoad;