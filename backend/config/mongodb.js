import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI
const connectDB = async()=>{

     mongoose.connection.on('connected',()=>{
            console.log('connected to mongodb');
        });
       await mongoose.connect(mongoURI) 
    
}
    

export default connectDB
