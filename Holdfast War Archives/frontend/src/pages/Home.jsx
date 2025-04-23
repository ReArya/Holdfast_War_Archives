import React, { useState, useEffect } from 'react';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Top border accent - kept straight (no rounded corners) */}
      <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-2 w-full" />

      {/* Header Section with enhanced styling - matching TournamentHistoryLoad */}
      <header className={`max-w-6xl mx-auto px-4 pt-12 pb-8 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-2">
        </div>
        <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
          Holdfast War Archives
        </h1>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-sky-700 mb-6">
          Home
        </h2>
        <div className="w-24 h-1 bg-sky-700 mx-auto mb-8 rounded-full" />
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Your single archive source for the North American Holdfast competitive circuit as well as pickups data!
        </p>
      </header>

      {/* Main content with improved spacing and shadows */}
      <main className={`max-w-6xl mx-auto px-4 pb-16 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Video 1 and containers 1&2 group */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            {/* Video 1 with description above */}
            <div className="bg-white rounded-xl shadow-md p-6 w-full border border-gray-100 relative overflow-hidden">
              {/* Curved blue line at top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-sky-600 rounded-b-md" />
              
              <div className="mb-5 text-center">
                <p className="text-sky-600 font-medium mb-1">Game Overview</p>
                <p className="text-gray-600">
                  Holdfast: Nations At War is a roleplay multiplayer shooter set during the Napoleonic Era and WW1
                </p>
              </div>
              
              <div className="overflow-hidden rounded-lg shadow-lg relative transition-transform hover:scale-[1.02] duration-300">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/Bcx4IL7XBRE?playlist=Bcx4IL7XBRE&loop=1&autoplay=1&mute=1"
                    title="Holdfast: Nations At War - Release Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Containers 1&2 with enhanced styling */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/2">
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-sky-600 rounded-b-md" />
                  <div className="p-6">
                    <a href="https://discord.gg/eMQxrPbYdJ" className="flex items-center space-x-4">
                      <i className="fa-brands fa-discord text-sky-600 text-3xl"></i>
                      <span className="text-gray-700">Holdfast Nations at War Discord Server</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-sky-600 rounded-b-md" />
                  <div className="p-6">
                    <a href="https://store.steampowered.com/app/589290/Holdfast_Nations_At_War/" className="flex items-center space-x-4">
                      <i className="fa-brands fa-steam text-sky-600 text-3xl"></i>
                      <span className="text-gray-700">Holdfast Nations at War Steam Page</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video 2 and containers 3&4 group */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            {/* Video 2 with description above */}
            <div className="bg-white rounded-xl shadow-md p-6 w-full border border-gray-100 relative overflow-hidden">
              {/* Curved blue line at top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-sky-600 rounded-b-md" />
              
              <div className="mb-5 text-center">
                <p className="text-sky-600 font-medium mb-1">North American Melee Community</p>
                <p className="text-gray-600">
                  Wraiths is the largest and most active North American melee server hosting various tournaments and leagues
                </p>
              </div>
              
              <div className="overflow-hidden rounded-lg shadow-lg relative transition-transform hover:scale-[1.02] duration-300">
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
              </div>
            </div>
            
            {/* Containers 3&4 with enhanced styling */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/2">
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-sky-600 rounded-b-md" />
                  <div className="p-6">
                    <a href="https://discord.gg/5NBDpURfsw" className="flex items-center space-x-4">
                      <i className="fa-brands fa-discord text-sky-600 text-3xl"></i>
                      <span className="text-gray-700">Wraiths Melee Discord Server</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-sky-600 rounded-b-md" />
                  <div className="p-6">
                    <a href="https://www.youtube.com/@WraithsMeleeServer" className="flex items-center space-x-4">
                      <i className="fa-brands fa-youtube text-sky-600 text-3xl"></i>
                      <span className="text-gray-700">Wraiths Melee Youtube Channel</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;