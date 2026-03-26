require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('./models/Place');

async function cleanup() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        // Find entries not in our current high-quality list or duplicates
        // For simplicity, let's just delete the lowercase 'mookhanoor' if 'Mookannoor' exists
        const result = await Place.deleteOne({ village: 'mookhanoor' });
        console.log(`Deleted ${result.deletedCount} legacy entries.`);
        
        const places = await Place.find({});
        console.log(`Total Places after cleanup: ${places.length}`);
        
        places.forEach(p => {
            const hCount = p.hotels ? p.hotels.length : 0;
            const fCount = p.food ? p.food.length : 0;
            console.log(`${p.village} (${p.city}): Hotels: ${hCount}, Food: ${fCount}`);
        });
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

cleanup();
