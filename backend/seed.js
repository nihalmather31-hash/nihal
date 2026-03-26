const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const dns = require('dns');
// Use Google DNS to bypass ISP DNS issues with MongoDB Atlas SRV records
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const mongoose = require('mongoose');
const User = require('./models/User');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 15000,
            family: 4
        });
        console.log('MongoDB Connected to Atlas!');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedUsers = async () => {
    try {
        await connectDB();

        await User.deleteMany({});
        console.log('Cleared existing users');

        const users = [
            { username: 'testuser', password: 'test123', role: 'general' },
            { username: 'nihal', password: 'nihal123', role: 'general' },
            { username: 'simon', password: 'simon123', role: 'general' },
            { username: 'visitor', password: 'visit123', role: 'general' },
            { username: 'localadmin', password: 'admin123', role: 'local' },
            { username: 'mookanoor', password: 'admin123', role: 'local' },
            { username: 'rohit', password: 'rohit123', role: 'local' },
            { username: 'sooraj', password: 'sooraj123', role: 'local' },
            { username: 'mainadmin', password: 'admin123', role: 'main' },
            { username: 'superadmin', password: 'admin123', role: 'main' }
        ];

        for (const userData of users) {
            await User.create(userData);
            console.log(`Created user: ${userData.username} (${userData.role})`);
        }

        console.log('\n✅ Atlas database seeded successfully!');
        console.log('\n📋 Login Credentials:');
        console.log('  General Users:  testuser/test123, nihal/nihal123, simon/simon123');
        console.log('  Local Admins:   localadmin/admin123, mookanoor/admin123');
        console.log('  Main Admins:    mainadmin/admin123, superadmin/admin123');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error.message);
        process.exit(1);
    }
};

seedUsers();
