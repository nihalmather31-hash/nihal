require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const clearUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Count users before deletion
        const countBefore = await User.countDocuments();
        console.log(`Found ${countBefore} users in database`);

        // Delete all users
        const result = await User.deleteMany({});
        console.log(`\n🗑️  Deleted ${result.deletedCount} users`);

        console.log('\n✅ All users have been deleted!');
        process.exit(0);
    } catch (error) {
        console.error('Error clearing users:', error);
        process.exit(1);
    }
};

clearUsers();
