import axios from './axios.js'

const registerRequest = (data) => {
    return axios.post('/auth/register', data)
}

const loginRequest = (data) => {
    return axios.post('/auth/login', data)
}

const profileRequest = () => {
    return axios.get('/auth/profile', { withCredentials: true })
}

const logoutRequest = () => {
    return axios.post('/auth/logout')
}

export {
    registerRequest,
    loginRequest,
    profileRequest,
    logoutRequest
}