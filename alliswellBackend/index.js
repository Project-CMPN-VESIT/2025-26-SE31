import 'dotenv/config'
import express from 'express'
const app = express()
import cors from 'cors'
import { DBconnection } from './src/config/connection.js'
import {limiter} from './src/utils/rateLimit.js'
import {errorMiddleware}  from './src/errorHandler.js'
import { redis } from './src/config/redis.js'
import { userRouter } from './src/routes/user.route.js'
import feedbackRouter from './src/routes/feedBack.route.js'
import reviewRouter from './src/routes/review.route.js'
import cookieParser from 'cookie-parser'
import eventRouter from './src/routes/event.route.js'
import { contactRouter } from './src/routes/contact.route.js'
import documentRouter from './src/routes/document.route.js'
import { residentRouter } from './src/routes/resident.route.js'
import { donationRouter } from './src/routes/donation.route.js'
const port = process.env.PORT || 5000

app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174','http://localhost:5000'],
    credentials: true,
    methods: ["POST", "GET", "PUT", "PATCH", "OPTIONS", "PATCH", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))


app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())
app.use(limiter)

app.use('/auth',userRouter)
app.use('/review',reviewRouter)
app.use('/feedback',feedbackRouter)
app.use('/event',eventRouter)
app.use('/contact',contactRouter)
app.use('/document',documentRouter)
app.use('/resident', residentRouter)
app.use('/donation', donationRouter)

// ✅ global error handler (ALWAYS LAST)
app.use(errorMiddleware);
DBconnection().then(() => {
    app.listen(port, () => {
        console.log(`server started! at port : ${port}`)
        console.log("DB connected successfully")
    })
}).catch(() => {
    console.log("DB connection failed!")
})