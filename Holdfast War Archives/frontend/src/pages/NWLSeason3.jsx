import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NWLSeason3Logo from '../assets/NWL Season 3.svg';
import '@fortawesome/fontawesome-free/css/all.min.css';

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

const NWLSeason3 = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState({ 
        regionalLeagues: false, 
        internationalLeagues: false,
        specialEvents: false 
    });
    const [selectedLeague, setSelectedLeague] = useState({ 
        regionalLeagues: null, 
        internationalLeagues: null,
        specialEvents: null 
    });
    const [isLoaded, setIsLoaded] = useState(true);

    // League options for each dropdown - matching LeagueHistoryLoad.jsx
    const regionalLeaguesOptions = [
        { label: 'RGL Season 1', href: '/rglSeason1' },
        { label: 'RGL Season 2', href: '/rglSeason2' },
        { label: 'RGL Season 3', href: '/rglSeason3' },
        { label: 'RGL Season 4', href: '/rglSeason4' },
        { label: 'RGL Season 5', href: '/rglSeason5' },
    ];

    const internationalLeaguesOptions = [
        { label: 'NWL Season 2', href: '/nwlSeason2' },
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
    };

    const handleOptionClick = (type, option) => {
        setSelectedLeague({
            ...selectedLeague,
            [type]: option
        });
        
        setDropdownOpen({
            ...dropdownOpen,
            [type]: false
        });
        
        navigate(option.href);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isDropdownButton = event.target.closest('.dropdown-toggle');
            const isDropdownMenu = event.target.closest('.dropdown-menu');
            
            if (!isDropdownButton && !isDropdownMenu) {
                setDropdownOpen({ 
                    regionalLeagues: false, 
                    internationalLeagues: false,
                    specialEvents: false 
                });
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                    NWL Season 3
                </h2>
                <div className="w-24 h-1 bg-sky-700 mx-auto mb-8 rounded-full" />
            </header>

            {/* Tournament Dropdowns */}
            <section className="max-w-6xl mx-auto px-4 mb-16">
                <div className="flex flex-col md:flex-row gap-6 justify-center">
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
                                    View various other minor leagues from Rifle League to Artillery League
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <main className={`max-w-6xl mx-auto px-4 pb-16 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Tournament Description and Winners - Now side by side */}
                <section className="flex flex-col md:flex-row gap-6 mb-12">
                    {/* Tournament Description */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-white rounded-xl shadow-lg overflow-visible border border-gray-100 h-full">
                            <div className="relative">
                                <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full rounded-t-xl" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    Tournament Summary
                                </h3>
                                <div className="text-lg leading-relaxed text-gray-700">
                                    <p>
                                       NWL Season 3 was one filled with controversy relating to whose allowed to play on certain teams and their eligibility. After this was cleared up the finals stage progressed where the TRR would make a valiant run through the losers bracket to force a bracket reset against the KRA before beating them in the finals. The 63e would fall up short once again despite achieving another third place result.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Winners Section */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-white rounded-xl shadow-lg overflow-visible border border-gray-100 h-full">
                            <div className="relative">
                                <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full rounded-t-xl" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    Top Winners
                                </h3>
                                <ul className="space-y-4">
                                    {/* Winner */}
                                    <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                                        <i className="fas fa-trophy text-yellow-500 text-2xl"></i>
                                        <span className="text-lg font-semibold text-gray-800">
                                            Winner: TRR
                                        </span>
                                    </li>
                                    {/* Second */}
                                    <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                                        <i className="fas fa-medal text-gray-400 text-2xl"></i>
                                        <span className="text-lg font-semibold text-gray-800">
                                            Second: KRA
                                        </span>
                                    </li>
                                    {/* Third */}
                                    <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                                        <i className="fas fa-award text-orange-500 text-2xl"></i>
                                        <span className="text-lg font-semibold text-gray-800">
                                            Third: 63e
                                        </span>
                                    </li>
                                </ul>
                                {/* Calendar */}
                                <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md border border-gray-100 mt-4">
                                    <i className="fa-regular fa-calendar text-sky-600 text-xl"></i>
                                    <span className="text-lg font-semibold text-gray-800">
                                        May 2021 - August 2021
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
                                src={NWLSeason3Logo}
                                alt="NWL Season 3"
                                className="object-contain w-full rounded-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* Team Stats Section - Side by side */}
                <section className="flex flex-col md:flex-row gap-6 mb-12">
                    {/* Group A */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-white rounded-xl shadow-lg overflow-visible border border-gray-100 h-full">
                            <div className="relative">
                                <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full rounded-t-xl" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    Group Stage - Group A
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Rank
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Team
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    W-L-T
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Points
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">45e</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">5-0-0</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">39</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">7.Fuß</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">4-1-0</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">29</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">26th</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">3-2-0</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">24</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">63e</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">2-3-0</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">18</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">Nr. 39</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">0-4-1</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">6</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">6</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">33rd</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">0-4-1</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">4</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Group B */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-white rounded-xl shadow-lg overflow-visible border border-gray-100 h-full">
                            <div className="relative">
                                <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-1 w-full rounded-t-xl" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    Group Stage - Group B
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Rank
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Team
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    W-L-T
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Points
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">TRR</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">3-0-1</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">27</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">KRA</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">3-1-0</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">24</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">TRRB</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">2-1-1</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">20</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">8thLR</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">1-3-0</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">9</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">Lgn-Mid</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">0-4-0</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default NWLSeason3;