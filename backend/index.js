import express from "express"
import mongoose from "mongoose"
import {PORT, mongoDBURL} from "./config.js"
import {Book} from "./models/bookModels.js"
import booksRoute from './routes/booksRoute.js'
import cors from "cors"


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

mongoose
   .connect(mongoDBURL)
   .then(()=>{
        console.log("App is connected to the DB")
        app.listen(PORT, ()=>{
            console.log(`App is listening from port: ${PORT}`)
        })
   })
   .catch((error)=>{
        console.log(error)
   })