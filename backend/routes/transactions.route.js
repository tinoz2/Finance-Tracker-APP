import { Router } from 'express'
const route = Router()
import { createMonth, createTransaction, createYear, deleteTransaction, getMonth, getTransaction, getTransactions, getYear } from '../controllers/transactions.controller.js'

route.get('/getAll', getTransactions)

route.get('/getOne/:id', getTransaction)

route.post('/create', createTransaction)

route.delete('/delete/:id', deleteTransaction)

route.get('/getyear', getYear)

route.get('/getmonth', getMonth)

route.post('/createmonth', createMonth)

route.post('/createyear', createYear)

export default route