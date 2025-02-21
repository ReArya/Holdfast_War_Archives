import React from 'react'

const RegimentRecordsLoad = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Header Section with enhanced styling */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Holdfast War Archives
        </h1>
        <h2 className="text-center text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          Regiment Records
        </h2>
        <p className="text-center text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          This page serves as an archive for North American Regiment Accolades
        </p>
      

       {/* Main content with improved spacing and shadows */}
       <div className="mt-12">
          {/* Container */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Gap  */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              {/* Container 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300 flex flex-col h-full">
            
                <div className="p-6 flex-grow flex items-center">
                  <p className="text-gray-700 text-lg text-center w-full">
                    Click here if you want to view Regiment melee groupfight records
                  </p>
                </div>
              </div>
            </div>

              {/* Container 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300 flex flex-col h-full">
            
                <div className="p-6 flex-grow flex items-center">
                  <p className="text-gray-700 text-lg text-center w-full">
                    Click here if you want to view Regiment tournament and league accolades
                  </p>
                </div>
              </div>


        </div>
        </div>

        </div>

    </div>
  )
}

export default RegimentRecordsLoad