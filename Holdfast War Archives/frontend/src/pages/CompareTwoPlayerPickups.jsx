// Albert Mendez IV
// CompareTwoPlayerPickups.jsx
// Holdfast War Archives
// Compare Two Player Pickups Page

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

const PlayerComparisonPage = () => {
  // State for Player 1
  const [searchTerm1, setSearchTerm1] = useState('');
  const [suggestions1, setSuggestions1] = useState([]);
  const [playerData1, setPlayerData1] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);
  const [error1, setError1] = useState(null);
  const [pagination1, setPagination1] = useState({ currentPage: 1, total: 0, pages: 0, limit: 10 });

  // State for Player 2
  const [searchTerm2, setSearchTerm2] = useState('');
  const [suggestions2, setSuggestions2] = useState([]);
  const [playerData2, setPlayerData2] = useState([]);
  const [isLoading2, setIsLoading2] = useState(false);
  const [error2, setError2] = useState(null);
  const [pagination2, setPagination2] = useState({ currentPage: 1, total: 0, pages: 0, limit: 10 });

  // Common statistic selection for comparison
  const [selectedStat, setSelectedStat] = useState('Score');
  const [isLoaded, setIsLoaded] = useState(false);

  // Debounced search functions for each player
  const debouncedSearch1 = useCallback(
    debounce(async (term) => {
      if (term.trim()) {
        await fetchSuggestions1(term);
      } else {
        setSuggestions1([]);
      }
    }, 300),
    []
  );

  const debouncedSearch2 = useCallback(
    debounce(async (term) => {
      if (term.trim()) {
        await fetchSuggestions2(term);
      } else {
        setSuggestions2([]);
      }
    }, 300),
    []
  );

  // Fetch player data for Player 1
  const fetchPlayers1 = async (page = pagination1.currentPage, search = searchTerm1) => {
    setIsLoading1(true);
    setError1(null);
    try {
      const response = await axios.get(
        `http://localhost:5555/Pickups/public?page=${page}&limit=${pagination1.limit}&search=${search}&sort=-Date`
      );
      const { data, pagination: paginationData } = response.data;
      const exactMatches = data.filter((record) => record.Player === search);
      if (exactMatches.length > 0) {
        setPlayerData1(exactMatches);
        setPagination1((prev) => ({ ...prev, ...paginationData, currentPage: page }));
      } else {
        setPlayerData1([]);
        setError1(`No exact match found for "${search}".`);
      }
    } catch (err) {
      setError1(`Failed to load player data. Error: ${err.message}`);
    } finally {
      setIsLoading1(false);
    }
  };

  // Fetch player data for Player 2
  const fetchPlayers2 = async (page = pagination2.currentPage, search = searchTerm2) => {
    setIsLoading2(true);
    setError2(null);
    try {
      const response = await axios.get(
        `http://localhost:5555/Pickups/public?page=${page}&limit=${pagination2.limit}&search=${search}&sort=-Date`
      );
      const { data, pagination: paginationData } = response.data;
      const exactMatches = data.filter((record) => record.Player === search);
      if (exactMatches.length > 0) {
        setPlayerData2(exactMatches);
        setPagination2((prev) => ({ ...prev, ...paginationData, currentPage: page }));
      } else {
        setPlayerData2([]);
        setError2(`No exact match found for "${search}".`);
      }
    } catch (err) {
      setError2(`Failed to load player data. Error: ${err.message}`);
    } finally {
      setIsLoading2(false);
    }
  };

  // Fetch suggestions for Player 1
  const fetchSuggestions1 = async (term) => {
    try {
      const response = await axios.get(`http://localhost:5555/Pickups/suggestions?search=${term}`);
      if (Array.isArray(response.data)) {
        setSuggestions1(response.data);
      }
    } catch (err) {
      console.error('Failed to load suggestions for player1:', err);
    }
  };

  // Fetch suggestions for Player 2
  const fetchSuggestions2 = async (term) => {
    try {
      const response = await axios.get(`http://localhost:5555/Pickups/suggestions?search=${term}`);
      if (Array.isArray(response.data)) {
        setSuggestions2(response.data);
      }
    } catch (err) {
      console.error('Failed to load suggestions for player2:', err);
    }
  };

  useEffect(() => {
    debouncedSearch1(searchTerm1);
    return () => debouncedSearch1.cancel();
  }, [searchTerm1, debouncedSearch1]);

  useEffect(() => {
    debouncedSearch2(searchTerm2);
    return () => debouncedSearch2.cancel();
  }, [searchTerm2, debouncedSearch2]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Single submit handler that fetches both players' data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm1.trim() && searchTerm2.trim()) {
      fetchPlayers1(1, searchTerm1);
      fetchPlayers2(1, searchTerm2);
    }
  };

  const handlePageChange1 = (event, newPage) => {
    fetchPlayers1(newPage);
  };

  const handlePageChange2 = (event, newPage) => {
    fetchPlayers2(newPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Top horizontal blue gradient bar */}
      <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-2 w-full" />

      {/* Header Section */}
      <header className={`max-w-6xl mx-auto px-4 pt-12 pb-8 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-2">
        </div>
        <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
          Holdfast War Archives
        </h1>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-sky-700 mb-6">
          Player Comparison Performance
        </h2>
        <div className="w-24 h-1 bg-sky-700 mx-auto mb-8 rounded-full" />
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Compare the performance statistics of two players across multiple games.
        </p>
      </header>

      <main className={`max-w-6xl mx-auto px-4 pb-16 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative bg-white rounded-xl shadow-lg overflow-visible transition-all duration-200 hover:shadow-xl border border-gray-100">
          <div className="absolute top-0 left-0 w-full h-1 bg-sky-600" />
          
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Player vs Player Comparison
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col md:flex-row md:space-x-4 items-end">
                {/* Player 1 Search Input */}
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Player 1
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      placeholder="Search Player 1..."
                      value={searchTerm1}
                      onChange={(e) => {
                        setSearchTerm1(e.target.value);
                        debouncedSearch1(e.target.value);
                      }}
                    />
                  </div>
                  {suggestions1.length > 0 && (
                    <div className="bg-white shadow-md rounded-md border border-gray-200 max-h-60 overflow-y-auto mt-1">
                      {suggestions1.map((player) => (
                        <div
                          key={player}
                          onClick={() => {
                            setSearchTerm1(player);
                            fetchPlayers1(1, player);
                            setSuggestions1([]);
                          }}
                          className="px-4 py-2 hover:bg-sky-50 cursor-pointer text-sm text-gray-700 hover:text-sky-700"
                        >
                          {player}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Player 2 Search Input */}
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Player 2
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      placeholder="Search Player 2..."
                      value={searchTerm2}
                      onChange={(e) => {
                        setSearchTerm2(e.target.value);
                        debouncedSearch2(e.target.value);
                      }}
                    />
                  </div>
                  {suggestions2.length > 0 && (
                    <div className="bg-white shadow-md rounded-md border border-gray-200 max-h-60 overflow-y-auto mt-1">
                      {suggestions2.map((player) => (
                        <div
                          key={player}
                          onClick={() => {
                            setSearchTerm2(player);
                            fetchPlayers2(1, player);
                            setSuggestions2([]);
                          }}
                          className="px-4 py-2 hover:bg-sky-50 cursor-pointer text-sm text-gray-700 hover:text-sky-700"
                        >
                          {player}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                  {/* Statistic Selector */}
                  <div className="w-full md:w-1/3">
                  <label htmlFor="stat-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Statistic to Compare
                  </label>
                  <div className="relative w-full">
                    <select
                      id="stat-select"
                      value={selectedStat}
                      onChange={(e) => setSelectedStat(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md bg-white"
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
              </div>
              <div className="mt-4 text-right">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                >
                  Compare Players
                </button>
              </div>
            </form>

            {error1 && (
              <div className="px-6 py-3 mt-4 text-red-600 bg-red-50 border-l-4 border-red-500">
                {error1}
              </div>
            )}
            {error2 && (
              <div className="px-6 py-3 mt-2 text-red-600 bg-red-50 border-l-4 border-red-500">
                {error2}
              </div>
            )}
          </div>

          <div className="p-6">
            {(isLoading1 || isLoading2) ? (
              <div className="py-12 flex justify-center">
                <CircularProgress style={{ color: '#0284c7' }} />
              </div>
            ) : (
              <>
                {(playerData1.length > 0 && playerData2.length > 0) ? (
                  <div className="space-y-8">
                    {/* Side-by-Side Charts */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-8 border border-gray-100">
                      <h4 className="text-lg font-medium text-sky-700 mb-4">Performance Comparison: {selectedStat}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Player 1 Chart */}
                        <div className="bg-white p-4 rounded-lg border border-gray-100">
                          <h5 className="text-base font-medium text-gray-700 mb-2">{searchTerm1}'s {selectedStat}</h5>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={playerData1.map(record => ({
                                  date: new Date(record.Date).toLocaleDateString(),
                                  value: record[selectedStat],
                                  _id: record._id
                                }))}
                                margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis 
                                  dataKey="date" 
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
                                />
                                <Legend />
                                <Line
                                  type="monotone"
                                  dataKey="value"
                                  stroke="#0284c7"
                                  strokeWidth={2}
                                  dot={{ r: 4, fill: '#0284c7', strokeWidth: 0 }}
                                  activeDot={{ r: 6, fill: '#0284c7', stroke: '#fff', strokeWidth: 2 }}
                                  name={`${selectedStat}`}
                                  isAnimationActive={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        
                        {/* Player 2 Chart */}
                        <div className="bg-white p-4 rounded-lg border border-gray-100">
                          <h5 className="text-base font-medium text-gray-700 mb-2">{searchTerm2}'s {selectedStat}</h5>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={playerData2.map(record => ({
                                  date: new Date(record.Date).toLocaleDateString(),
                                  value: record[selectedStat],
                                  _id: record._id
                                }))}
                                margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis 
                                  dataKey="date" 
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
                                />
                                <Legend />
                                <Line
                                  type="monotone"
                                  dataKey="value"
                                  stroke="#10b981"
                                  strokeWidth={2}
                                  dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }}
                                  activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                                  name={`${selectedStat}`}
                                  isAnimationActive={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Player 1 Data Table */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden mb-8">
                      <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <h4 className="text-lg font-medium text-sky-700">Player 1: {searchTerm1}</h4>
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
                            {playerData1.map((record) => (
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
                      
                      <div className="flex justify-center py-4 bg-gray-50 border-t border-gray-200">
                        <Pagination
                          count={pagination1.pages}
                          page={pagination1.currentPage}
                          onChange={handlePageChange1}
                          color="primary"
                          size="medium"
                          className="pagination-container"
                        />
                      </div>
                    </div>

                    {/* Player 2 Data Table */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                      <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <h4 className="text-lg font-medium text-sky-700">Player 2: {searchTerm2}</h4>
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
                            {playerData2.map((record) => (
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
                      
                      <div className="flex justify-center py-4 bg-gray-50 border-t border-gray-200">
                        <Pagination
                          count={pagination2.pages}
                          page={pagination2.currentPage}
                          onChange={handlePageChange2}
                          color="primary"
                          size="medium"
                          className="pagination-container"
                        />
                      </div>
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
                        Enter exact player names and press "Compare Players" or select from suggestions to view and compare player statistics.
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
export default PlayerComparisonPage;