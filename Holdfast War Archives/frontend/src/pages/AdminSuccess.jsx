// Albert Mendez IV
// AdminSuccess.jsx
// Holdfast War Archives
// Contains the admin functionality including CRUD operations

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Container,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  alpha,
  Chip,
  Skeleton,
  Snackbar,
  Alert,
  Divider,
  useTheme,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Tooltip,
  Badge,
  ClickAwayListener,
} from '@mui/material';
import { Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BarChartIcon from '@mui/icons-material/BarChart';
import debounce from 'lodash/debounce';

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#6573c3',
      dark: '#2c387e',
    },
    secondary: {
      main: '#f50057',
      light: '#f73378',
      dark: '#ab003c',
    },
    background: {
      default: '#f7f9fc',
      paper: '#ffffff',
    },
    success: {
      main: '#4caf50',
      dark: '#388e3c',
    },
    error: {
      main: '#f44336',
      dark: '#d32f2f',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#f5f7fa',
          fontWeight: 600,
          fontSize: '0.875rem',
          padding: '16px',
        },
        body: {
          padding: '16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
          overflow: 'visible',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        contained: {
          boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#f5f7fa',
          },
        },
      },
    },
    // Remove asterisks from required fields
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          display: 'none',
        },
      },
    },
  },
});

const AdminPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const searchInputRef = useRef(null);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/Admin';
    } else {
      // Set authorization header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.baseURL = 'http://localhost:5555';
    }
  }, []);

  // States
  const [playerData, setPlayerData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    total: 0,
    pages: 0,
    limit: 10
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // New state for autocomplete suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Modal states 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({
    Player: '',
    Score: 0,
    Kills: 0,
    Deaths: 0,
    Assists: 0,
    'Team Kills': 0,
    Blocks: 0,
    'Impact Rating': 0,
    Regiment: '',
    Win: false,
    Date: new Date().toLocaleDateString('en-CA'),
  });

  // Function to fetch player suggestions
  const fetchSuggestions = async (search) => {
    if (!search || search.length < 2) {
      setSuggestions([]);
      return;
    }
    
    try {
      const response = await axios.get(`/Pickups/suggestions?search=${encodeURIComponent(search)}`);
      if (response.data && Array.isArray(response.data)) {
        setSuggestions(response.data);
      }
    } catch (err) {
      console.error('Failed to load suggestions:', err);
      setSuggestions([]);
    }
  };

  // Debounced search for suggestions
  const debouncedSuggestionSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.trim() && searchTerm.length >= 2) {
        fetchSuggestions(searchTerm);
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  // Effect for suggestion search
  useEffect(() => {
    debouncedSuggestionSearch(searchTerm);
    return () => debouncedSuggestionSearch.cancel();
  }, [searchTerm, debouncedSuggestionSearch]);

  // Fetch player data - no longer tied to immediate search term changes
  const fetchPlayers = async (page = pagination.currentPage, search = searchTerm) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/Pickups?page=${page}&limit=${pagination.limit}&search=${search}&sort=Date&order=desc`
      );
      
      const { data, pagination: paginationData } = response.data;

      // Format dates in the received data
      const formattedData = data.map(item => ({
        ...item,
        // Keep the original Date for internal use
        formattedDate: new Date(item.Date).toLocaleDateString('en-US') // MM/DD/YYYY format
      }));

      setPlayerData(data);
      setPagination(prev => ({
        ...prev,
        ...paginationData,
        currentPage: page
      }));
    } catch (err) {
      setError(`Failed to load player data. Error: ${err.message}`);
      showNotification('Failed to load player data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchPlayers(1, '');
  }, []);

  // Handle page change 
  const handlePageChange = (event, newPage) => {
    fetchPlayers(newPage);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    fetchPlayers(1, searchTerm);
    setSuggestions([]);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (player) => {
    setSearchTerm(player);
    fetchPlayers(1, player);
    setSuggestions([]);
    setHighlightedIndex(-1);
    // Focus back on input after selection
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestions.length > 0 && 
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target) &&
        !event.target.closest('.suggestions-dropdown')
      ) {
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [suggestions.length]);

  // Reset highlighted index when suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  // Show notification
  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  // Modal handlers 
  const handleOpenModal = (mode, record = null) => {
    setModalMode(mode);
    setSelectedRecord(record);
    if (mode === 'edit' && record) {
      let dateForInput = '';
      
      if (record.Date) {
        // Parse the date without timezone interpretation
        const parts = new Date(record.Date).toLocaleDateString('en-US').split('/');
        if (parts.length === 3) {
          const [month, day, year] = parts;
          // Format as YYYY-MM-DD with proper padding
          dateForInput = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
      }
      
      // If parsing failed for any reason, use current date
      if (!dateForInput) {
        const today = new Date();
        dateForInput = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      }

      setFormData({
        Player: record.Player || '',
        Score: record.Score || 0,
        Kills: record.Kills || 0,
        Deaths: record.Deaths || 0,
        Assists: record.Assists || 0,
        'Team Kills': record['Team Kills'] || 0,
        Blocks: record.Blocks || 0,
        'Impact Rating': record['Impact Rating'] || 0,
        Regiment: record.Regiment || '',
        Win: record.Win === 1 || record.Win === true,
        Date: dateForInput
      });
    } else {
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
      setFormData({
        Player: '',
        Score: 0,
        Kills: 0,
        Deaths: 0,
        Assists: 0,
        'Team Kills': 0,
        Blocks: 0,
        'Impact Rating': 0,
        Regiment: '',
        Win: false,
        Date: formattedDate
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
    setFormData({
      Player: '',
      Score: 0,
      Kills: 0,
      Deaths: 0,
      Assists: 0,
      'Team Kills': 0,
      Blocks: 0,
      'Impact Rating': 0,
      Regiment: '',
      Win: false,
      Date: new Date().toLocaleDateString('en-CA'),
    });
  };

  // Form handlers 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Win' ? (value === 'true' || value === true) : value
    }));
  };

  // CRUD operations (updated with axios)
  const handleCreate = async () => {
    try {
      const numericFields = ['Score', 'Kills', 'Deaths', 'Assists', 'Team Kills', 'Blocks', 'Impact Rating'];

      const [year, month, day] = formData.Date.split('-');
      const formattedDate = `${parseInt(month)}/${parseInt(day)}/${year}`;

      const processedFormData = {
        ...formData,
        ...Object.fromEntries(
          numericFields.map(field => [
            field,
            Number(formData[field])
          ])
        ),
        Win: formData.Win === 'true' || formData.Win === true ? 1 : 0,
        Date: formattedDate
      };
      
      const response = await axios.post('/Pickups/insertPlayer', processedFormData);
      
      handleCloseModal();
      fetchPlayers(pagination.currentPage);
      showNotification('Player record created successfully');
    } catch (error) {
      console.error("Full Error:", error);
      setError(error.response?.data?.message || error.message);
      showNotification(error.response?.data?.message || 'Failed to create record', 'error');
    }
  };

  // handles the update of a player record
  const handleUpdate = async () => {
    try {
      if (!selectedRecord?._id) {
        throw new Error('No record selected for update');
      }
      
      const numericFields = ['Score', 'Kills', 'Deaths', 'Assists', 'Team Kills', 'Blocks', 'Impact Rating'];
      const [year, month, day] = formData.Date.split('-');
      const formattedDate = `${parseInt(month)}/${parseInt(day)}/${year}`;

      const processedFormData = {
        ...formData,
        ...Object.fromEntries(
          numericFields.map(field => [
            field,
            Number(formData[field])
          ])
        ),
        Win: formData.Win === true ? 1 : 0,
        Date: formattedDate
      };
      
      const response = await axios.put(`/Pickups/${selectedRecord._id}`, processedFormData);
      
      handleCloseModal();
      fetchPlayers(pagination.currentPage);
      showNotification('Player record updated successfully');
    } catch (error) {
      console.error("Full Error:", error);
      setError(error.response?.data?.message || error.message);
      showNotification(error.response?.data?.message || 'Failed to update record', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      const response = await axios.delete(`/Pickups/${id}`);
      fetchPlayers(pagination.currentPage);
      showNotification('Player record deleted successfully');
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      showNotification(error.response?.data?.message || 'Failed to delete record', 'error');
    }
  };

  // Render table skeletons during loading
  const renderSkeletons = () => {
    return Array(5).fill(0).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        {Array(12).fill(0).map((_, cellIndex) => (
          <TableCell key={`cell-${index}-${cellIndex}`}>
            <Skeleton animation="wave" height={24} />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <AppBar position="static" 
          sx={{
            backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          <Toolbar>
            <Box display="flex" alignItems="center">
              <EmojiEventsIcon sx={{ mr: 1.5 }} />
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                Player Stats Dashboard
              </Typography>
            </Box>
            <Box ml="auto">
              <Button 
                color="inherit" 
                startIcon={<BarChartIcon />}
                sx={{ ml: 1, fontWeight: 500 }}
              >
                Analytics
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Card sx={{ mb: 3, p: 2, borderRadius: 2 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Welcome to the Admin Dashboard
            </Typography>
            <Typography variant="body1">
              Manage player data, view statistics, and keep track of game performance. Use the search bar to find specific players.
            </Typography>
          </Card>
          
          <Card>
            <CardHeader
              title={
                <Box display="flex" alignItems="center">
                  <Typography variant="h5" color="primary">Player Pickups Data</Typography>
                  <Badge 
                    badgeContent={pagination.total || 0}
                    color="primary"
                    max={9999999}
                    sx={{ ml: 4 }}
                  />
                </Box>
              }
              action={
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  flexDirection: isTablet ? 'column' : 'row',
                  alignItems: isTablet ? 'flex-end' : 'center'
                }}>
                  <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
                    <Box sx={{ position: 'relative' }}>
                      <TextField
                        inputRef={searchInputRef}
                        variant="outlined"
                        size="small"
                        placeholder="Search players..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setHighlightedIndex(-1);
                        }}
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
                          }
                        }}
                        sx={{
                          width: isTablet ? '100%' : '300px',
                          backgroundColor: theme.palette.background.paper,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            pr: 0,
                          }
                        }}
                        InputProps={{
                          startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                          endAdornment: searchTerm && (
                            <IconButton 
                              size="small" 
                              onClick={() => setSearchTerm('')}
                              sx={{ mr: 0.5 }}
                            >
                              <CancelIcon fontSize="small" />
                            </IconButton>
                          )
                        }}
                        autoComplete="off"
                      />
                      
                      {/* Suggestions dropdown */}
                      {suggestions.length > 0 && (
                        <Box
                          className="suggestions-dropdown"
                          sx={{
                            position: 'absolute',
                            zIndex: 10,
                            mt: 0.5,
                            width: '100%',
                            maxHeight: '300px',
                            overflow: 'auto',
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            boxShadow: 3,
                            border: '1px solid',
                            borderColor: 'divider'
                          }}
                        >
                          {suggestions.map((player, index) => (
                            <Box
                              key={player}
                              onClick={() => handleSuggestionSelect(player)}
                              sx={{
                                px: 2,
                                py: 1,
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                bgcolor: index === highlightedIndex 
                                  ? alpha(theme.palette.primary.main, 0.1)
                                  : 'transparent',
                                color: index === highlightedIndex 
                                  ? 'primary.main'
                                  : 'text.primary',
                                '&:hover': {
                                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                                  color: 'primary.main'
                                }
                              }}
                              onMouseEnter={() => setHighlightedIndex(index)}
                            >
                              {player}
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="medium"
                      sx={{ px: 2 }}
                    >
                      Search
                    </Button>
                  </form>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenModal('create')}
                    sx={{ 
                      px: 2, 
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Add Player
                  </Button>
                </Box>
              }
              sx={{ pb: 2 }}
            />
            {error && (
              <Alert severity="error" sx={{ mx: 2, mb: 2 }}>
                {error}
              </Alert>
            )}
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  width: '100%',
                  overflow: 'auto',
                  maxHeight: '600px'
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: 180, fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ minWidth: 80 }}>Score</TableCell>
                      <TableCell sx={{ minWidth: 80 }}>Kills</TableCell>
                      <TableCell sx={{ minWidth: 80 }}>Deaths</TableCell>
                      <TableCell sx={{ minWidth: 80 }}>Assists</TableCell>
                      <TableCell sx={{ minWidth: 100 }}>Team Kills</TableCell>
                      <TableCell sx={{ minWidth: 80 }}>Blocks</TableCell>
                      <TableCell sx={{ minWidth: 130 }}>Impact Rating</TableCell>
                      <TableCell sx={{ minWidth: 130 }}>Regiment</TableCell>
                      <TableCell sx={{ minWidth: 80 }}>Win</TableCell>
                      <TableCell sx={{ minWidth: 120 }}>Date</TableCell>
                      <TableCell sx={{ minWidth: 120 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading ? (
                      renderSkeletons()
                    ) : playerData.length > 0 ? (
                      playerData.map((record) => (
                        <TableRow key={record._id} hover>
                          <TableCell sx={{ fontWeight: 500 }}>{record.Player}</TableCell>
                          <TableCell>{record.Score}</TableCell>
                          <TableCell>{record.Kills}</TableCell>
                          <TableCell>{record.Deaths}</TableCell>
                          <TableCell>{record.Assists}</TableCell>
                          <TableCell>{record['Team Kills']}</TableCell>
                          <TableCell>{record.Blocks}</TableCell>
                          <TableCell>{record['Impact Rating']}</TableCell>
                          <TableCell>
                            {record.Regiment && (
                              <Chip 
                                label={record.Regiment} 
                                size="small" 
                                sx={{ 
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main,
                                  fontWeight: 500
                                }} 
                              />
                            )}
                          </TableCell>
                          <TableCell>
                          {record.Win ? (
                            <Chip 
                              icon={<CheckCircleIcon fontSize="small" />} 
                              label="Victory" 
                              size="small" 
                              sx={{ 
                                backgroundColor: alpha(theme.palette.success.main, 0.1),
                                color: theme.palette.success.main,
                                fontWeight: 500
                              }} 
                            />
                          ) : (
                            <Chip 
                              icon={<CancelIcon fontSize="small" />} 
                              label="Defeat" 
                              size="small" 
                              sx={{ 
                                backgroundColor: alpha(theme.palette.error.main, 0.1),
                                color: theme.palette.error.main,
                                fontWeight: 500
                              }} 
                            />
                          )}
                        </TableCell>
                          <TableCell>
                            {(() => {
                              if (!record.Date) return '';
                              const date = new Date(record.Date);
                              return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                            })()}
                          </TableCell>
                          <TableCell>
                            <Box display="flex" gap={1}>
                              <Tooltip title="Edit">
                                <IconButton 
                                  size="small" 
                                  color="primary" 
                                  onClick={() => handleOpenModal('edit', record)}
                                  sx={{ 
                                    backgroundColor: alpha(theme.palette.primary.main, 0.08), 
                                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.15) } 
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton 
                                  size="small" 
                                  color="error" 
                                  onClick={() => handleDelete(record._id)}
                                  sx={{ 
                                    backgroundColor: alpha(theme.palette.error.main, 0.08), 
                                    '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.15) } 
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={12} align="center" sx={{ py: 4 }}>
                          <Typography variant="subtitle1" color="text.secondary">
                            No players found
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Try changing your search criteria or add a new player
                          </Typography>
                          <Button 
                            variant="outlined" 
                            color="primary" 
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenModal('create')}
                            sx={{ mt: 2 }}
                          >
                            Add Player
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 2,
                  borderTop: `1px solid ${theme.palette.divider}`
                }}
              >
                <Pagination 
                  count={pagination.pages}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size={isMobile ? "medium" : "large"}
                />
              </Box>
            </CardContent>
          </Card>
        </Container>

        {/* Create/Edit Modal */}
        <Dialog 
          open={isModalOpen} 
          onClose={handleCloseModal} 
          maxWidth="md" 
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              '& .MuiDialogContent-root': {
                paddingTop: '10px !important', // Force spacing at top
              }
            }
          }}
        >
          <DialogTitle sx={{ 
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default,
            py: 3, 
          }}>
            <Typography variant="h6">
              {modalMode === 'create' ? 'Add New Player Record' : 'Edit Player Record'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box 
              display="grid" 
              gridTemplateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} 
              gap={3}
              mt={3} // Add margin top to the form container
            >
              <TextField
                label="Player Name"
                name="Player"
                value={formData.Player || ''}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Score"
                name="Score"
                type="number"
                value={formData.Score || 0}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Kills"
                name="Kills"
                type="number"
                value={formData.Kills || 0}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Deaths"
                name="Deaths"
                type="number"
                value={formData.Deaths || 0}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Assists"
                name="Assists"
                type="number"
                value={formData.Assists || 0}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Team Kills"
                name="Team Kills"
                type="number"
                value={formData['Team Kills'] || 0}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Blocks"
                name="Blocks"
                type="number"
                value={formData.Blocks || 0}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Impact Rating"
                name="Impact Rating"
                type="number"
                value={formData['Impact Rating'] || 0}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Regiment"
                name="Regiment"
                value={formData.Regiment || ''}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel>Win</InputLabel>
                <Select
                  name="Win"
                  value={formData.Win === 1 || formData.Win === true} 
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      Win: e.target.value
                    }));
                  }}
                  label="Win"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Date"
                name="Date"
                type="date"
                value={formData.Date || new Date().toLocaleDateString('en-CA')}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button onClick={handleCloseModal} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={modalMode === 'create' ? handleCreate : handleUpdate}
              color="primary"
              variant="contained"
              sx={{ px: 3 }}
            >
              {modalMode === 'create' ? 'Create' : 'Update'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notifications */}
        <Snackbar 
          open={notification.open} 
          autoHideDuration={6000} 
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseNotification} 
            severity={notification.severity} 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
};

export default AdminPage;