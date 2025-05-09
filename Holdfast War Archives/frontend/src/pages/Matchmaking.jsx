// Albert Mendez IV
// Matchmaking.jsx
// Holdfast War Archives
// Matchmaking Page with Enhanced Autocomplete

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Container,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  Divider,
  Paper,
  TextField,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import DeleteIcon from '@material-ui/icons/Delete';


const Matchmaking = () => {
  // State for animation
  const [isLoaded, setIsLoaded] = useState(false);
  
  // State for player search
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchInputRef = useRef(null);

  // State for selected players and matchmaking
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [matchedPlayers, setMatchedPlayers] = useState([]);
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [matchmakingComplete, setMatchmakingComplete] = useState(false);
  
  // Teams after matchmaking
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (term.trim() && term.length >= 2) {
        await fetchSuggestions(term);
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  // Set isLoaded to true after component mount for animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Use debounced search whenever searchTerm changes
  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestions.length > 0 && 
        !event.target.closest('.search-container') && 
        !event.target.closest('.suggestions-dropdown')
      ) {
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [suggestions.length]);

  // Reset highlighted index when suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  // Fetch player suggestions
  const fetchSuggestions = async (term) => {
    if (!term || term.length < 2) {
      setSuggestions([]);
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5555/Pickups/suggestions?search=${term}`);
      if (response.data && Array.isArray(response.data)) {
        setSuggestions(response.data);
      }
    } catch (err) {
      console.error('Failed to load suggestions:', err);
      setError(`Failed to load suggestions: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch player data by name
  const fetchPlayerData = async (playerName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5555/Pickups/public?search=${playerName}`
      );
      const { data } = response.data;
      const exactMatches = data.filter((record) => record.Player === playerName);
      
      if (exactMatches.length > 0) {
        // Calculate average impact rating for the player
        const totalImpact = exactMatches.reduce((sum, record) => sum + record['Impact Rating'], 0);
        const averageImpact = totalImpact / exactMatches.length;
        
        // Return player with their average impact rating
        return {
          name: playerName,
          impactRating: parseFloat(averageImpact.toFixed(2)),
          data: exactMatches
        };
      } else {
        setError(`No match found for "${playerName}".`);
        return null;
      }
    } catch (err) {
      setError(`Failed to load player data. Error: ${err.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Add player to selected list
  const addPlayer = async (playerName) => {
    // Check if player is already selected
    if (selectedPlayers.some(player => player.name === playerName)) {
      setError(`Player "${playerName}" is already selected.`);
      return;
    }
    
    const playerData = await fetchPlayerData(playerName);
    if (playerData) {
      setSelectedPlayers([...selectedPlayers, playerData]);
      setSearchTerm('');
      setSuggestions([]);
      setError(null);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (player) => {
    addPlayer(player);
    setSuggestions([]);
    setHighlightedIndex(-1);
    // Focus back on input after selection
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };
  
  // Handle key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        // If a suggestion is highlighted, select it
        handleSuggestionSelect(suggestions[highlightedIndex]);
      } else {
        // Otherwise try to add the current search term
        if (searchTerm.trim()) {
          addPlayer(searchTerm.trim());
        }
      }
    }
  };

  // Remove player from selected list
  const removePlayer = (playerName) => {
    setSelectedPlayers(selectedPlayers.filter(player => player.name !== playerName));
  };

  // Find matching players for balanced teams
  const findMatches = async () => {
    setIsMatchmaking(true);
    setMatchmakingComplete(false);
    setMatchedPlayers([]);
    setTeamA([]);
    setTeamB([]);
    
    try {
      // Get player suggestions via the public route with an empty search
      const response = await axios.get('http://localhost:5555/Pickups/public', {
        params: {
          limit: 50,  // Increase the limit to get more players at once
          page: 1
        }
      });
      
      // Check if we got data back
      if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid response format from server');
      }
      
      // Extract unique player names from the response
      let allPlayers = response.data.data;
      let uniquePlayers = {};
      
      // Group by player name to calculate average impact ratings
      allPlayers.forEach(player => {
        const playerName = player.Player;
        
        if (!uniquePlayers[playerName]) {
          uniquePlayers[playerName] = {
            name: playerName,
            totalImpact: player['Impact Rating'],
            count: 1,
            data: [player]
          };
        } else {
          uniquePlayers[playerName].totalImpact += player['Impact Rating'];
          uniquePlayers[playerName].count += 1;
          uniquePlayers[playerName].data.push(player);
        }
      });
      
      // Calculate average impact rating for each player
      const potentialMatches = Object.values(uniquePlayers).map(player => ({
        name: player.name,
        impactRating: parseFloat((player.totalImpact / player.count).toFixed(2)),
        data: player.data
      }));
      
      // Filter out already selected players
      const selectedPlayerNames = selectedPlayers.map(player => player.name);
      const filteredMatches = potentialMatches.filter(player => 
        !selectedPlayerNames.includes(player.name)
      );
      
      // Determine how many players we need to match
      const playersNeeded = selectedPlayers.length; // Equal number of players for each team
      
      // Calculate the average impact rating of selected players
      const avgSelectedImpact = selectedPlayers.reduce((sum, player) => sum + player.impactRating, 0) / selectedPlayers.length;
      
      // Sort potential matches by how close their impact rating is to the selected players' average
      filteredMatches.sort((a, b) => {
        return Math.abs(a.impactRating - avgSelectedImpact) - Math.abs(b.impactRating - avgSelectedImpact);
      });
      
      // Select the top N players needed
      const matchedPlayersNeeded = filteredMatches.slice(0, playersNeeded);
      setMatchedPlayers(matchedPlayersNeeded);
      
      // If we don't have enough players from the first page, try to get more
      if (matchedPlayersNeeded.length < playersNeeded && response.data.pagination.pages > 1) {
        setError(`Looking for more players (${matchedPlayersNeeded.length}/${playersNeeded})...`);
        
        // Try to get more pages of data until we have enough players or run out of pages
        let currentPage = 2;
        while (matchedPlayersNeeded.length < playersNeeded && 
               currentPage <= Math.min(5, response.data.pagination.pages)) { // Limit to 5 pages max
          
          const additionalResponse = await axios.get('http://localhost:5555/Pickups/public', {
            params: {
              limit: 50,
              page: currentPage
            }
          });
          
          if (additionalResponse.data && additionalResponse.data.data) {
            const additionalPlayers = additionalResponse.data.data;
            
            // Process additional players
            additionalPlayers.forEach(player => {
              const playerName = player.Player;
              
              // Skip if this player is already selected or already in our matches
              if (selectedPlayerNames.includes(playerName) || 
                  matchedPlayersNeeded.some(p => p.name === playerName)) {
                return;
              }
              
              // Calculate impact rating and add to matched players if needed
              const impactRating = player['Impact Rating'];
              
              // Add to matched players if we still need more
              if (matchedPlayersNeeded.length < playersNeeded) {
                matchedPlayersNeeded.push({
                  name: playerName,
                  impactRating: parseFloat(impactRating.toFixed(2)),
                  data: [player]
                });
              }
            });
          }
          
          currentPage++;
          setError(`Looking for more players (${matchedPlayersNeeded.length}/${playersNeeded})...`);
        }
      }
      
      // Create teams - all selected players on Team A, all matched players on Team B
      setTeamA([...selectedPlayers]);
      setTeamB([...matchedPlayersNeeded]);
      
      setMatchmakingComplete(true);
      setError(null); // Clear error/progress message
    } catch (err) {
      setError(`Matchmaking failed. Error: ${err.message}`);
    } finally {
      setIsMatchmaking(false);
    }
  };

  // Calculate team averages
  const getTeamAverage = (team) => {
    if (team.length === 0) return 0;
    return (team.reduce((sum, player) => sum + player.impactRating, 0) / team.length).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Decorative Top Element */}
      <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-2 w-full" />
      
      {/* Header Section */}
      <header className={`max-w-6xl mx-auto px-4 pt-12 pb-8 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-2">
        </div>
        <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
          Holdfast War Archives
        </h1>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-sky-700 mb-6">
          Matchmaking
        </h2>
        <div className="w-24 h-1 bg-sky-700 mx-auto mb-8 rounded-full" />
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Create balanced teams for practice matches based on player impact ratings from historical data.
          Simply select your players and let our system find suitable opponents.
        </p>
        <p className="text-center font-medium text-lg text-sky-800 mt-4 mb-8">
          Find competitive matchups for optimal practice
        </p>
      </header>

      {/* Main Content */}
      <main className={`max-w-6xl mx-auto px-4 pb-16 transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Player Search and Selection */}
          <div className="w-full md:w-1/2">
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-sky-600" />
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-gray-800 text-xl font-semibold mb-6 text-center">Add Players To Matchmake</h3>
                
                {/* Search Input with Enhanced Autocomplete */}
                <div className="mb-6 search-container">
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Search for a player"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => {
                      if (suggestions.length > 0) {
                        // Arrow down
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setHighlightedIndex((prev) => 
                            prev < suggestions.length - 1 ? prev + 1 : prev
                          );
                        }
                        // Arrow up
                        else if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
                        }
                        // Enter
                        else if (e.key === 'Enter' && highlightedIndex >= 0) {
                          e.preventDefault();
                          handleSuggestionSelect(suggestions[highlightedIndex]);
                        }
                        // Escape
                        else if (e.key === 'Escape') {
                          setSuggestions([]);
                          setHighlightedIndex(-1);
                        }
                      } else if (e.key === 'Enter') {
                        handleKeyPress(e);
                      }
                    }}
                    className="bg-white rounded-lg"
                    inputRef={searchInputRef}
                    InputProps={{
                      startAdornment: <SearchIcon className="mr-2 text-gray-400" />,
                      endAdornment: (
                        <IconButton 
                          onClick={() => searchTerm.trim() && addPlayer(searchTerm.trim())}
                          disabled={!searchTerm.trim()}
                          size="small"
                          className="text-sky-600 hover:text-sky-800"
                        >
                          <PersonAddIcon />
                        </IconButton>
                      )
                    }}
                    autoComplete="off"
                  />
                  
                  {isLoading && (
                    <div className="flex justify-center mt-2">
                      <CircularProgress size={24} className="text-sky-600" />
                    </div>
                  )}
                  
                  {/* Enhanced Suggestions Dropdown */}
                  {suggestions.length > 0 && (
                    <div className="suggestions-dropdown mt-1 absolute z-10 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
                      {suggestions.map((player, index) => (
                        <div
                          key={player}
                          onClick={() => handleSuggestionSelect(player)}
                          className={`px-4 py-2 cursor-pointer hover:bg-sky-50 flex justify-between items-center transition-colors duration-200 ${
                            index === highlightedIndex ? 'bg-sky-100 text-sky-700' : 'text-gray-700'
                          }`}
                          onMouseEnter={() => setHighlightedIndex(index)}
                        >
                          <span>{player}</span>
                          <PersonAddIcon fontSize="small" className="text-sky-600" />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {error && (
                    <div className="px-4 py-3 text-red-500 bg-red-50 border-l-4 border-red-400 mt-3 rounded-r-md">
                      {error}
                    </div>
                  )}
                </div>
                
                {/* Selected Players */}
                <div className="flex-grow flex flex-col">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Selected Players ({selectedPlayers.length})
                  </h4>
                  
                  {selectedPlayers.length === 0 ? (
                    <div className="text-gray-500 text-sm italic bg-gray-50 p-4 rounded-lg border border-gray-100 flex-grow">
                      No players selected yet. Search and add players above.
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 mb-6 bg-sky-50 p-3 rounded-lg border border-sky-100 flex-grow">
                      {selectedPlayers.map((player) => (
                        <Chip
                          key={player.name}
                          label={`${player.name} (${player.impactRating})`}
                          onDelete={() => removePlayer(player.name)}
                          deleteIcon={<DeleteIcon />}
                          className="m-1 bg-white shadow-sm"
                        />
                      ))}
                    </div>
                  )}
                  
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<GroupIcon />}
                    disabled={selectedPlayers.length === 0 || isMatchmaking}
                    onClick={findMatches}
                    className="mt-auto bg-sky-600 hover:bg-sky-700 transition-colors duration-200 py-3"
                    fullWidth
                  >
                    {isMatchmaking ? 'Finding Matches...' : 'Find Balanced Teams'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Matchmaking Results */}
          <div className="w-full md:w-1/2">
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-sky-600" />
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-gray-800 text-xl font-semibold mb-6 text-center">Matchmaking Results</h3>
                
                {isMatchmaking ? (
                  <div className="p-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg flex-grow">
                    <CircularProgress className="text-indigo-600 mb-4" />
                    <Typography className="text-gray-600">Finding balanced teams...</Typography>
                  </div>
                ) : matchmakingComplete ? (
                  <div className="transition-all duration-500 ease-in-out flex-grow flex flex-col">
                    <div className="flex justify-between mb-4">
                      <div className="text-lg font-medium text-blue-700">
                        Team A <span className="text-sm font-normal">(Avg: {getTeamAverage(teamA)})</span>
                      </div>
                      <div className="text-lg font-medium text-red-700">
                        Team B <span className="text-sm font-normal">(Avg: {getTeamAverage(teamB)})</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 flex-grow">
                      {/* Team A */}
                      <div className="flex-1 rounded-xl p-4 bg-blue-50 border border-blue-200 shadow-sm">
                        {teamA.map((player, index) => (
                          <div key={player.name} className="mb-2 last:mb-0">
                            <div className="flex justify-between items-center py-2">
                              <Typography className="font-medium">
                                {player.name}
                              </Typography>
                              <Chip
                                size="small"
                                label={player.impactRating}
                                className="bg-blue-100 text-blue-800"
                              />
                            </div>
                            {index < teamA.length - 1 && <Divider className="my-1" />}
                          </div>
                        ))}
                      </div>
                      
                      {/* Team B */}
                      <div className="flex-1 rounded-xl p-4 bg-red-50 border border-red-200 shadow-sm">
                        {teamB.map((player, index) => (
                          <div key={player.name} className="mb-2 last:mb-0">
                            <div className="flex justify-between items-center py-2">
                              <Typography className="font-medium">
                                {player.name}
                              </Typography>
                              <Chip
                                size="small"
                                label={player.impactRating}
                                className="bg-red-100 text-red-800"
                              />
                            </div>
                            {index < teamB.length - 1 && <Divider className="my-1" />}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="mb-2">✅ Teams created with balanced impact ratings</p>
                      <p>📊 Optimal competitive matchup for practice gameplay</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-12 text-gray-500 bg-gray-50 rounded-lg border border-gray-100 flex-grow flex flex-col justify-center items-center">
                    <GroupIcon style={{ fontSize: 48 }} className="mb-4 opacity-50 text-indigo-300" />
                    <p className="text-lg mb-2">Ready to create balanced teams</p>
                    <p className="text-gray-500">
                      Select players from the search panel and click "Find Balanced Teams"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mt-12">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-700 to-blue-600" />
          <div className="p-6">
            <h3 className="text-center text-2xl font-semibold text-gray-800 mb-8">How Matchmaking Works</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-sky-700 font-bold text-lg">1</span>
                </div>
                <h4 className="text-center text-lg font-medium text-gray-800 mb-3">Select Players</h4>
                <p className="text-center text-gray-600">
                  Search for players you want to practice with and add them to your selected list.
                  The system calculates their average impact rating.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-indigo-700 font-bold text-lg">2</span>
                </div>
                <h4 className="text-center text-lg font-medium text-gray-800 mb-3">Find Matches</h4>
                <p className="text-center text-gray-600">
                  The algorithm searches for players with similar impact ratings
                  to create balanced opposing teams of equal size.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-green-700 font-bold text-lg">3</span>
                </div>
                <h4 className="text-center text-lg font-medium text-gray-800 mb-3">Team Formation</h4>
                <p className="text-center text-gray-600">
                  Results display your selected players as Team A and matched opponents as Team B,
                  with team average ratings for comparison.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Matchmaking;