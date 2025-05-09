// Albert Mendez IV
// index.js
// Holdfast War Archives
// Indexing Middleware, Routes, and a 404 handler

import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import pickupsRoute from './routes/pickupsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

const app = express();

// Security middleware
app.use(helmet()); // Adds various HTTP headers for security
app.use(morgan('dev')); // HTTP request logger

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors());



// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Routes
app.get('/', (req, res) => {
    return res.status(200).send('API is running');
});

app.use('/Pickups', pickupsRoute);
app.use("/api/admin", adminRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// MongoDB connection with retry logic
const connectWithRetry = async () => {
    try {
        await mongoose.connect(mongoDBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('Successfully connected to MongoDB.');
        
        // Start server only after successful DB connection
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
        console.log('Retrying in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
    }
};

// Handle process events
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed due to uncaught exception.');
        process.exit(1);
    });
});

// Initialize connection
connectWithRetry();

export default app;