/**
 * axios setup for backend API integration
 */

import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// ==============================|| AXIOS INTERCEPTORS ||============================== //

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('serviceToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response Error:', error.response.data);
            if (error.response.status === 401) {
                // Handle unauthorized access
                localStorage.removeItem('serviceToken');
                window.location.href = '/login';
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request Error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    const [url, config] = Array.isArray(args) ? args : [args];
    // Remove any duplicate /api prefixes
    const cleanUrl = url.replace(/^\/api/, '');
    const res = await axiosInstance.get(cleanUrl, { ...config });
    return res.data;
};
