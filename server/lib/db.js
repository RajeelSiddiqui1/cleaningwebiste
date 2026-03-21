import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI_LOCAL

const dbConnect = async () =>{
    try {
        mongoose.connect(MONGODB_URI)
        console.log("MONGODB connected succssfully")
    } catch (error) {
        console.log("failed to connect db")
    }
}

export default dbConnect