import axios from 'axios';

// Get the API base URL from environment variables
// Falls back to relative URL if not defined
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;