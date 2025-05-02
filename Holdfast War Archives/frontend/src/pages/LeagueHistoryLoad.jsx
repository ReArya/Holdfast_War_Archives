import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
            
            {/* Dropdown menu with max height and overflow */}
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
                                e.preventDefault(); // Prevent default anchor behavior
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

const LeagueHistoryLoad = () => {
    const navigate = useNavigate();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({ 
        regionalLeagues: false, 
        internationalLeagues: false,
        specialEvents: false 
    });
    const [videoOverlay, setVideoOverlay] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState({ 
        regionalLeagues: null, 
        internationalLeagues: null,
        specialEvents: null 
    });

    // League options for each dropdown
    const regionalLeaguesOptions = [
        { label: 'RGL Season 1', href: '/rglSeason1' },
        { label: 'RGL Season 2', href: '/rglSeason2' },
        { label: 'RGL Season 3', href: '/rglSeason3' },
        { label: 'RGL Season 4', href: '/rglSeason4' },
        { label: 'RGL Season 5', href: '/rglSeason5' },
    ];

    const internationalLeaguesOptions = [
        { label: 'NWL Season 2', href: '/nwlSeason2' },
        { label: 'NWL Season 3', href: '/nwlSeason3' },
        { label: 'NWL Season 4', href: '/nwlSeason4' },
        { label: 'NWL Season 5', href: '/nwlSeason5' },
        { label: 'NWL Season 6', href: '/nwlSeason6' }
    ];

    const specialEventsOptions = [
        { label: 'HAL Season 1', href: '/halSeason1' },
        { label: 'HAL Season 2', href: '/halSeason2' },
        { label: 'HRL Season 2', href: '/hrlSeason2' },
        { label: 'HRL Season 3', href: '/hrlSeason3' },
        { label: 'HRL Season 4', href: '/hrlSeason4' },
        { label: 'HRL Season 5', href: '/hrlSeason5' },
        { label: 'HCL Season 1', href: '/hclSeason1' }
    ];

    const toggleDropdown = (type) => {
        const newState = {
            ...dropdownOpen,
            regionalLeagues: type === 'regionalLeagues' ? !dropdownOpen.regionalLeagues : false,
            internationalLeagues: type === 'internationalLeagues' ? !dropdownOpen.internationalLeagues : false,
            specialEvents: type === 'specialEvents' ? !dropdownOpen.specialEvents : false
        };
        
        setDropdownOpen(newState);
        
        // Set video overlay if any dropdown is open
        setVideoOverlay(newState.regionalLeagues || newState.internationalLeagues || newState.specialEvents);
    };

    const handleOptionClick = (type, option) => {
        console.log(`Navigation triggered to: ${option.href}`);
        
        setSelectedLeague({
            ...selectedLeague,
            [type]: option
        });
        
        // Close dropdown after selection
        setDropdownOpen({
            ...dropdownOpen,
            [type]: false
        });
        
        setVideoOverlay(false);
        
        // Navigate using React Router
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
                setDropdownOpen({ 
                    regionalLeagues: false, 
                    internationalLeagues: false,
                    specialEvents: false 
                });
                setVideoOverlay(false);
            }
        };

        document.addEventListener('mousedown', closeDropdowns);
        return () => document.removeEventListener('mousedown', closeDropdowns);
    }, []);

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
                        League History
                    </h2>
                    <div className="w-24 h-1 bg-sky-700 mx-auto mb-8 rounded-full" />
                    <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        The league history page showcases the various regional, international, and special event leagues that have shaped Holdfast's competitive legacy.
                    </p>
                    <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4">
                        These leagues represent the pinnacle of organized competitive play, bringing together the best players and teams from around the world.
                    </p>
                    <p className="text-center font-medium text-lg text-sky-800 mt-4 mb-8">
                        Choose a league to view from the dropdown menus below
                    </p>
                </header>

                <main className={`max-w-6xl mx-auto px-4 pb-16 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
                        {/* Regional Leagues Dropdown */}
                        <div className="w-full md:w-1/3">
                            <div className="relative bg-white rounded-xl shadow-lg overflow-visible transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 h-full">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-700 to-blue-600 rounded-t-lg" />
                                <div className="p-6">
                                    <div className="relative z-20">  
                                        <Dropdown
                                            title={selectedLeague.regionalLeagues ? selectedLeague.regionalLeagues.label : "Select League"}
                                            options={regionalLeaguesOptions}
                                            isOpen={dropdownOpen.regionalLeagues}
                                            toggleDropdown={() => toggleDropdown('regionalLeagues')}
                                            id="regionalLeagues"
                                            onOptionClick={(option) => handleOptionClick('regionalLeagues', option)}
                                        />
                                    </div>
                                    <br />
                                    <h3 className="text-gray-800 text-xl font-semibold mb-3 text-center">Groupfight League</h3>
                                    <p className="text-gray-600 text-center mb-4">
                                        View Groupfighting Leagues both regimental and draft
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* International Leagues Dropdown */}
                        <div className="w-full md:w-1/3">
                            <div className="relative bg-white rounded-xl shadow-lg overflow-visible transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 h-full">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-700 to-blue-600 rounded-t-lg" />
                                <div className="p-6">
                                    <div className="relative z-20">
                                        <Dropdown
                                            title={selectedLeague.internationalLeagues ? selectedLeague.internationalLeagues.label : "Select League"}
                                            options={internationalLeaguesOptions}
                                            isOpen={dropdownOpen.internationalLeagues}
                                            toggleDropdown={() => toggleDropdown('internationalLeagues')}
                                            id="internationalLeagues"
                                            onOptionClick={(option) => handleOptionClick('internationalLeagues', option)}
                                        />
                                    </div>
                                    <br />
                                    <h3 className="text-gray-800 text-xl font-semibold mb-3 text-center">Line League</h3>
                                    <p className="text-gray-600 text-center mb-4">
                                        View various regimental line (NWL) leagues
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Special Events Dropdown */}
                        <div className="w-full md:w-1/3">
                            <div className="relative bg-white rounded-xl shadow-lg overflow-visible transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 h-full">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-700 to-blue-600 rounded-t-lg" />
                                <div className="p-6">
                                    <div className="relative z-20">
                                        <Dropdown
                                            title={selectedLeague.specialEvents ? selectedLeague.specialEvents.label : "Select League"}
                                            options={specialEventsOptions}
                                            isOpen={dropdownOpen.specialEvents}
                                            toggleDropdown={() => toggleDropdown('specialEvents')}
                                            id="specialEvents"
                                            onOptionClick={(option) => handleOptionClick('specialEvents', option)}
                                        />
                                    </div>
                                    <br />
                                    <h3 className="text-gray-800 text-xl font-semibold mb-3 text-center">Minor League</h3>
                                    <p className="text-gray-600 text-center mb-4">
                                        View various other minor leagues from Rifle League to Artilery League
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Three Video Section with descriptions above videos */}
                    <div className="flex flex-col md:flex-row gap-6 justify-center relative">
                        {/* Video 1 - Regional League */}
                        <div className="w-full md:w-1/3">
                            <div className="relative bg-white rounded-xl shadow-md p-6 w-full border border-gray-100 overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-700 to-blue-600 rounded-t-lg" />
                                <div className="mb-5 text-center">
                                    <p className="text-sky-600 font-medium mb-1">Regimental Groupfight League</p>
                                    <p className="text-gray-600">
                                        RGL Season 5 Match
                                    </p>
                                </div>
                                
                                <div className="overflow-hidden rounded-lg shadow-lg relative transition-transform hover:scale-[1.02] duration-300">
                                    <div className="aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src="https://www.youtube.com/embed/IJtR43b-gHI?playlist=IJtR43b-gHI&loop=1&autoplay=1&mute=1"
                                            title="RGL Season 5 League Final"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    {/* Full overlay when dropdown is open */}
                                    {videoOverlay && (
                                        <div 
                                            className="absolute top-0 left-0 w-full h-full bg-black opacity-30"
                                        ></div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Video 2 - International League */}
                        <div className="w-full md:w-1/3">
                            <div className="relative bg-white rounded-xl shadow-md p-6 w-full border border-gray-100 overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-700 to-blue-600 rounded-t-lg" />
                                <div className="mb-5 text-center">
                                    <p className="text-sky-600 font-medium mb-1">Line League</p>
                                    <p className="text-gray-600">
                                        NWL Season 3 Match
                                    </p>
                                </div>
                                
                                <div className="overflow-hidden rounded-lg shadow-lg relative transition-transform hover:scale-[1.02] duration-300">
                                    <div className="aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src="https://www.youtube.com/embed/R11z2w2KWd8?playlist=R11z2w2KWd8&loop=1&autoplay=1&mute=1"
                                            title="Regimental Line Competition"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    {/* Full overlay when dropdown is open */}
                                    {videoOverlay && (
                                        <div 
                                            className="absolute top-0 left-0 w-full h-full bg-black opacity-30"
                                        ></div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Video 3 - Special Events */}
                        <div className="w-full md:w-1/3">
                            <div className="relative bg-white rounded-xl shadow-md p-6 w-full border border-gray-100 overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-700 to-blue-600 rounded-t-lg" />
                                <div className="mb-5 text-center">
                                    <p className="text-sky-600 font-medium mb-1">Rifle League</p>
                                    <p className="text-gray-600">
                                        HRL Season 3 Match
                                    </p>
                                </div>
                                
                                <div className="overflow-hidden rounded-lg shadow-lg relative transition-transform hover:scale-[1.02] duration-300">
                                    <div className="aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src="https://www.youtube.com/embed/e7a5F4oHSw8?playlist=e7a5F4oHSw8&loop=1&autoplay=1&mute=1"
                                            title="Naval Sports League Championship"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    {/* Full overlay when dropdown is open */}
                                    {videoOverlay && (
                                        <div 
                                            className="absolute top-0 left-0 w-full h-full bg-black opacity-30"
                                        ></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default LeagueHistoryLoad;