import express from 'express'
import { connectDB } from './db.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import usersRoute from './routes/auth.route.js'
import transactionsRoute from './routes/transactions.route.js'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}))

app.use('/auth', usersRoute)
app.use('/transactions', transactionsRoute)

app.listen(PORT, () => {
    console.log('Server ON')
    connectDB()
})