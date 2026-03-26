require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/User');
const Place = require('./models/Place');

async function exportData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Get all data
        const users = await User.find({}).select('-password').lean();
        const places = await Place.find({}).lean();

        const data = {
            users,
            places,
            exportedAt: new Date().toISOString()
        };

        // Save as JSON
        fs.writeFileSync(
            '../database-export.json',
            JSON.stringify(data, null, 2)
        );

        console.log('✅ Data exported to database-export.json');
        console.log(`   - Users: ${users.length}`);
        console.log(`   - Places: ${places.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

exportData();
