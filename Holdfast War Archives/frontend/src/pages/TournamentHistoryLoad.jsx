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

const TournamentHistoryLoad = () => {
    const navigate = useNavigate();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({ oneVOne: false, groupfight: false });
    const [videoOverlay, setVideoOverlay] = useState(false);
    const [selectedTournament, setSelectedTournament] = useState({ oneVOne: null, groupfight: null });

    // Make sure these URLs match EXACTLY with your route paths in App.jsx
    const oneVOneOptions = [
        { label: 'Holdfast Kumite Season 1', href: '/kumiteSeason1' },
        { label: 'Holdfast Kumite Season 2', href: '/kumiteSeason2' },
        { label: 'Holdfast Kumite Season 3', href: '/kumiteSeason3' },
        { label: 'Holdfast Kumite Season 4', href: '/kumiteSeason4' },
        { label: 'Holdfast Kumite Season 5', href: '/kumiteSeason5' },
        { label: 'Holdfast Kumite Season 6', href: '/kumiteSeason6' },
        { label: 'Summer 2023 Normal Tourney', href: '/summer2023NormalTourney' },
        { label: 'Summer 2022 Normal Tourney', href: '/summer2022NormalTourney' },
        { label: 'Winter 2021 Normal Tourney', href: '/winter2021NormalTourney' },
        { label: 'July 2021 Leaderboard', href: '/july2021Leaderboard' },
        { label: 'May 2021 Leaderboard', href: '/may2021Leaderboard' },
        { label: 'April 2021 Leaderboard', href: '/april2021Leaderboard' },
        { label: 'Three Day Modded Normal Tourney', href: '/threeDayModdedNormalTourney' },
        { label: 'FHH', href: '/FHH' },
        { label: '5th Normal Tourney', href: '/fifthNormalTourney' },
        { label: 'King of Fighters 2019', href: '/kingOfFighters2019' },
        { label: '4th Normal Tourney', href: '/fourthNormalTourney' },
        { label: '3rd Normal Tourney', href: '/thirdNormalTourney' },
        { label: '2nd Normal Tourney', href: '/secondNormalTourney' },
        { label: '1st Normal Tourney', href: '/firstNormalTourney' },
    ];

    const groupfightOptions = [
        { label: 'Three vs. Three Tourney I', href: '/threeVersusThreeTourneyI' },
        { label: 'Three vs. Three Tourney II', href: '/threeVersusThreeTourneyII' },
        { label: 'Three vs. Three Tourney III', href: '/threeVersusThreeTourneyIII' },
        { label: 'Two vs. Two May 2021 Tourney', href: '/twoVersusTwoMay2021Tourney' },
        { label: 'Five vs. Two September 2020 Tourney', href: '/fiveVersusFiveSeptember2020Tourney' },
    ];

    const toggleDropdown = (type) => {
        const newState = {
            oneVOne: type === 'oneVOne' ? !dropdownOpen.oneVOne : false,
            groupfight: type === 'groupfight' ? !dropdownOpen.groupfight : false,
        };
        
        setDropdownOpen(newState);
        
        // Set video overlay if any dropdown is open
        setVideoOverlay(newState.oneVOne || newState.groupfight);
    };

    // Updated handleOptionClick with debugging
    const handleOptionClick = (type, option) => {
        console.log(`Navigation triggered to: ${option.href}`);
        
        setSelectedTournament({
            ...selectedTournament,
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
                setDropdownOpen({ oneVOne: false, groupfight: false });
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
                        Tournament History
                    </h2>
                    <div className="w-24 h-1 bg-sky-700 mx-auto mb-8 rounded-full" />
                    <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        The tournament history page highlights the various 1v1 and groupfight melee tournaments that have taken place across Holdfast's lifecycle.
                    </p>
                    <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4">
                        Those wishing to prove their worth in a team setting opt to form groupfight teams to compete and show their skills.
                    </p>
                    <p className="text-center font-medium text-lg text-sky-800 mt-4 mb-8">
                        Choose a tournament to view from the dropdown menus below
                    </p>
                </header>

                <main className={`max-w-6xl mx-auto px-4 pb-16 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex flex-col md:flex-row gap-8 justify-center mb-12">
                        <div className="w-full md:w-1/2">
                            <div className="relative bg-white rounded-xl shadow-lg overflow-visible transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 h-full">
                                {/* Match the curve of the bottom containers */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-700 to-blue-600 rounded-t-lg" />
                                <div className="p-8">
                                <div className="relative z-20">  
                                        <Dropdown
                                            title={selectedTournament.oneVOne ? selectedTournament.oneVOne.label : "Select Tournament"}
                                            options={oneVOneOptions}
                                            isOpen={dropdownOpen.oneVOne}
                                            toggleDropdown={() => toggleDropdown('oneVOne')}
                                            id="oneVOne"
                                            onOptionClick={(option) => handleOptionClick('oneVOne', option)}
                                        />
                                    </div>
                                    <br />
                                    <h3 className="text-gray-800 text-xl font-semibold mb-3 text-center">1v1 Tournament List</h3>
                                    <p className="text-gray-600 text-center mb-4">
                                        View historical data for individual player tournaments
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="relative bg-white rounded-xl shadow-lg overflow-visible transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 h-full">
                                {/* Match the curve of the bottom containers */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-700 to-blue-600 rounded-t-lg" />
                                <div className="p-8">
                                <div className="relative z-20">
                                        <Dropdown
                                            title={selectedTournament.groupfight ? selectedTournament.groupfight.label : "Select Tournament"}
                                            options={groupfightOptions}
                                            isOpen={dropdownOpen.groupfight}
                                            toggleDropdown={() => toggleDropdown('groupfight')}
                                            id="groupfight"
                                            onOptionClick={(option) => handleOptionClick('groupfight', option)}
                                        />
                                    </div>
                                    <br />
                                    <h3 className="text-gray-600 text-xl font-semibold mb-3 text-center">Groupfight Tournament List</h3>
                                    <p className="text-gray-600 text-center mb-4">
                                        View historical data for team-based tournaments
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Section with descriptions ABOVE videos - with hover effect */}
                    <div className="flex flex-col md:flex-row gap-8 justify-center relative">
                        {/* Video 1 with description above */}
                        <div className="w-full md:w-1/2">
                            <div className="relative bg-white rounded-xl shadow-md p-6 w-full border border-gray-100 overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-700 to-blue-600 rounded-t-lg" />
                                {/* Video description moved ABOVE the video */}
                                <div className="mb-5 text-center">
                                    <p className="text-sky-600 font-medium mb-1">Tournament Showcase</p>
                                    <p className="text-gray-600">
                                        Video of the Summer 2022 Normal Tourney Gameplay
                                    </p>
                                </div>
                                
                                <div className="overflow-hidden rounded-lg shadow-lg relative transition-transform hover:scale-[1.02] duration-300">
                                    <div className="aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src="https://www.youtube.com/embed/GeDaYomnBuI?playlist=GeDaYomnBuI&loop=1&autoplay=1&mute=1"
                                            title="Summer 2022 Normal Tourney Gameplay"
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

                        {/* Video 2 with description above */}
                        <div className="w-full md:w-1/2">
                            <div className="relative bg-white rounded-xl shadow-md p-6 w-full border border-gray-100 overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-700 to-blue-600 rounded-t-lg" />
                                {/* Video description moved ABOVE the video */}
                                <div className="mb-5 text-center">
                                    <p className="text-sky-600 font-medium mb-1">Team Battles</p>
                                    <p className="text-gray-600">
                                        5v5 Tournament Gameplay
                                    </p>
                                </div>
                                
                                <div className="overflow-hidden rounded-lg shadow-lg relative transition-transform hover:scale-[1.02] duration-300">
                                    <div className="aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src="https://www.youtube.com/embed/Ro92AtBthvE?playlist=Ro92AtBthvE&loop=1&autoplay=1&mute=1"
                                            title="5v5 Tournament Gameplay"
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

export default TournamentHistoryLoad;