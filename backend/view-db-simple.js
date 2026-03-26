// Simple script to view database collections and sample data
const mongoose = require('mongoose');
require('dotenv').config();

async function viewDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB\n');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();

        console.log('COLLECTIONS:', collections.map(c => c.name).join(', '));
        console.log('\n' + '='.repeat(60) + '\n');

        // USERS COLLECTION
        console.log('USERS COLLECTION:');
        const users = await db.collection('users').find({}).toArray();
        console.log('Total users:', users.length);
        if (users.length > 0) {
            console.log('\nSample user structure:');
            const user = users[0];
            Object.keys(user).forEach(key => {
                console.log(`  ${key}: ${typeof user[key]}`);
            });
            console.log('\nAll users:');
            users.forEach(u => {
                console.log(`  - ${u.username} (${u.role}) - Status: ${u.status || 'N/A'}`);
            });
        }

        console.log('\n' + '='.repeat(60) + '\n');

        // PLACES COLLECTION
        console.log('PLACES COLLECTION:');
        const places = await db.collection('places').find({}).toArray();
        console.log('Total places:', places.length);
        if (places.length > 0) {
            console.log('\nSample place structure:');
            const place = places[0];
            Object.keys(place).forEach(key => {
                if (key === 'hotels' && Array.isArray(place[key]) && place[key].length > 0) {
                    console.log(`  ${key}: Array (${place[key].length} items)`);
                    console.log('    Hotel structure:');
                    Object.keys(place[key][0]).forEach(hKey => {
                        console.log(`      - ${hKey}: ${typeof place[key][0][hKey]}`);
                    });
                } else {
                    console.log(`  ${key}: ${typeof place[key]}`);
                }
            });
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

viewDatabase();
