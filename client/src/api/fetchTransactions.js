import axios from './axios.js'

const getTransactions = () => {
    return axios.get('/transactions/getAll')
}

const getTransaction = (id) => {
    return axios.get(`/transactions/getOne/${id}`)
}

const createTransaction = (data) => {
    return axios.post('/transactions/create', data)
}

const deleteTransaction = (id) => {
    return axios.delete(`/transactions/delete/${id}`)
}

const getYear = () => {
    return axios.get('/transactions/getyear')
}

const createMonth = (data) => {
    return axios.post('/transactions/createmonth', data)
}

const getMonth = () => {
    return axios.get('/transactions/getmonth')
}

const createYear = (data) => {
    return axios.post('/transactions/createyear', data)
}

export {
    getTransaction,
    getTransactions,
    createTransaction,
    deleteTransaction,
    getYear,
    getMonth,
    createMonth,
    createYear
}
