import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Pagination } from '@material-ui/lab';
import { CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const PlayerStatsPage = () => {
  const [playerData, setPlayerData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStat, setSelectedStat] = useState('Score');
  const [suggestions, setSuggestions] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, total: 0, pages: 0, limit: 10 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Use relative URLs instead of hardcoded localhost
  // This will work in both development and production environments
  const API_BASE_URL = '';

  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm.trim()) {
        await fetchSuggestions(searchTerm);
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  const fetchPlayers = async (page = pagination.currentPage, search = searchTerm) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/Pickups/public?page=${page}&limit=${pagination.limit}&search=${search}&sort=-Date`
      );

      const { data, pagination: paginationData } = response.data;
      const exactMatches = data.filter((record) => record.Player === search);
      if (exactMatches.length > 0) {
        setPlayerData(exactMatches);
        setPagination((prev) => ({
          ...prev,
          ...paginationData,
          currentPage: page,
        }));
      } else {
        setPlayerData([]);
        setError(`No exact match found for "${search}".`);
      }
    } catch (err) {
      setError(`Failed to load player data. Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestions = async (search) => {
    try {
      const response = await axios.get(`/Pickups/suggestions?search=${search}`);
      if (response.data && Array.isArray(response.data)) {
        setSuggestions(response.data);
      }
    } catch (err) {
      console.error('Failed to load suggestions:', err);
    }
  };

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handlePageChange = (event, newPage) => {
    fetchPlayers(newPage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchPlayers(1, searchTerm);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-2 w-full" />

      <header className={`max-w-6xl mx-auto px-4 pt-12 pb-8 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-2">
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-3">
            Individual Statistics
          </span>
        </div>
        <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
          Holdfast War Archives
        </h1>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-sky-700 mb-6">
          Player Performance Tracker
        </h2>
        <div className="w-24 h-1 bg-sky-700 mx-auto mb-8 rounded-full" />
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Search for a player to view their performance statistics across multiple games.
        </p>
      </header>

      <main className={`max-w-6xl mx-auto px-4 pb-16 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative bg-white rounded-xl shadow-lg overflow-visible transition-all duration-200 hover:shadow-xl border border-gray-100">
          <div className="absolute top-0 left-0 w-full h-1 bg-sky-600" />
          
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Single Player Performance Statistics
              </h3>

              <form onSubmit={handleSubmit} className="w-full sm:w-auto">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      placeholder="Search players..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        debouncedSearch(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {suggestions.length > 0 && (
              <div className="mt-2 sm:ml-auto sm:w-72">
                <div className="bg-white shadow-md rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                  {suggestions.map((player) => (
                    <div
                      key={player}
                      onClick={() => {
                        setSearchTerm(player);
                        fetchPlayers(1, player);
                        setSuggestions([]);
                      }}
                      className="px-4 py-2 hover:bg-sky-50 cursor-pointer text-sm text-gray-700 hover:text-sky-700"
                    >
                      {player}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="px-6 py-3 text-red-600 bg-red-50 border-l-4 border-red-500">
              {error}
            </div>
          )}

          <div className="p-6">
            {isLoading ? (
              <div className="py-12 flex justify-center">
                <CircularProgress style={{ color: '#0284c7' }} />
              </div>
            ) : (
              <>
                {playerData.length > 0 ? (
                  <div>
                    <div className="mb-8">
                      <label htmlFor="stat-select" className="block text-sm font-medium text-gray-700 mb-2">
                        Select Statistic to Visualize
                      </label>
                      <div className="relative w-full sm:w-64">
                        <select
                          id="stat-select"
                          value={selectedStat}
                          onChange={(e) => setSelectedStat(e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md bg-white"
                        >
                          <option value="Score">Score</option>
                          <option value="Kills">Kills</option>
                          <option value="Deaths">Deaths</option>
                          <option value="Assists">Assists</option>
                          <option value="Blocks">Blocks</option>
                          <option value="Team Kills">Team Kills</option>
                          <option value="Impact Rating">Impact Rating</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md mb-8 border border-gray-100">
                      <h4 className="text-lg font-medium text-sky-700 mb-4">Performance Over Time</h4>
                      <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={[...playerData].sort((a, b) => new Date(a.Date) - new Date(b.Date))}
                            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                              dataKey={(record) => {
                                const date = new Date(record.Date);
                                if (isNaN(date.getTime())) {
                                  // Handle invalid date
                                  return "Invalid Date";
                                }
                                return date.toLocaleDateString();  
                              }}
                              tick={{ fontSize: 12, fill: '#4b5563' }}
                              angle={-45}
                              textAnchor="end"
                              height={70}
                            />
                            <YAxis tick={{ fontSize: 12, fill: '#4b5563' }} />
                            <Tooltip 
                              contentStyle={{ 
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                border: '1px solid #e5e7eb',
                              }} 
                              formatter={(value) => [value, selectedStat]}
                            />
                            <Legend wrapperStyle={{ paddingTop: 10 }} />
                            <Line
                              type="monotone"
                              dataKey={selectedStat}
                              stroke="#0284c7"
                              strokeWidth={2}
                              dot={{ r: 4, fill: '#0284c7', strokeWidth: 0 }}
                              activeDot={{ r: 6, fill: '#0284c7', stroke: '#fff', strokeWidth: 2 }}
                              name={selectedStat}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                      <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <h4 className="text-lg font-medium text-sky-700">Performance Records</h4>
                        <p className="text-sm text-gray-600">Showing most recent records first</p>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Score
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Kills
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Deaths
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Assists
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Blocks
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Team Kills
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Impact Rating
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Regiment
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Win
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {playerData.map((record) => (
                              <tr key={record._id} className="hover:bg-sky-50 transition-colors">
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {new Date(record.Date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {record.Score}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {record.Kills}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {record.Deaths}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {record.Assists}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {record.Blocks}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {record['Team Kills']}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {record['Impact Rating']}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {record.Regiment}
                                  </span>
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm">
                                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${record.Win ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {record.Win ? 'Victory' : 'Defeat'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {pagination.pages > 1 && (
                        <div className="flex justify-center py-4 bg-gray-50 border-t border-gray-200">
                          <Pagination
                            count={pagination.pages}
                            page={pagination.currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="medium"
                            className="pagination-container"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <div className="bg-blue-50 rounded-lg p-6 max-w-lg mx-auto">
                      <div className="text-sky-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-700">
                        Enter an exact player name and press "Search" or select from suggestions to view all data points and statistics.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayerStatsPage;