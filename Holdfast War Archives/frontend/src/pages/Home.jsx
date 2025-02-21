import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Header Section with enhanced styling */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Holdfast War Archives
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Your single archive source for the North American Holdfast competitive circuit as well as pickups data!
        </p>

        {/* Main content with improved spacing and shadows */}
        <div className="mt-12">
          {/* Videos and associated containers */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Video 1 and containers 1&2 group */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              {/* Video 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300 flex flex-col h-full">
                <div className="flex-none aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/Bcx4IL7XBRE?playlist=Bcx4IL7XBRE&loop=1&autoplay=1&mute=1"
                    title="Holdfast: Nations At War - Release Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6 flex-grow flex items-center">
                  <p className="text-gray-700 text-lg text-center w-full">
                    Holdfast: Nations At War is a multiplayer first and third-person shooter set during the great Napoleonic Era and WW1.
                  </p>
                </div>
              </div>
              
              {/* Containers 1&2 with hover effects */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-1/2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
                  <a href="https://discord.gg/eMQxrPbYdJ" className="flex items-center space-x-4"><i className="fa-brands fa-discord text-gray-500 text-3xl mb-2"></i>
                    <p>Holdfast Nations at War Discord Server</p>
                  </a>
                </div>
                <div className="w-full sm:w-1/2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
                  <a href="https://store.steampowered.com/app/589290/Holdfast_Nations_At_War/" className="flex items-center space-x-4"><i className="fa-brands fa-steam text-gray-500 text-3xl mb-2"></i>
                    <p>Holdfast Nations at War Steam Page</p>
                  </a>
                </div>
              </div>
            </div>

            {/* Video 2 and containers 3&4 group */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              {/* Video 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300 flex flex-col h-full">
                <div className="flex-none aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/F2fXzVu_W_g?playlist=F2fXzVu_W_g&loop=1&autoplay=1&mute=1"
                    title="NA Holdfast Competitive Leagues"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-center">
                  <p className="text-gray-700 text-lg text-center mb-4">
                    Wraiths is the largest and most active NA melee server hosting various melee tournaments, and leagues.
                  </p>
                  <p className="text-gray-700 text-lg text-center">
                    Practice matches are hosted in the form of pickups so one can practice their melee skills.
                  </p>
                </div>
              </div>
            
              {/* Containers 3&4 with hover effects */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-1/2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
                  <a href="https://discord.gg/5NBDpURfsw" className="flex items-center space-x-4"><i className="fa-brands fa-discord text-gray-500 text-3xl mb-2"></i>
                  
                  <p>Wraiths Melee Discord Server</p>
                  </a>
                  
              </div>
                <div className="w-full sm:w-1/2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
                <a href="https://www.youtube.com/@WraithsMeleeServer" className="flex items-center space-x-4"><i className="fa-brands fa-youtube text-gray-500 text-3xl mb-2"></i>
                  <p>Wraiths Melee Youtube Channel</p>
                </a>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;