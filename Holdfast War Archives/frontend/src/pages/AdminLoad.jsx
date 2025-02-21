import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
  },
});

axios.defaults.baseURL = 'http://localhost:5555'; // backend port

const AdminLoad = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    console.log('Attempting login with:', { username: formData.username });

    try {
      const response = await axios.post('/api/admin/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Login successful:', response.data);
      
      localStorage.setItem('adminToken', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      navigate('/adminSuccess');
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
          bgcolor: '#f3f4f6',
          px: 2
        }}
      >
        {/* Title and Subtitle at Top Center */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Holdfast War Archives
          </h1>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-600 mb-4">
            Admin Page
          </h2>
        </div>

        {/* Text Blurb & Login Box */}
        <Box 
          sx={{ 
            width: '100%', 
            maxWidth: '550px', // 💡 Increased width
            mx: 3, 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          {/* 🔥 Text Blurb */}
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.2rem', 
            color: '#6b7280', 
            marginBottom: '1rem' 
          }}>
            Please enter Admin Credentials
          </p>

          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%' }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <TextField
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  required
                  disabled={isLoading}
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
                />

                <Button 
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem'
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLoad;
