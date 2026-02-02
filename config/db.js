import mongoose from "mongoose"
import { config } from "dotenv"

config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongodb, {
              // useNewUrlParser: true,
              // useUnifiedTopology: true,
              // useCreateIndex: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        })
        console.log('MongoDB Database connected');
    } catch (error) {
        console.error('MongoDB Database connection error:', error.message);
        process.exit(1);
    }
}

export default connectDB;