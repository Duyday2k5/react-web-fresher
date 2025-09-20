import axios from "../utils/axios-custiomize"

// export const CallRegister = (fullName, email, password, phone) => {
//     return axios.post('/api/v1/user/register', { fullName, email, password, phone })
// }
export const CallLogin = (username, password) => {
    if (!username || !password) {
        return Promise.reject('Thiếu thông tin bắt buộc');
    }
    return axios.post('/api/v1/auth/login', { username, password })
}
export const CallRegister = (fullName, email, password, phone) => {
    if (!fullName || !email || !password || !phone) {
        return Promise.reject('Thiếu thông tin bắt buộc');
    }

    return axios.post('/api/v1/user/register', {
        fullName,
        email,
        password,
        phone
    });
}
export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}
export const callLogout = () => {
    return axios.post('/api/v1/auth/logout');
}