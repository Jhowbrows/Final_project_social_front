import axios from 'axios';

const api = axios.create({
    // Para deploy, use a URL do PythonAnywhere. Para teste local, use esta:
    //baseURL: 'http://127.0.0.1:8000/api/'
    baseURL: 'https://jhowjhow.pythonanywhere.com/api/'
});

api.interceptors.request.use(async config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

export default api;