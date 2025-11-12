import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB)
    console.log("Database is connected")
    } catch (error) {
        console.log("Error in database connection", error)
    }
    
}

export default connectDB;