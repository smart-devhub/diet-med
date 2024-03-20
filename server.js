import express from "express"
import { dbConnection } from "./db.js"
import cors from 'cors'
import bodyParser from "body-parser"
import router from "./routes/index.js"
import dotenv from 'dotenv'


dotenv.config();
const PORT=process.env.PORT || 8000 
const app=express()
app.use(cors())
app.use(bodyParser.json())

dbConnection()
app.use('/api', router);



app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT}`)
})

