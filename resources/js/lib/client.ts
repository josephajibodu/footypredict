import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_URL || 'https://footypredict.app',
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiClient;
