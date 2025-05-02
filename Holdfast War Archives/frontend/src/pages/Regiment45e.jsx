import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Regiment45eLogo from '../assets/45e.png';

const Dropdown = ({ title, options, isOpen, toggleDropdown, id, onOptionClick }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => toggleDropdown(!isOpen)}
        className="w-full flex items-center justify-between bg-white px-4 py-3 text-base font-semibold text-sky-600 shadow ring-1 ring-gray-300 hover:bg-gray-50 rounded-lg transition-all"
        id={`dropdown-button-${id}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 ml-2 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
        <ul className="absolute left-0 right-0 z-20 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
          {options.map((option, index) => (
            <li key={index}>
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sky-100 hover:text-sky-800"
                onClick={() => onOptionClick(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AchievementItem = ({ icon, text, color }) => (
  <li className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow border border-gray-100 transition hover:shadow-md">
    <i className={`fas ${icon} text-${color}-500 text-xl`} aria-hidden="true"></i>
    <span className="text-sm font-medium text-gray-800">{text}</span>
  </li>
);

const PlayerItem = ({ name }) => (
  <li className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow border border-gray-100 transition hover:shadow-md">
    <i className="fas fa-user-circle text-sky-700 text-xl" aria-hidden="true"></i>
    <span className="text-sm font-medium text-gray-800">{name}</span>
  </li>
);

// New component for tabs
const TabSystem = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex border-b border-gray-200 mb-4">
    {tabs.map((tab, index) => (
      <button
        key={index}
        className={`px-4 py-2 text-sm font-medium ${
          activeTab === index
            ? 'text-sky-700 border-b-2 border-sky-700'
            : 'text-gray-600 hover:text-sky-600'
        } transition-colors`}
        onClick={() => setActiveTab(index)}
      >
        {tab}
      </button>
    ))}
  </div>
);

// Card component for better organization
const Card = ({ title, children, className = "", style = {}, forwardedRef }) => (
  <section 
    className={`bg-white rounded-xl shadow border border-gray-100 ${className}`} 
    style={style}
    ref={forwardedRef}
  >
    <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full rounded-t-xl" />
    <div className="p-6 h-full flex flex-col">
      {title && <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>}
      <div className="flex-grow">{children}</div>
    </div>
  </section>
);

const Regiment45e = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRegiment, setSelectedRegiment] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [containerHeight, setContainerHeight] = useState("auto");
  
  // Refs for measuring heights
  const logoCardRef = useRef(null);
  const playersCardRef = useRef(null);
  const mainContentRef = useRef(null);
  
  useEffect(() => setIsLoaded(true), []);

  // Calculate and synchronize heights
  useEffect(() => {
    const updateHeights = () => {
      if (logoCardRef.current && playersCardRef.current && mainContentRef.current) {
        // Reset heights to auto first to get natural heights
        mainContentRef.current.style.height = "auto";
        
        // Wait for render cycle
        setTimeout(() => {
          // Calculate the total height of the sidebar (logo + players)
          const logoHeight = logoCardRef.current.offsetHeight;
          const playerCardHeight = playersCardRef.current.offsetHeight;
          const sidebarTotalHeight = logoHeight + playerCardHeight + 24; // 24px is the gap
          
          // Get natural height of main content
          const mainContentHeight = mainContentRef.current.offsetHeight;
          
          // Set the height to the taller of the two
          const newHeight = Math.max(sidebarTotalHeight, mainContentHeight);
          setContainerHeight(`${newHeight}px`);
        }, 100);
      }
    };

    updateHeights();
    
    // Also update on tab change or window resize
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [activeTab, isLoaded]);

  const regimentOptions = [
    { label: '2.BIR', href: '/regiment2.BIR' },
    { label: '45e', href: '/regiment45e' },
    { label: '51st', href: '/regiment51st' },
    { label: '63e', href: '/regiment63e' },
    { label: '77th', href: '/regiment77th' },
    { label: '7Fuß', href: '/regiment7Fuß' },
    { label: 'KRA', href: '/regimentKRA' },
  ];

  const handleOptionClick = (option) => {
    setSelectedRegiment(option);
    setDropdownOpen(false);
    navigate(option.href);
  };
  
  const toggleDropdown = (value) => {
    setDropdownOpen(value);
  };

  const achievements = [
    { icon: 'fa-trophy', text: 'RGL Season 2 - 1st Place', color: 'yellow' },
    { icon: 'fa-award', text: 'RGL Season 3 - 3rd Place', color: 'orange' },
    { icon: 'fa-award', text: 'RGL Season 4 - 3rd Place', color: 'orange' },
    { icon: 'fa-award', text: 'RGL Season 5 - 3rd Place', color: 'orange' },
    { icon: 'fa-trophy', text: 'NWL Season 2 - 1st Place', color: 'yellow' },
    { icon: 'fa-trophy', text: 'NWL Season 4 - 1st Place', color: 'yellow' },
    { icon: 'fa-award', text: 'NWL Season 5 - 3rd Place', color: 'orange' },
    { icon: 'fa-award', text: 'NWL Season 6 - 3rd Place', color: 'orange' },
    { icon: 'fa-trophy', text: 'HAL Season 1 - 1st Place', color: 'yellow' },
    { icon: 'fa-medal', text: 'HRL Season 2 - 2nd Place', color: 'gray' },
    { icon: 'fa-medal', text: 'HRL Season 4 - 2nd Place', color: 'gray' },
    { icon: 'fa-medal', text: 'HRL Season 5 - 2nd Place', color: 'gray' },
  ];

  const notablePlayers = ['Adam', 'Power', 'Ryan'];

  // Group achievements by league for better organization
  const groupedAchievements = achievements.reduce((acc, achievement) => {
    const league = achievement.text.split(' ')[0];
    if (!acc[league]) acc[league] = [];
    acc[league].push(achievement);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-2 w-full" />

      {/* Header Section */}
      <header className={`max-w-6xl mx-auto px-4 pt-12 pb-8 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-2">
        </div>
        <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
          Holdfast War Archives
        </h1>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-sky-700 mb-6">
          45e Regiment
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

      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar - About & Logo */}
          <div className="lg:col-span-3 space-y-6 flex flex-col">
            <Card 
              className="flex flex-col items-center text-center"
              forwardedRef={logoCardRef}
            >
              <div className="w-32 h-32 rounded-full bg-sky-50 flex items-center justify-center shadow border border-sky-100 mb-4">
                <img src={Regiment45eLogo} alt="45e Regiment Logo" className="w-full h-full object-contain p-2" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">45e Regiment</h3>
              <a 
                href="https://discord.gg/45e" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition text-sm flex items-center justify-center"
              >
                <i className="fab fa-discord mr-2" aria-hidden="true"></i>
                Join Regiment
              </a>
            </Card>
            
            <Card 
              title="Notable Players" 
              className="flex-grow"
              forwardedRef={playersCardRef}
            >
              <div className="h-full flex flex-col">
                <ul className="space-y-2 flex-grow">
                  {notablePlayers.length > 0 ? (
                    notablePlayers.map((name, i) => <PlayerItem key={i} name={name} />)
                  ) : (
                    <li className="text-gray-500 italic text-sm">No notable players listed yet.</li>
                  )}
                </ul>
                <div className="mt-auto pt-4">
                  <p className="text-sm text-gray-500 italic">Regiment leadership and distinguished members.</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-9">
            <Card 
              title="Regiment Overview" 
              forwardedRef={mainContentRef}
              style={{ height: containerHeight }}
            >
              <div className="h-full flex flex-col">
                <p className="text-base text-gray-700 mb-4">
                The 45e is a well-known French regiment that has its roots in the early years of the Holdfast lifecycle. As a result, the regiment has accrued various podium finishes over the years in multiple competitive leagues. The regiment is known for its laid-back atmosphere and rich competitive rivalry with the 63e.
                </p>
                
                <TabSystem 
                  tabs={['Achievements', 'Media']} 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                />
                
                <div className="flex-grow">
                  {activeTab === 0 && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(groupedAchievements).map(([league, leagueAchievements]) => (
                          <div key={league} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            <h4 className="text-md font-semibold text-sky-700 mb-3">{league} League</h4>
                            <ul className="space-y-2">
                              {leagueAchievements.map((achievement, idx) => (
                                <AchievementItem key={idx} {...achievement} />
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      
                      {Object.keys(groupedAchievements).length === 0 && (
                        <div className="text-center py-6">
                          <i className="fas fa-trophy text-gray-300 text-4xl mb-2"></i>
                          <p className="text-gray-500 italic">No achievements recorded yet.</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 1 && (
                    <div className="space-y-4">
                      <div className="rounded-lg overflow-hidden shadow-md">
                        <div className="aspect-video">
                          <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/i7S9q7hDSas?autoplay=1&mute=1"
                            title="45e Regiment Battle Footage"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Regiment45e;