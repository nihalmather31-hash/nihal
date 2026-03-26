require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const verifyUsers = async () => {
    await connectDB();
    const users = await User.find({});
    console.log('Users in DB:', users.map(u => ({
        username: u.username,
        role: u.role,
        passwordHash: u.password.substring(0, 10) + '...',
        status: u.status
    })));
    process.exit(0);
};

verifyUsers();
