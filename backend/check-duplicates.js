require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('./models/Place');

const mergeData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const targets = [
            { old: 'mookhanoor', new: 'Mookannoor' },
            { old: 'kuruppumpady', new: 'Kuruppampady' },
            { old: 'nerinmangalm', new: 'Neriamangalam' }
        ];

        for (const target of targets) {
            console.log(`\nChecking for: ${target.old} / ${target.new}`);

            // Search for all variations
            const variations = await Place.find({
                village: { $regex: new RegExp(`^${target.old}|${target.new}$`, 'i') }
            });

            console.log(`Found ${variations.length} records:`);
            variations.forEach(v => {
                console.log(`- ID: ${v._id}, Name: ${v.village}, City: ${v.city}, District: ${v.district}`);
                console.log(`  Hotels: ${v.hotels.length}, Food: ${v.food.length}, Events: ${v.events.length}`);
            });
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

mergeData();
