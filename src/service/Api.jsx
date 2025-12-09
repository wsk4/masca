import axios from 'axios';

// Cambia esto según tu entorno (Local o Render)
// const BASE_URL_API = 'http://localhost:8080/api'; 
const BASE_URL_API = 'https://masca-back.onrender.com/api'; 

// Crear instancia centralizada
const api = axios.create({
    baseURL: BASE_URL_API
});

// INTERCEPTOR: Inyectar token automáticamente en TODAS las peticiones
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