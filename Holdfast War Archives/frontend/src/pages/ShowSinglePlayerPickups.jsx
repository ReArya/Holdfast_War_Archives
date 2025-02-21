import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Container,
  Box,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
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

const StyledTableCell = styled(TableCell)({
  paddingTop: 16,
  paddingBottom: 16,
  '&.MuiTableCell-head': {
    backgroundColor: '#f5f5f5',
    fontWeight: 600,
  },
});

const StyledCard = styled(Card)({
  marginTop: 24,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
});

const HeaderActions = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
});

const SearchField = styled(TextField)({
  width: '300px',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
  },
});

const ScrollableContainer = styled(CardContent)({
  maxHeight: '800px',
  overflowY: 'auto',
  padding: 0,
});

const PlayerStatsPage = () => {
  const [playerData, setPlayerData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStat, setSelectedStat] = useState('Score');
  const [suggestions, setSuggestions] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, total: 0, pages: 0, limit: 10 });

  const debouncedSearch = React.useCallback(
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
        `http://localhost:5555/Pickups/public?page=${page}&limit=${pagination.limit}&search=${search}`
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
      const response = await axios.get(`http://localhost:5555/Pickups/suggestions?search=${search}`);
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
  }, [searchTerm]);

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
    <div style={{ backgroundColor: '#f7f9fc', minHeight: '100vh', paddingTop: 32 }}>
      <Container maxWidth="xl">
        <StyledCard>
          <CardHeader
            title={<Typography variant="h5">Player Performance Statistics</Typography>}
            action={
              <HeaderActions>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <Box display="flex" gap={2} alignItems="center">
                    <SearchField
                      variant="outlined"
                      size="small"
                      placeholder="Search players..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        debouncedSearch(e.target.value);
                      }}
                      InputProps={{
                        startAdornment: <SearchIcon style={{ color: '#666', marginRight: 8 }} />,
                      }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                      Search
                    </Button>
                  </Box>
                </form>
                {suggestions.length > 0 && (
                  <List>
                    {suggestions.map((player) => (
                      <ListItem
                        button
                        key={player}
                        onClick={() => {
                          setSearchTerm(player);
                          fetchPlayers(1, player);
                        }}
                      >
                        <ListItemText primary={player} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </HeaderActions>
            }
            style={{ paddingBottom: 24 }}
          />
          {error && (
            <Typography color="error" style={{ padding: '0 16px' }}>
              {error}
            </Typography>
          )}
          <ScrollableContainer>
            {isLoading ? (
              <Box p={4} display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <>
                {playerData.length > 0 ? (
                  <>
                    <FormControl variant="outlined" size="small" style={{ marginBottom: 16 }}>
                      <InputLabel id="stat-select-label">Statistic</InputLabel>
                      <Select
                        labelId="stat-select-label"
                        value={selectedStat}
                        onChange={(e) => setSelectedStat(e.target.value)}
                        label="Statistic"
                      >
                        <MenuItem value="Score">Score</MenuItem>
                        <MenuItem value="Kills">Kills</MenuItem>
                        <MenuItem value="Deaths">Deaths</MenuItem>
                        <MenuItem value="Assists">Assists</MenuItem>
                        <MenuItem value="Blocks">Blocks</MenuItem>
                      </Select>
                    </FormControl>

                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart
                        data={playerData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={(record) => new Date(record.Date).toLocaleDateString()} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey={selectedStat}
                          stroke="#8884d8"
                          name={selectedStat}
                        />
                      </LineChart>
                    </ResponsiveContainer>

                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Date</StyledTableCell>
                          <StyledTableCell>Score</StyledTableCell>
                          <StyledTableCell>Kills</StyledTableCell>
                          <StyledTableCell>Deaths</StyledTableCell>
                          <StyledTableCell>Assists</StyledTableCell>
                          <StyledTableCell>Blocks</StyledTableCell>
                          <StyledTableCell>Team Kills</StyledTableCell>
                          <StyledTableCell>Impact Rating</StyledTableCell>
                          <StyledTableCell>Regiment</StyledTableCell>
                          <StyledTableCell>Win</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {playerData.map((record) => (
                          <TableRow key={record._id} hover>
                            <StyledTableCell>
                              {new Date(record.Date).toLocaleDateString()}
                            </StyledTableCell>
                            <StyledTableCell>{record.Score}</StyledTableCell>
                            <StyledTableCell>{record.Kills}</StyledTableCell>
                            <StyledTableCell>{record.Deaths}</StyledTableCell>
                            <StyledTableCell>{record.Assists}</StyledTableCell>
                            <StyledTableCell>{record.Blocks}</StyledTableCell>
                            <StyledTableCell>{record['Team Kills']}</StyledTableCell>
                            <StyledTableCell>{record['Impact Rating']}</StyledTableCell>
                            <StyledTableCell>{record.Regiment}</StyledTableCell>
                            <StyledTableCell>{record.Win ? 'Yes' : 'No'}</StyledTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Box display="flex" justifyContent="center" mt={2}>
                      <Pagination
                        count={pagination.pages}
                        page={pagination.currentPage}
                        onChange={handlePageChange}
                        color="primary"
                      />
                    </Box>
                  </>
                ) : (
                  <Box p={4} display="flex" justifyContent="center">
                    <Typography>
                      {'Enter an exact player name and press "Search" or select from suggestions to view all data points and statistics.'}
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </ScrollableContainer>
        </StyledCard>
      </Container>
    </div>
  );
};

export default PlayerStatsPage;
