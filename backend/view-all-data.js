require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place');

async function viewAllData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');
        console.log('='.repeat(80));

        // ========== USERS ==========
        console.log('\n📋 USERS COLLECTION:\n');
        const users = await User.find({}).select('-password');
        console.log(`Total users: ${users.length}\n`);

        if (users.length > 0) {
            users.forEach((user, index) => {
                console.log(`${index + 1}. Username: ${user.username}`);
                console.log(`   Role: ${user.role}`);
                console.log(`   Status: ${user.status || 'N/A'}`);
                if (user.fullName) console.log(`   Full Name: ${user.fullName}`);
                if (user.email) console.log(`   Email: ${user.email}`);
                if (user.district) console.log(`   Location: ${user.district} > ${user.city} > ${user.village}`);
                console.log(`   Created: ${user.createdAt}`);
                console.log('');
            });
        } else {
            console.log('   No users found.\n');
        }

        console.log('='.repeat(80));

        // ========== PLACES ==========
        console.log('\n📍 PLACES COLLECTION:\n');
        const places = await Place.find({});
        console.log(`Total places: ${places.length}\n`);

        if (places.length > 0) {
            places.forEach((place, index) => {
                console.log(`${index + 1}. Location: ${place.district} > ${place.city} > ${place.village}`);
                console.log(`   Last Updated: ${place.lastUpdated}`);
                console.log(`   Hotels: ${place.hotels?.length || 0} items`);
                console.log(`   Food: ${place.food?.length || 0} items`);
                console.log(`   Transport: ${place.transport?.length || 0} items`);
                console.log(`   Events: ${place.events?.length || 0} items`);
                console.log(`   Emergency Contacts:`);
                console.log(`     - Police: ${place.emergency?.police || 'Not set'}`);
                console.log(`     - Hospital: ${place.emergency?.hospital || 'Not set'}`);
                console.log(`     - Fire: ${place.emergency?.fire || 'Not set'}`);

                // Show hotels
                if (place.hotels && place.hotels.length > 0) {
                    console.log(`\n   🏨 Hotels:`);
                    place.hotels.forEach((hotel, i) => {
                        console.log(`     ${i + 1}. ${hotel.name}`);
                        console.log(`        Description: ${hotel.description || 'N/A'}`);
                        console.log(`        Price: ${hotel.price || 'N/A'}`);
                        console.log(`        Contact: ${hotel.contact || 'N/A'}`);
                    });
                }

                // Show food
                if (place.food && place.food.length > 0) {
                    console.log(`\n   🍽️  Food:`);
                    place.food.forEach((food, i) => {
                        console.log(`     ${i + 1}. ${food.name}`);
                        console.log(`        Restaurant: ${food.hotelName || 'N/A'}`);
                        console.log(`        Cuisine: ${food.cuisine || 'N/A'}`);
                        console.log(`        Price: ${food.price || 'N/A'}`);
                        console.log(`        Contact: ${food.contact || 'N/A'}`);
                    });
                }

                // Show transport
                if (place.transport && place.transport.length > 0) {
                    console.log(`\n   🚗 Transport:`);
                    place.transport.forEach((transport, i) => {
                        console.log(`     ${i + 1}. ${transport.name || transport.type}`);
                        console.log(`        Type: ${transport.type || 'N/A'}`);
                        console.log(`        Route: ${transport.route || 'N/A'}`);
                        console.log(`        Price: ${transport.price || 'N/A'}`);
                    });
                }

                // Show events
                if (place.events && place.events.length > 0) {
                    console.log(`\n   🎉 Events:`);
                    place.events.forEach((event, i) => {
                        console.log(`     ${i + 1}. ${event.name}`);
                        console.log(`        Date: ${event.date || 'N/A'}`);
                        console.log(`        Location: ${event.location || 'N/A'}`);
                        console.log(`        Description: ${event.description || 'N/A'}`);
                    });
                }

                console.log('\n' + '-'.repeat(80) + '\n');
            });
        } else {
            console.log('   No places found.\n');
        }

        console.log('='.repeat(80));
        console.log('\n✅ Database view complete!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

viewAllData();
