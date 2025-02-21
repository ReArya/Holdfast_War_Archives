import React, { useState } from 'react';
import ThreeVersusThreeTourneyIIILogo from '../assets/Three v Three Tourney III.svg';
import ThreeVersusThreeTourneyIIITeams from '../assets/Teams 3v3 Tourney III.png';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS




const ThreeVersusThreeTourneyIII = () => {
    const [is1v1DropdownOpen, setIs1v1DropdownOpen] = useState(false);
    const [isGroupfightDropdownOpen, setIsGroupfightDropdownOpen] = useState(false);

    const toggle1v1Dropdown = () => {
        setIs1v1DropdownOpen(!is1v1DropdownOpen);
    };

    const toggleGroupfightDropdown = () => {
        setIsGroupfightDropdownOpen(!isGroupfightDropdownOpen);
    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Holdfast War Archives
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-600">
            3 v 3 Tourney III
        </h2>
      </header>

      {/* Content Section */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="flex flex-col md:flex-row gap-8 items-start">
          {/* Paragraph Section */}
          <div className="flex-1 text-lg leading-relaxed text-gray-700 text-center">
            <p>
               This is the third iteration of the random three versus three tournaments that was hosted by Austro. Teams were selected at random and fought for the 3 versus 3 crown. Team Charlie which consisted of Peprika, Fires, Gondal, Henry, and Iron won the tourney over a series of hardfought matches throughtout the tournament that came to the wire during the Semifinals and Finals matches over team Delta and Eagle respectively. This would be the last 3 versus 3 tourney that was ran by Austro at the old HMS discord. 
            </p>
          </div>

          {/* Winners Section */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-center">
              Top Winners
            </h3>
            <ul className="space-y-4">
              {/* Winner */}
              <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md">
                <i className="fas fa-trophy text-yellow-500 text-2xl"></i>
                <span className="text-lg font-semibold text-gray-800">
                  Winner: Team Charlie (Peprika, Fires, Gondal, Henry, Iron)
                </span>
              </li>
              {/* Second */}
              <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md">
                <i className="fas fa-medal text-gray-400 text-2xl"></i>
                <span className="text-lg font-semibold text-gray-800">
                  Second: Team Eagle (Rave, Wings, ChromeOps, Alyx, Kill1)
                </span>
              </li>
              {/* Third */}
              <li className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md">
                <i className="fas fa-award text-orange-500 text-2xl"></i>
                <span className="text-lg font-semibold text-gray-800">
                  Third: Team Delta (Perc, Gustav, Shmadie, Hotspot, Dumbbell)
                </span>
              </li>
            </ul>
            {/* Calendar */}
            <div className="flex items-center justify-start mt-6 space-x-3">
              <i className="fa-regular fa-calendar text-gray-600 text-xl"></i>
              <span className="text-lg font-semibold text-gray-800">
                August 2021
              </span>
            </div>
          </div>
        </section>

                <section className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Challonge Section */}
        <section className="flex items-center justify-center w-1/2">
            <img
            src={ThreeVersusThreeTourneyIIILogo}
            alt="Three Versus Three Tourney III"
            className="object-contain w-full max-w-3xl h-auto rounded-lg shadow-lg"
            />
        </section>

        {/* Teams Section */}
        <section className="flex items-center justify-center w-1/2">
            <img
            src={ThreeVersusThreeTourneyIIITeams}
            alt="Three Versus Three Tourney III"
            className="object-contain w-full max-w-3xl h-auto rounded-lg shadow-lg"
            />
        </section>
        </section>


        <section className="flex flex-col md:flex-row gap-8 items-start">
                    {/* 1v1 Tournament Dropdown */}
                    <div className="max-w-2xl mx-auto px-4 py-8">
                        <button 
                            type="button" 
                            onClick={toggle1v1Dropdown}
                            className="inline-flex w-full justify-center gap-x-1 rounded-md bg-white px-4 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            id="1v1-menu-button" 
                            aria-expanded={is1v1DropdownOpen} 
                            aria-haspopup="true"
                        >
                            1v1 Tournament List
                            <svg 
                                className={`-mr-1 w-10 h-5 text-gray-400 transform transition-transform ${is1v1DropdownOpen ? 'rotate-180' : ''}`} 
                                viewBox="0 0 20 20" 
                                fill="currentColor" 
                                aria-hidden="true"
                            >
                                <path 
                                    fillRule="evenodd" 
                                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" 
                                    clipRule="evenodd" 
                                />
                            </svg>
                        </button>

                        {is1v1DropdownOpen && (
                            <div 
                                className="z-10 mt-2 w-full max-h-60 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" 
                                role="menu" 
                                aria-orientation="vertical" 
                                aria-labelledby="1v1-menu-button" 
                                tabIndex="-1"
                            >
                                <div className="py-1" role="none">
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
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Groupfight Tournament Dropdown */}
                    <div className="max-w-2xl mx-auto px-4 py-8">
                        <button 
                            type="button" 
                            onClick={toggleGroupfightDropdown}
                            className="inline-flex w-full justify-center gap-x-1 rounded-md bg-white px-4 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            id="groupfight-menu-button" 
                            aria-expanded={isGroupfightDropdownOpen} 
                            aria-haspopup="true"
                        >
                            Groupfight Tournament List
                            <svg 
                                className={`-mr-1 w-10 h-5 text-gray-400 transform transition-transform ${isGroupfightDropdownOpen ? 'rotate-180' : ''}`} 
                                viewBox="0 0 20 20" 
                                fill="currentColor" 
                                aria-hidden="true"
                            >
                                <path 
                                    fillRule="evenodd" 
                                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" 
                                    clipRule="evenodd" 
                                />
                            </svg>
                        </button>

                        {isGroupfightDropdownOpen && (
                            <div 
                                className="z-10 mt-2 w-full max-h-60 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" 
                                role="menu" 
                                aria-orientation="vertical" 
                                aria-labelledby="groupfight-menu-button" 
                                tabIndex="-1"
                            >
                                <div className="py-1" role="none">
                                    <a href="/threeVersusThreeTourneyIII" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="groupfight-menu-item-0">3 v 3 Tourney III</a>
                                    {/* ... rest of groupfight tournament links ... */}
                                </div>
                            </div>
                        )}
                    </div>
                </section>


      </main>
    </div>
  );
};

export default ThreeVersusThreeTourneyIII;