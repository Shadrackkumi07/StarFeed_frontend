// src/api/index.js
import axios from 'axios';

// Base URL points to the Express proxy that I set in backend
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE, 
  headers: { 'Content-Type': 'application/json' },
});

export default api;
