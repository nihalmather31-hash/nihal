// Migration script to add status field to existing users
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

async function migrateUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Find all users without a status field
        const users = await User.find({ status: { $exists: false } });
        console.log(`Found ${users.length} users without status field`);

        for (const user of users) {
            // Set status based on role
            const mainRoles = ['main-admin', 'main'];
            const localRoles = ['local-admin', 'local'];

            if (mainRoles.includes(user.role)) {
                user.status = 'approved'; // Main admins are auto-approved
            } else if (localRoles.includes(user.role)) {
                user.status = 'approved'; // Existing local admins are approved (grandfather them in)
            } else {
                user.status = 'pending'; // Others need approval
            }

            await user.save();
            console.log(`✅ Updated user: ${user.username} (role: ${user.role}, status: ${user.status})`);
        }

        console.log('✅ Migration complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrateUsers();
