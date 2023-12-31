import express from 'express'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import { ConnectToDatabase } from './connection/mongoConnection'

//Importing the routes
import authRoute from './routes/authRoutes'
import userRoute from './routes/userRoutes'
import chatRoute from './routes/chatRoutes'

const app = express()

//env config
dotenv.config()

//Database connection
ConnectToDatabase()

app.use(
  cors({
    origin: [
      "http://localhost:5001",
    ],
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(cookieparser())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('./src/public'))

app.use('/',authRoute)
app.use('/user/',userRoute)
app.use('/chat/',chatRoute)

app.listen(5000,()=>{
    console.log(`Server started on http://localhost:${process.env.PORT}`);
})



