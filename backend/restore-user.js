const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

async function restoreUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if 'user' exists
        let user = await User.findOne({ username: 'user' });

        if (user) {
            console.log('User already exists, updating to approved status...');
            user.status = 'approved';
            user.role = 'user';
            await user.save();
        } else {
            console.log('Creating new "user" account...');
            user = new User({
                username: 'user',
                password: 'user123', // Standard test password
                role: 'user',
                status: 'approved',
                fullName: 'General User',
                email: 'user@example.com'
            });
            await user.save();
        }

        console.log('✅ "user" account is now ready and approved.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error restoring user:', error);
        process.exit(1);
    }
}

restoreUser();
