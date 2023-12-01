import axios from 'axios';

const baseURL = process.env.API_URL;
const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { instance };
