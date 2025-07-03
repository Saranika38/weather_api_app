import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4001/api';

export async function signup(name, email, password) {
  try {
    console.log('Attempting signup with:', { name, email });
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    }, {
      withCredentials: true
    });
    
    console.log('Signup response:', response.data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error;
  }
}

export async function login(username, password) {
  try {
    console.log('Attempting login for user:', username);
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    }, {
      withCredentials: true
    });
    
    console.log('Login response:', response.data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', username);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem('token');
}

export async function checkAuthStatus() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;

    // Verify token with backend
    const response = await axios.get(`${API_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    });

    return response.data.valid;
  } catch (error) {
    console.error('Auth status check failed:', error.response?.data || error.message);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return false;
  }
}

export function getAuthToken() {
  return localStorage.getItem('token');
}