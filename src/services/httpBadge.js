import { getToken } from '@/utils/storage.utils';
import axios from 'axios';

const httpBadge = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 0,
});

httpBadge.interceptors.request.use(
    (config) => {
        if (getToken()) {
            config.headers['Authorization'] = `Bearer ${getToken()}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default httpBadge;