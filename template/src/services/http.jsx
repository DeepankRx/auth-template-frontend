import axios from 'axios';
const BASE_URL = 'http://localhost:5000';
const http = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

http.interceptors.response.use(
    (response) => response,
    (error) => {
        // if (error.response.status === 401) {
        //     // do something
        // }
        return Promise.reject(error);
    }
);

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

export default http;
