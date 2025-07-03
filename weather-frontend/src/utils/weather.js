import axios from 'axios';
import { getAuthToken } from './auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4001/api';

export async function getWeather(location) {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('Fetching weather data for:', location);
    console.log('API URL:', `${API_URL}/weather?location=${encodeURIComponent(location)}`);
    
    const response = await axios.get(`${API_URL}/weather?location=${encodeURIComponent(location)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: process.env.REACT_APP_API_TIMEOUT || 10000,
      withCredentials: true
    });
    
    console.log('Weather data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Weather fetch error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.error || error.response.data.message || 'Failed to fetch weather data');
    } else if (error.request) {
      console.error('Network error:', error.request);
      throw new Error('Network error. Please check your connection and try again.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
}