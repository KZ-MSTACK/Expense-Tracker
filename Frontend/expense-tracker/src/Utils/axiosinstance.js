import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Change to your production API URL when deploying

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if you're using cookies for auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token from localStorage or cookies if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or use cookies/sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
