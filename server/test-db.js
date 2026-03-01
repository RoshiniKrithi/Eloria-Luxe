import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const testConnect = async () => {
    try {
        console.log('Attempting to connect to:', process.env.MONGODB_URI.replace(/:([^:@]{1,})@/, ':****@'));
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('SUCCESS: Connected to MongoDB Atlas!');
        process.exit(0);
    } catch (err) {
        console.error('FAILURE: Could not connect to MongoDB Atlas.');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        if (err.message.includes('IP address')) {
            console.error('TIP: It looks like your IP address is not whitelisted in MongoDB Atlas.');
        }
        process.exit(1);
    }
};

testConnect();
