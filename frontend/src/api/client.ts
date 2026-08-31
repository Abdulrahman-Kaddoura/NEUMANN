import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.dispatchEvent(new Event('auth:unauthorized'));   
        }

        return Promise.reject(error);
    }
);

export function resolvePhotoUrl(photoUrl: string | null): string | undefined {
    return photoUrl ? `${API_URL}${photoUrl}` : undefined;
}