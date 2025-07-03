import axios from 'axios';
import { getAuthToken } from './auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4001/api';

export async function getSearchHistory() {
  try {
    console.log('History Utility - Fetching search history');
    const token = getAuthToken();
    
    if (!token) {
      console.error('History Utility - No auth token found');
      throw new Error('Authentication required');
    }
    
    console.log('History Utility - Making API request to:', `${API_URL}/history`);
    const response = await axios.get(`${API_URL}/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true
    });
    
    console.log('History Utility - Received response:', {
      status: response.status,
      recordCount: response.data?.length
    });
    
    return response.data;
  } catch (error) {
    console.error('History Utility - Error:', error.message);
    if (error.response) {
      console.error('History Utility - API Error:', {
        status: error.response.status,
        data: error.response.data
      });
    }
    throw new Error(error.response?.data?.error || error.message || 'Failed to fetch search history');
  }
}

export async function deleteSearchHistory(id) {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    await axios.delete(`${API_URL}/history/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return true;
  } catch (error) {
    console.error('History delete error:', error);
    throw error;
  }
}