require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place');

const viewData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Get all users
        console.log('==================== USERS ====================');
        const users = await User.find({});
        console.log(`Total Users: ${users.length}\n`);

        users.forEach((user, index) => {
            console.log(`${index + 1}. Username: ${user.username}`);
            console.log(`   Role: ${user.role}`);
            console.log(`   Created: ${user.createdAt}`);
            console.log('');
        });

        // Get all places
        console.log('\n==================== PLACES ====================');
        const places = await Place.find({});
        console.log(`Total Places: ${places.length}\n`);

        if (places.length === 0) {
            console.log('No places added yet.');
        } else {
            places.forEach((place, index) => {
                console.log(`${index + 1}. Location: ${place.district} > ${place.city} > ${place.village}`);
                console.log(`   Hotels: ${place.hotels?.length || 0}`);
                console.log(`   Restaurants: ${place.food?.length || 0}`);
                console.log(`   Transport: ${place.transport?.length || 0}`);
                console.log(`   Tourist Spots: ${place.touristspots?.length || 0}`);
                console.log(`   Emergency Contacts: ${place.emergency ? 'Yes' : 'No'}`);
                console.log('');
            });
        }

        console.log('\n✅ Data view complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error viewing data:', error);
        process.exit(1);
    }
};

viewData();
