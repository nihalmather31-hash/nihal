// Script to reset a local admin's password
// Usage: node reset-password.js <username> <newpassword>
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const username = process.argv[2];
const newPassword = process.argv[3];

if (!username || !newPassword) {
    console.log('Usage: node reset-password.js <username> <newpassword>');
    process.exit(1);
}

async function resetPassword() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const user = await User.findOne({ username });

        if (!user) {
            console.log(`❌ User '${username}' not found in database.`);
            console.log('\nAvailable users:');
            const allUsers = await User.find({}).select('username role status');
            allUsers.forEach(u => console.log(`  - ${u.username} (${u.role}) [${u.status || 'N/A'}]`));
            process.exit(1);
        }

        console.log(`Found user: ${user.username} | Role: ${user.role} | Status: ${user.status}`);

        // Set the new password (pre-save hook will hash it)
        user.password = newPassword;
        await user.save();

        console.log(`\n✅ Password for '${username}' reset successfully!`);
        console.log(`   New password: ${newPassword}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Status: ${user.status}`);
        console.log('\nYou can now login with these credentials.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

resetPassword();
