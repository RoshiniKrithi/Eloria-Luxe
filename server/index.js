import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import startReminderJob from './jobs/reminderJob.js';

// Connect to database
connectDB();

// Initialize scheduled jobs
startReminderJob();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Database connection middleware for serverless & regular requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection error in request middleware:', error.message);
        res.status(503).json({
            success: false,
            message: 'Database service is temporarily unavailable. Please verify database connection settings.'
        });
    }
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Eloria Luxe API is running...');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}

export default app;
