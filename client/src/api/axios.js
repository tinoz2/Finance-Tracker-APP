import axios from 'axios'

const instance = axios.create({
    baseURL: 'finance-tracker-app-production.up.railway.app',
    withCredentials: true
})

export default instance