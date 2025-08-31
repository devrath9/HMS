import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

//config
const app=express()
const port= process.env.PORT||4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//endpoints

app.use('/api/admin', adminRouter)        //localhost:4000/api/admin/
app.use('/api/doctor', doctorRouter)      //localhost:4000/api/doctor/
app.use('/api/user', userRouter)          //localhost:4000/api/user/



app.get('/', (req, res)=>{
    res.send('API IS WORKING GREAT')
})

app.listen(port, ()=>{
    console.log('SERVER STARTED AT: 4000')
    console.log("http://localhost:4000/")})