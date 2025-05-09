// Albert Mendez IV
// HMSNA3Versus3TourneyII.jsx
// Holdfast War Archives
// Holdfast Melee Server North American 3 Versus 3 Tourney II Page

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HMSNA3v3IILogo from '../assets/HMS NA 3v3 II.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

{/* Dropdown Menu */}
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
            
            {/* Dropdown menu with fixed height for 3 items and overflow */}
            {isOpen && (
                <div 
                    className="absolute left-0 right-0 z-10 mt-1 max-h-36 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-menu"
                    style={{ maxHeight: 'calc(4 * 36px)' }} // Height for exactly 4 items
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

const HMSNA3Versus3TourneyII = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState({ oneVOne: false, groupfight: false });
    const [selectedTournament, setSelectedTournament] = useState({ oneVOne: null, groupfight: null });
    const [isLoaded, setIsLoaded] = useState(true);

// Routes
const oneVOneOptions = [
    // Kumite Seasons (chronological order)
    { label: 'Kumite Season 1', href: '/kumiteSeason1' },
    { label: 'Kumite Season 2', href: '/kumiteSeason2' },
    { label: 'Kumite Season 3', href: '/kumiteSeason3' },
    { label: 'Kumite Season 4', href: '/kumiteSeason4' },
    { label: 'Kumite Season 5', href: '/kumiteSeason5' },
    { label: 'Kumite Season 6', href: '/kumiteSeason6' },
    
    // Normal Tournaments (chronological order)
    { label: 'Winter 2021 Tournament', href: '/winter2021NormalTourney' },
    { label: 'Summer 2022 Tournament', href: '/summer2022NormalTourney' },
    { label: 'Summer 2023 Tournament', href: '/summer2023NormalTourney' },
    { label: '1st Normal Tournament', href: '/firstNormalTourney' },
    { label: '2nd Normal Tournament', href: '/secondNormalTourney' },
    { label: '3rd Normal Tournament', href: '/thirdNormalTourney' },
    { label: '4th Normal Tournament', href: '/fourthNormalTourney' },
    { label: '5th Normal Tournament', href: '/fifthNormalTourney' },
    { label: 'Three Day Modded Tournament', href: '/threeDayModdedNormalTourney' },
    
    // Monthly Leaderboards (chronological order)
    { label: 'April 2021 Leaderboard', href: '/april2021Leaderboard' },
    { label: 'May 2021 Leaderboard', href: '/may2021Leaderboard' },
    { label: 'July 2021 Leaderboard', href: '/july2021Leaderboard' },
    
    // Special Events
    { label: 'King of Fighters 2019', href: '/kingOfFighters2019' },
    { label: 'FHH Tournament', href: '/FHH' },
];

    const groupfightOptions = [
    // 3v3 Tournaments
    { label: 'Three vs. Three Tournament I', href: '/threeVersusThreeTourneyI' },
    { label: 'Three vs. Three Tournament II', href: '/threeVersusThreeTourneyII' },
    { label: 'Three vs. Three Tournament III', href: '/threeVersusThreeTourneyIII' },
    { label: 'HMS NA 3v3 Tournament I', href: '/hmsNAThreeVersusThreeTourneyI' },
    { label: 'HMS NA 3v3 Tournament II', href: '/hmsNAThreeVersusThreeTourneyII' },
    { label: 'Risks NA 3v3 Tournament', href: '/risksNA3v3Tourney' },
    
    // 2v2 Tournaments
    { label: 'May 2020 2v2 Tournament', href: '/twoVersusTwoMay2020NormalTourney' },
    { label: 'May 2021 2v2 Tournament', href: '/twoVersusTwoMay2021Tourney' },
    { label: 'XMG 2v2 Unrestricted', href: '/xmg2v2Unrestricted' },
    
    // 5v5 Tournaments
    { label: 'XMG 5v5 April 2020 Tournament', href: '/xmgFiveVersusFiveTourneyApril2020' },
    { label: 'September 2020 5v5 Tournament', href: '/fiveVersusFiveSeptember2020Tourney' },
    ];

    const toggleDropdown = (type) => {
        const newState = {
            oneVOne: type === 'oneVOne' ? !dropdownOpen.oneVOne : false,
            groupfight: type === 'groupfight' ? !dropdownOpen.groupfight : false,
        };
        
        setDropdownOpen(newState);
    };

    const handleOptionClick = (type, option) => {
        setSelectedTournament({
            ...selectedTournament,
            [type]: option
        });
        
        // Close dropdown after selection
        setDropdownOpen({
            ...dropdownOpen,
            [type]: false
        });
        
        // Navigate using React Router
        navigate(option.href);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownOpen.oneVOne || dropdownOpen.groupfight) {
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
                    setDropdownOpen({ oneVOne: false, groupfight: false });
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
                    HMS NA 3 vs. 3 Tourney II
                </h2>
                <div className="w-24 h-1 bg-sky-700 mx-auto mb-8 rounded-full" />
            </header>

            {/* Tournament Dropdowns */}
            <section className="max-w-6xl mx-auto px-4 mb-16">
                <div className="flex flex-col md:flex-row gap-8 justify-center">
                    {/* 1v1 Tournament Dropdown Card */}
                    <div className="w-full md:w-1/2">
                        <div className="relative bg-white rounded-xl shadow-lg overflow-visible transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 h-full">
                            <div className="absolute top-0 left-0 w-full h-1 bg-sky-600" />
                            <div className="p-8">
                                <div className="relative z-20">  
                                    <Dropdown
                                        title="Select Tournament"
                                        options={oneVOneOptions}
                                        isOpen={dropdownOpen.oneVOne}
                                        toggleDropdown={() => toggleDropdown('oneVOne')}
                                        id="oneVOne"
                                        onOptionClick={(option) => handleOptionClick('oneVOne', option)}
                                    />
                                </div>
                                <div className="pt-8 pb-4">
                                    <h3 className="text-gray-800 text-xl font-semibold mb-3 text-center">1v1 Tournament List</h3>
                                    <p className="text-gray-600 text-center">
                                        View historical data for individual player tournaments
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Groupfight Tournament Dropdown Card */}
                    <div className="w-full md:w-1/2">
                        <div className="relative bg-white rounded-xl shadow-lg overflow-visible transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 h-full">
                            <div className="absolute top-0 left-0 w-full h-1 bg-sky-600" />
                            <div className="p-8">
                                <div className="relative z-20">
                                    <Dropdown
                                        title="Select Tournament"
                                        options={groupfightOptions}
                                        isOpen={dropdownOpen.groupfight}
                                        toggleDropdown={() => toggleDropdown('groupfight')}
                                        id="groupfight"
                                        onOptionClick={(option) => handleOptionClick('groupfight', option)}
                                    />
                                </div>
                                <div className="pt-8 pb-4">
                                    <h3 className="text-gray-800 text-xl font-semibold mb-3 text-center">Groupfight Tournament List</h3>
                                    <p className="text-gray-600 text-center">
                                        View historical data for team-based tournaments
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <main className={`max-w-6xl mx-auto px-4 pb-16 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Tournament Description and Winners */}
                <section className="bg-white rounded-xl shadow-lg overflow-visible border border-gray-100 mb-12">
                    <div className="relative">
                        <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full rounded-t-xl" />
                    </div>
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Paragraph Section */}
                            <div className="flex-1 text-lg leading-relaxed text-gray-700">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    Tournament Summary
                                </h3>
                                <p>
                                    This early 3 versus 3 tournament was conducted in the HMS discord server during the NA melee communities infancy. As a result, some information has been lost to time. However, the 63e team was able to overcome the Anti-Comintern Pact in the grand finals in this relatively small tournament. The Green Squad would end up taking third place. More tournaments were to follow as the community only grew from here.
                                </p>
                            </div>

                            {/* Winners Section */}
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    Top Winners
                                </h3>
                                <ul className="space-y-4">
                                    {/* Winner */}
                                    <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                                        <i className="fas fa-trophy text-yellow-500 text-2xl"></i>
                                        <span className="text-lg font-semibold text-gray-800">
                                            Winner: The 63e Beasts
                                        </span>
                                    </li>
                                    {/* Second */}
                                    <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                                        <i className="fas fa-medal text-gray-400 text-2xl"></i>
                                        <span className="text-lg font-semibold text-gray-800">
                                            Second: Anti-Comintern Pact
                                        </span>
                                    </li>
                                    {/* Third */}
                                    <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                                        <i className="fas fa-award text-orange-500 text-2xl"></i>
                                        <span className="text-lg font-semibold text-gray-800">
                                            Third: Green Squad
                                        </span>
                                    </li>
                                </ul>
                                {/* Calendar */}
                                <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md border border-gray-100 mt-4">
                                    <i className="fa-regular fa-calendar text-sky-600 text-xl"></i>
                                    <span className="text-lg font-semibold text-gray-800">
                                        March 2019
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Image Section */}
                <section className="mx-auto bg-white rounded-xl shadow-lg overflow-visible border border-gray-100 mb-12 max-w-2xl">
                    <div className="relative">
                        <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full rounded-t-xl" />
                    </div>
                    <div className="p-6">
                        <div className="text-center">
                            <img
                                src={HMSNA3v3IILogo}
                                alt="HMS NA 3 vs. 3 II"
                                className="object-contain w-full rounded-lg"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HMSNA3Versus3TourneyII;