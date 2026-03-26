// Script to check all users and their status
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

async function checkAllUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const allUsers = await User.find({});
        console.log(`Total users: ${allUsers.length}\n`);

        // Group by role
        const byRole = {
            'main-admin': [],
            'main': [],
            'local-admin': [],
            'local': [],
            'user': [],
            'general': []
        };

        allUsers.forEach(user => {
            if (byRole[user.role]) {
                byRole[user.role].push(user);
            }
        });

        console.log('=== MAIN ADMINS ===');
        [...byRole['main-admin'], ...byRole['main']].forEach(user => {
            console.log(`  ${user.username} (${user.role}) - Status: ${user.status || 'N/A'}`);
        });

        console.log('\n=== LOCAL ADMINS ===');
        [...byRole['local-admin'], ...byRole['local']].forEach(user => {
            console.log(`  ${user.username} (${user.role}) - Status: ${user.status || 'N/A'}`);
        });

        console.log('\n=== GENERAL USERS ===');
        [...byRole['user'], ...byRole['general']].forEach(user => {
            console.log(`  ${user.username} (${user.role}) - Status: ${user.status || 'N/A'}`);
        });

        // Check for pending local admins
        const pendingLocalAdmins = await User.find({
            role: { $in: ['local-admin', 'local'] },
            status: 'pending'
        });

        console.log(`\n=== PENDING LOCAL ADMIN REQUESTS ===`);
        if (pendingLocalAdmins.length === 0) {
            console.log('  No pending requests found.');
            console.log('\n💡 To test the approval system:');
            console.log('   1. Go to signup-local-admin.html');
            console.log('   2. Sign up a test local admin');
            console.log('   3. Refresh the main admin dashboard');
        } else {
            pendingLocalAdmins.forEach(user => {
                console.log(`  ${user.username} - Created: ${user.createdAt}`);
            });
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

checkAllUsers();
