// axios.js
import axios from 'axios';

// Set up Axios instance
const baseURL = process.env.API_URL || 'http://localhost:8000/api/v1';
const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { instance };
