import axios from 'axios';


const BASE_URL_API = 'https://masca-back.onrender.com/api'; 

const api = axios.create({
    baseURL: BASE_URL_API
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;