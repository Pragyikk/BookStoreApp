import express from "express"
import mongoose from "mongoose"
import {PORT} from "./config.js"
import {Book} from "./models/bookModels.js"
import booksRoute from './routes/booksRoute.js'
import cors from "cors"
import connectDB from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();


const app= express()

//middleware for parsing our JSON body
app.use(express.json())

//middleware for handling CORS policy
//Allowing all origins with Default of cors(*)
//app.use(cors())

//Allowing Custom Origins
app.use(
    cors({
        origin:'http://localhost:3000',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type']
    })
)
app.get('/',(req,res)=>{
    console.log(req)
    return res.status(234).send("Welcome and Namaste")
})

app.use('/books', booksRoute)

const start= async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{console.log(`Server is listening at port: ${PORT}...`)})

    }catch(error){
        console.log(error)
    }
}

start()