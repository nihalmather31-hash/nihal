require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('./models/Place');

async function migrateFood() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const places = await Place.find({});
        let totalUpdated = 0;

        for (const place of places) {
            let needsUpdate = false;

            // Check if any food items are missing hotelName
            place.food.forEach(item => {
                if (!item.hotelName) {
                    item.hotelName = 'Other Restaurants';
                    needsUpdate = true;
                }
            });

            if (needsUpdate) {
                await place.save();
                console.log(`✅ Updated ${place.food.length} food items in ${place.district} > ${place.city} > ${place.village}`);
                totalUpdated++;
            }
        }

        if (totalUpdated === 0) {
            console.log('✅ All food items already have hotelName field!');
        } else {
            console.log(`\n✅ Migration complete! Updated ${totalUpdated} location(s).`);
        }

        console.log('\n📝 Note: Existing items now have hotelName = "Other Restaurants"');
        console.log('   Local admins can edit these items to assign proper restaurant names.\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

migrateFood();
