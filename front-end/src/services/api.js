import axios from 'axios';
import { logout, isTokenValid, isStoredTokenValid, getToken } from './authService';
import { ENDPOINTS } from '../constants/endpoints';

const api = axios.create({
    baseURL: "http://localhost:8080"
});

api.interceptors.request.use(async config => {
    const token = getToken();

    if (isTokenValid(token)) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(async response => {
    const endpoint = response.config.url;
    const data = response.data;

    if (endpoint === ENDPOINTS.AUTHENTICATE) {
        if (!isTokenValid(data)) {
            logout();
            throw new Error("Invalid token received.");
        }
    }
    return response
}, async error => {
    const response = error.response;

    if (response !== undefined && (response.status === 401 || !isStoredTokenValid())) {
        logout();
    }

    throw error;
});

export default api;