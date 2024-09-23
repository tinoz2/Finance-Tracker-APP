import { BACKEND } from '@/config'
import axios from 'axios'

const instance = axios.create({
    baseURL: BACKEND,
    withCredentials: true
})

export default instance