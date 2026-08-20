import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Global cache to maintain a single database connection across
 * serverless function invocations on platforms like Vercel.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn && mongoose.connection.readyState === 1) {
        return cached.conn;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not defined in server environment.');
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Fail fast if connection is not ready instead of hanging for 10000ms
            serverSelectionTimeoutMS: 5000, // 5-second connection timeout
        };

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongooseInstance) => {
            console.log(`MongoDB Connected: ${mongooseInstance.connection.host}`);
            return mongooseInstance;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};

export default connectDB;
