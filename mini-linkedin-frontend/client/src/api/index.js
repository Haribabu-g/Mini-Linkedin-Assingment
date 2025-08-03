// src/api/index.js
import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  Intercepts every request. If a token exists in local storage, 
  it adds it to the request's 'x-auth-token' header.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
