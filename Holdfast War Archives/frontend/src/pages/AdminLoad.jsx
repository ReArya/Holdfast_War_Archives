import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import AdminLoginIcon from '../assets/admin.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    background: {
      default: '#f3f4f6',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          display: 'none' // This hides the asterisk on required fields
        }
      }
    }
  }
});

axios.defaults.baseURL = 'http://localhost:5555'; // backend port

const AdminLoad = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setSnackbarOpen(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('/api/admin/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('adminToken', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      navigate('/adminSuccess');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          py: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${AdminLoginIcon})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
            transform: 'scale(1.1)', // Prevents blur edge artifacts
            zIndex: -2,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for better contrast
            zIndex: -1,
          }
        }}
      >
        {/* Blue gradient strip at the top */}
        <div className="bg-gradient-to-r from-sky-700 to-blue-600 h-2 w-full absolute top-0 left-0 z-10"></div>
        
        {/* Header Section - Aligned similar to Matchmaking */}
        <Box sx={{ textAlign: 'center', mb: 4, color: 'white', zIndex: 1, width: '100%', maxWidth: '600px' }}>
          <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-100 mb-3 tracking-tight">
            Holdfast War Archives
          </h1>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-sky-500 mb-6">
            Admin Login
          </h2>
          {/* Blue divider similar to Matchmaking */}
          <div className="w-24 h-1 bg-sky-700 mx-auto mb-8 rounded-full"></div>
          <h4 className="text-center text-lg md:text-xl font-medium text-gray-200 mb-6">
            Please Login using Admin Credentials
          </h4>
        </Box>
        
        <Paper 
          elevation={12} 
          sx={{ 
            p: 4, 
            borderRadius: 3, 
            width: '100%', 
            maxWidth: '400px', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(2px)',
            backgroundColor: alpha('#ffffff', 0.9),
            border: '1px solid rgba(255,255,255,0.2)',
            zIndex: 1
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Username"
                variant="outlined"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                required
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(37, 99, 235, 0.5)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(37, 99, 235, 0.5)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Button 
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  mt: 1,
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                  '&:hover': { 
                    bgcolor: '#1d4ed8',
                    boxShadow: '0 6px 16px rgba(37, 99, 235, 0.6)',
                  }
                }}
                startIcon={!isLoading && <LoginIcon />}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </Box>
          </form>
        </Paper>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          message={error}
          action={
            <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
              ✖
            </IconButton>
          }
          sx={{
            '& .MuiSnackbarContent-root': {
              bgcolor: 'error.dark',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default AdminLoad;