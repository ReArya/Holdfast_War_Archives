import React, { useState } from 'react';

const TournamentHistoryLoad = () => {
    const [is1v1DropdownOpen, setIs1v1DropdownOpen] = useState(false);
    const [isGroupfightDropdownOpen, setIsGroupfightDropdownOpen] = useState(false);

    const toggle1v1Dropdown = () => setIs1v1DropdownOpen(!is1v1DropdownOpen);
    const toggleGroupfightDropdown = () => setIsGroupfightDropdownOpen(!isGroupfightDropdownOpen);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                    Holdfast War Archives
                </h1>
                <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-600 mb-4">
                    Tournament History
                </h2>
                <p className="text-center text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                    The tournament history page highlights the various 1v1 and groupfight melee tournaments that have taken place across Holdfast's lifecycle. Various players have competed to prove they are best individual 1v1 melee player by competing in these tournaments throughout the years. Those wishing to prove their worth in a team setting opt to form groupfight teams to compete and show their skills.
                </p>

                <br />

                <p className="text-center text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                    These tournaments can be viewed here by selecting a tournament through the dropdown menus below.
                </p>

                <br />

                {/* Container for videos and dropdowns side by side */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Video 1 */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                            <div className="aspect-video">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/GeDaYomnBuI?playlist=GeDaYomnBuI&loop=1&autoplay=1&mute=1"
                                    title="HH "
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 text-lg text-center mb-4">
                                    Video of the Summer 2022 Normal Tourney Gameplay
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Video 2 */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                            <div className="aspect-video">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/F2fXzVu_W_g?playlist=F2fXzVu_W_g&loop=1&autoplay=1&mute=1"
                                    title="NA Holdfast Competitive Leagues"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 text-lg text-center mb-4">
                                    Wraiths is the largest and most active NA melee server hosting various melee tournaments and leagues.
                                </p>
                                <p className="text-gray-700 text-lg text-center">
                                    Practice matches are hosted in the form of pickups so one can practice their melee skills.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dropdown Menus */}
                <div className="flex flex-col md:flex-row gap-6 mt-8">
                    {/* 1v1 Tournament Dropdown */}
                    <div className="w-full md:w-1/2">
                        <button
                            type="button"
                            onClick={toggle1v1Dropdown}
                            className="w-full bg-white px-4 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 rounded-md"
                        >
                            1v1 Tournament List
                            <svg
                                className={`w-6 h-6 inline-block ml-2 text-gray-400 transition-transform ${is1v1DropdownOpen ? 'rotate-180' : ''}`}
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
                        {is1v1DropdownOpen && (
                            <div className="mt-2 bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
                                <a href="/kumiteSeason1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="1v1-menu-item-0">Holdfast Kumite Season 1</a>
                                    <a href="/kumiteSeason2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-1">Holdfast Kumite Season 2</a>
                                    <a href="/kumiteSeason3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-2">Holdfast Kumite Season 3</a>
                                    <a href="/kumiteSeason4" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-3">Holdfast Kumite Season 4</a>
                                    <a href="/kumiteSeason5" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-4">Holdfast Kumite Season 5</a>
                                    <a href="/kumiteSeason6" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-5">Holdfast Kumite Season 6</a>
                                    <a href="/summer2023NormalTourney" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-6">Summer 2023 Normal Tourney</a>
                                    <a href="/summer2022NormalTourney" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-7">Summer 2022 Normal Tourney</a>
                                    <a href="/winter2021NormalTourney" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-8">Winter 2021 Normal Tourney</a>
                                    <a href="/july2021Leaderboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-9">July 2021 Leaderboard</a>
                                    <a href="/may2021Leaderboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-10">May 2021 Leaderboard</a>
                                    <a href="/april2021Leaderboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-11">April 2021 Leaderboard</a>
                                    <a href="/threeDayModdedNormalTourney" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-11">Three Day Modded Normal Tourney</a>
                                    <a href="/FHH" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-11">FHH</a>
                                    <a href="/fifthNormalTourney" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-11">5th Normal Tourney</a>
                                    <a href="/kingOfFighters2019" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-11">King of Fighters 2019</a>
                                    <a href="/fourthNormalTourney" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-11">4th Normal Tourney</a>
                                    <a href="/thirdNormalTourney" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-11">3rd Normal Tourney</a>
                                    <a href="/secondNormalTourney" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-11">2nd Normal Tourney</a>
                                    <a href="/firstNormalTourney" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-11">1st Normal Tourney</a>
                            </div>
                        )}
                    </div>

                    {/* Groupfight Tournament Dropdown */}
                    <div className="w-full md:w-1/2">
                        <button
                            type="button"
                            onClick={toggleGroupfightDropdown}
                            className="w-full bg-white px-4 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 rounded-md"
                        >
                            Groupfight Tournament List
                            <svg
                                className={`w-6 h-6 inline-block ml-2 text-gray-400 transition-transform ${isGroupfightDropdownOpen ? 'rotate-180' : ''}`}
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
                        {isGroupfightDropdownOpen && (
                            <div className="mt-2 bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
                                <a href="/threeVersusThreeTourneyII" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="groupfight-menu-item-0">3 v 3 Tourney II</a>
                                <a href="/threeVersusThreeTourneyIII" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="groupfight-menu-item-0">3 v 3 Tourney III</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentHistoryLoad;