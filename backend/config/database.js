const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,   // Fail fast if Atlas unreachable
            socketTimeoutMS: 45000,             // Close sockets after 45s of inactivity
            heartbeatFrequencyMS: 10000,        // Check connection every 10s
            retryWrites: true,
            w: 'majority'
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Log if connection drops and auto-reconnects
        mongoose.connection.on('disconnected', () => {
            console.error('⚠️  MongoDB disconnected! Attempting to reconnect...');
        });
        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected!');
        });
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err.message);
        });

    } catch (error) {
        console.error(`❌ MongoDB connection failed: ${error.message}`);
        console.error('👉 Fix: Go to MongoDB Atlas → Network Access → Add IP 0.0.0.0/0');
        process.exit(1);
    }
};

module.exports = connectDB;
