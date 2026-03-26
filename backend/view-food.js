require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('./models/Place');

async function viewFoodData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const places = await Place.find({});

        places.forEach(place => {
            console.log(`\n📍 Location: ${place.district} > ${place.city} > ${place.village}`);
            console.log(`\n🍽️ FOOD ITEMS (${place.food.length}):`);

            if (place.food.length === 0) {
                console.log('   No food items');
            } else {
                place.food.forEach((item, index) => {
                    console.log(`\n   ${index + 1}. ${item.name}`);
                    console.log(`      Price: ₹${item.price}`);
                    console.log(`      Description: ${item.description || 'N/A'}`);
                    console.log(`      Hotel Name: ${item.hotelName || '❌ MISSING'}`);
                    console.log(`      ID: ${item._id}`);
                });
            }
        });

        console.log('\n✅ Food data view complete!\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

viewFoodData();
