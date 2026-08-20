import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

const connectDB = async () => {
    if (isConnected || mongoose.connections[0].readyState) {
        console.log('MongoDB is already connected.');
        return;
    }

    if (!process.env.MONGODB_URI) {
        console.error('Error: MONGODB_URI environment variable is not defined in the server environment.');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000 // 5-second timeout for quick failure feedback
        });
        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Do NOT call process.exit(1) in a serverless environment (like Vercel)
        // because it crashes the serverless container returning a generic 500.
        // Instead, let the query throw so it returns a helpful JSON message to the client.
    }
};

export default connectDB;
