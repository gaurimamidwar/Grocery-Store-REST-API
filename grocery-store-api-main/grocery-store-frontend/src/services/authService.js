// src/services/authService.js
import axios from '../utils/axios';

const authService = {
  login: async (credentials) => {
    try {
      // First, get the token
      const tokenResponse = await axios.post('/token/', credentials);
      const token = tokenResponse.data.access;

      // Store the token
      localStorage.setItem('token', token);

      // Get user details using the token
      const userResponse = await axios.get('/users/me/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      return {
        user: userResponse.data,
        token
      };
    } catch (error) {
      throw error.response?.data || { detail: 'Login failed' };
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post('/users/', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.get('/users/me/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
    return null;
  }
};

export default authService;