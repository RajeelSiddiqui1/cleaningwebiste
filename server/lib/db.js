import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI_LOCAL

const dbConnect = async () =>{
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MONGODB connected successfully");
    } catch (error) {
        console.error("Failed to connect to database:", error.message);
        process.exit(1); // Exit if DB connection fails
    }
}

export default dbConnect