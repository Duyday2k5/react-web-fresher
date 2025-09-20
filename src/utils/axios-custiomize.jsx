// import { Mutex } from "async-mutex";
import axios from "axios";

// const mutex = new Mutex();
const baseURL = import.meta.env.VITE_BACKEND_URL;
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

//Lay access_token tu localstorage
instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

const handleRefreshToken = async () => {
    const res = await instance.get('/api/v1/auth/refresh');
    if (res && res.data) return res.data.access_token;
    else null;

    // return await mutex.runExclusive(async () => {
    //     const res = await instance.get('/api/v1/auth/refresh');
    //     if (res && res.data) return res.data.access_token;
    //     else return null;
    // });
};
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
const NO_RETRY_HEADER = 'x-no-retry'; // ngan viec api bi loop vo han
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, async function (error) {
    //+ dung de convert chuoi thanh so nguyen (nhu 401.22 => 401)
    //Xu li loi access_token cap access_token moi
    if (error.config && error.response
        && +error.response.status === 401
        && !error.config.headers[NO_RETRY_HEADER]
    ) {
        const access_token = await handleRefreshToken();
        error.config.headers[NO_RETRY_HEADER] = 'true'
        if (access_token) {
            error.config.headers['Authorization'] = `Bearer ${access_token}`;
            localStorage.setItem('access_token', access_token)
            return instance.request(error.config);
        }
    }
    //Xu li refresh_token khi het han thi chuyen ve trang login
    if (
        error.config && error.response
        && +error.response.status === 400
        && error.config.url === '/api/v1/auth/refresh'
    ) {
        window.location.href = '/login';
    }

    return Promise.reject(error?.response?.data || error);
});

export default instance;