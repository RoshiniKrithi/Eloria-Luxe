import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import startReminderJob from './jobs/reminderJob.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize scheduled jobs
startReminderJob();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Eloria Luxe API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
