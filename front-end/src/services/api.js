import axios from 'axios';
import { useAuth } from './auth';

const api = axios.create({
    baseURL: "http://localhost:8080"
})

api.interceptors.request.use(async config => {
    const { getToken } = useAuth();
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;