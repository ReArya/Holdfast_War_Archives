import React, { useState, useEffect } from 'react';
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
  styled,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import debounce from 'lodash/debounce';

// Styled components (unchanged)
const StyledTableCell = styled(TableCell)({
  paddingTop: 16,
  paddingBottom: 16,
  '&.MuiTableCell-head': {
    backgroundColor: '#f5f5f5',
    fontWeight: 600,
  },
});

const ActionButtonsContainer = styled(Box)({
  display: 'flex',
  gap: 1,
  justifyContent: 'flex-end',
});

const StyledCard = styled(Card)({
  marginTop: 24,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
});

const HeaderActions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const SearchField = styled(TextField)({
  width: '300px',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
  },
});

const ScrollableContainer = styled(CardContent)({
  maxHeight: '600px',
  overflowY: 'auto',
  padding: 0,
  '& .MuiPagination-root': {
    position: 'sticky',
    bottom: 0,
    backgroundColor: '#fff',
    borderTop: '1px solid rgba(224, 224, 224, 1)',
    zIndex: 1,
    padding: '16px 0',
  },
});

const AdminPage = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    total: 0,
    pages: 0,
    limit: 10
  });

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

  // Debounced search function 
  const debouncedSearch = React.useCallback(
    debounce((searchTerm) => {
      fetchPlayers(1, searchTerm);
    }, 300),
    []
  );

  const fetchPlayers = async (page = pagination.currentPage, search = searchTerm) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/Pickups?page=${page}&limit=${pagination.limit}&search=${search}`
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  // Handle page change 
  const handlePageChange = (event, newPage) => {
    fetchPlayers(newPage);
  };

  // Modal handlers 
  const handleOpenModal = (mode, record = null) => {
    setModalMode(mode);
    setSelectedRecord(record);
    if (mode === 'edit' && record) {
      // For edit mode, prepare the date in YYYY-MM-DD format for the date input
      const dateObj = record.Date ? new Date(record.Date) : new Date();
      const formattedDateForInput = dateObj.toISOString().split('T')[0];

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
        Date: formattedDateForInput
      });
    } else {
      // For create mode, use current date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];

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
        Date: today
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

      // Convert ISO date to MM/DD/YYYY format for saving to server
      const dateObj = new Date(formData.Date);
      const formattedDate = dateObj.toLocaleDateString('en-US'); // MM/DD/YYYY

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
      
      console.log("Processed Form Data:", processedFormData);
      
      const response = await axios.post('/Pickups/insertPlayer', processedFormData);
      console.log("Response Data:", response.data);
      
      handleCloseModal();
      fetchPlayers(pagination.currentPage);
    } catch (error) {
      console.error("Full Error:", error);
      setError(error.response?.data?.message || error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!selectedRecord?._id) {
        throw new Error('No record selected for update');
      }
      
      const numericFields = ['Score', 'Kills', 'Deaths', 'Assists', 'Team Kills', 'Blocks', 'Impact Rating'];

      // Convert ISO date to MM/DD/YYYY format for saving to server
      const dateObj = new Date(formData.Date);
      const formattedDate = dateObj.toLocaleDateString('en-US'); // MM/DD/YYYY

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
      console.log("Response Data:", response.data);
      
      handleCloseModal();
      fetchPlayers(pagination.currentPage);
    } catch (error) {
      console.error("Full Error:", error);
      setError(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      const response = await axios.delete(`/Pickups/${id}`);
      console.log("Delete response:", response.data);
      fetchPlayers(pagination.currentPage);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  // The rest of the component (UI) remains unchanged
  return (
    <div style={{ backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <StyledCard>
          <CardHeader
            title={<Typography variant="h5">Player Pickups Data</Typography>}
            action={
              <HeaderActions>
                <SearchField
                  variant="outlined"
                  size="small"
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon style={{ color: '#666', marginRight: 8 }} />,
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  size="large"
                  onClick={() => handleOpenModal('create')}
                >
                  Add New
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<GetAppIcon />}
                  size="large"
                >
                  Export
                </Button>
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
                <Typography>Loading...</Typography>
              </Box>
            ) : (
              <>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell style={{ minWidth: 200 }}>Name</StyledTableCell>
                      <StyledTableCell>Score</StyledTableCell>
                      <StyledTableCell>Kills</StyledTableCell>
                      <StyledTableCell>Deaths</StyledTableCell>
                      <StyledTableCell>Assists</StyledTableCell>
                      <StyledTableCell>Team Kills</StyledTableCell>
                      <StyledTableCell>Blocks</StyledTableCell>
                      <StyledTableCell>Impact Rating</StyledTableCell>
                      <StyledTableCell>Regiment</StyledTableCell>
                      <StyledTableCell>Win</StyledTableCell>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell style={{ width: 120 }}>Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {playerData.map((record) => (
                      <TableRow key={record._id} hover>
                        <StyledTableCell>{record.Player}</StyledTableCell>
                        <StyledTableCell>{record.Score}</StyledTableCell>
                        <StyledTableCell>{record.Kills}</StyledTableCell>
                        <StyledTableCell>{record.Deaths}</StyledTableCell>
                        <StyledTableCell>{record.Assists}</StyledTableCell>
                        <StyledTableCell>{record['Team Kills']}</StyledTableCell>
                        <StyledTableCell>{record.Blocks}</StyledTableCell>
                        <StyledTableCell>{record['Impact Rating']}</StyledTableCell>
                        <StyledTableCell>{record.Regiment}</StyledTableCell>
                        <StyledTableCell>{record.Win ? 'Yes' : 'No'}</StyledTableCell>
                        <StyledTableCell>{record.formattedDate || new Date(record.Date).toLocaleDateString('en-US')}</StyledTableCell>
                        <StyledTableCell>
                          <ActionButtonsContainer>
                            <IconButton 
                              size="small" 
                              color="primary" 
                              onClick={() => handleOpenModal('edit', record)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              color="secondary" 
                              onClick={() => handleDelete(record._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ActionButtonsContainer>
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box display="flex" justifyContent="center">
                  <Pagination 
                    count={pagination.pages}
                    page={pagination.currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Box>
              </>
            )}
          </ScrollableContainer>
        </StyledCard>
      </Container>

      {/* Create/Edit Modal (unchanged) */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>
          {modalMode === 'create' ? 'Add New Player Record' : 'Edit Player Record'}
        </DialogTitle>
        <DialogContent>
          <Box display="grid" gridGap={16} gridTemplateColumns="repeat(2, 1fr)" py={2}>
            <TextField
              label="Player Name"
              name="Player"
              value={formData.Player || ''}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Score"
              name="Score"
              type="number"
              value={formData.Score || 0}
              onChange={handleInputChange}
              fullWidth
            />
            {/* Other fields remain unchanged */}
            <TextField
              label="Kills"
              name="Kills"
              type="number"
              value={formData.Kills || 0}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Deaths"
              name="Deaths"
              type="number"
              value={formData.Deaths || 0}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Assists"
              name="Assists"
              type="number"
              value={formData.Assists || 0}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Team Kills"
              name="Team Kills"
              type="number"
              value={formData['Team Kills'] || 0}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Blocks"
              name="Blocks"
              type="number"
              value={formData.Blocks || 0}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Impact Rating"
              name="Impact Rating"
              type="number"
              value={formData['Impact Rating'] || 0}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Regiment"
              name="Regiment"
              value={formData.Regiment || ''}
              onChange={handleInputChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Win</InputLabel>
              <Select
                name="Win"
                value={formData.Win === 1 || formData.Win === true} 
                onChange={(e) => {
                  console.log("Select onChange - Raw Value:", e.target.value);
                  console.log("Current formData before update:", formData);
                  
                  setFormData(prev => {
                    const newFormData = {
                      ...prev,
                      Win: e.target.value
                    };
                    console.log("New formData after update:", newFormData);
                    return newFormData;
                  });
                }}
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
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={modalMode === 'create' ? handleCreate : handleUpdate}
            color="primary"
            variant="contained"
          >
            {modalMode === 'create' ? 'Create' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPage;