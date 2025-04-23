import React, { useState, useEffect } from 'react';
import SinglePlayerStatistics from '../assets/SinglePlayerStatistic.png';
import ComparePlayerStatistics from '../assets/ComparePlayerStatistic.png';

const StatisticsLoad = () => {
  // Add subtle fade-in animation on page load
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Decorative Top Element */}
      <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-2 w-full" />
      
      {/* Header Section with improved styling */}
      <header className={`max-w-6xl mx-auto px-4 pt-12 pb-8 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-2">
        </div>
        <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
          Holdfast War Archives
        </h1>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-sky-700 mb-6">
          Holdfast Pickups Statistics
        </h2>
        <div className="w-24 h-1 bg-sky-700 mx-auto mb-8 rounded-full" />
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Holdfast Pickups are practice groupfights where the playerbase joins a voice call on Discord, and two captains pick their respective teams to practice against one another.
        </p>
        <p className="text-center font-medium text-lg text-sky-800 mt-4 mb-8">
          Choose how you'd like to view player statistics
        </p>
      </header>

      {/* Main Content with improved card design */}
      <main className={`max-w-6xl mx-auto px-4 pb-16 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {/* Individual Stats Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center gap-6">
            {/* Better Button Styling */}
            <a 
              href="/pickups" 
              className="block w-full group"
              aria-label="View individual player statistics"
            >
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group-hover:translate-y-[-4px] flex flex-col h-full border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-sky-600" />
                <div className="p-8 flex-grow flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-gray-800 text-xl font-semibold mb-3">Individual Player Statistics</h3>
                    <p className="text-gray-600">
                      Analyze performance metrics for a single player
                    </p>
                    <span className="inline-flex items-center mt-4 text-sky-600 font-medium group-hover:text-sky-700">
                      View Statistics
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </a>

            {/* Image Preview */}
            <div className="relative bg-white rounded-xl shadow-md p-6 w-full border border-gray-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-700 to-blue-600" />
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src={SinglePlayerStatistics}
                  alt="Individual Player Statistics Preview"
                  className="w-full h-auto transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-5 text-center">
                <p className="text-sky-600 font-medium mb-1">Preview</p>
                <p className="text-gray-600">
                  Detailed view of single player statistics dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Compare Stats Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center gap-6">
            {/* Better Button Styling */}
            <a 
              href="/comparePlayerPickups" 
              className="block w-full group"
              aria-label="Compare player statistics"
            >
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group-hover:translate-y-[-4px] flex flex-col h-full border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-sky-600" />
                <div className="p-8 flex-grow flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-gray-800 text-xl font-semibold mb-3">Compare Player Statistics</h3>
                    <p className="text-gray-600">
                      Side-by-side comparison between two players
                    </p>
                    <span className="inline-flex items-center mt-4 text-sky-600 font-medium group-hover:text-sky-700">
                      Compare Players
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </a>

            {/* Improved Image Preview - Added curved blue strip */}
            <div className="relative bg-white rounded-xl shadow-md p-6 w-full border border-gray-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-700 to-blue-600" />
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src={ComparePlayerStatistics}
                  alt="Player Comparison Statistics Preview"
                  className="w-full h-auto transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-5 text-center">
                <p className="text-sky-600 font-medium mb-1">Preview</p>
                <p className="text-gray-600">
                  Side-by-side comparison of two players' performance metrics
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatisticsLoad;