require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('./models/Place');

async function verify() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const places = await Place.find({});
        console.log(`Total Places: ${places.length}`);
        
        let allValid = true;
        places.forEach(p => {
            const hCount = p.hotels ? p.hotels.length : 0;
            const fCount = p.food ? p.food.length : 0;
            console.log(`${p.village} (${p.city}): Hotels: ${hCount}, Food: ${fCount}`);
            if (hCount < 10 || fCount < 10) {
                allValid = false;
                console.error(`❌ ${p.village} does not meet the requirement!`);
            }
        });

        if (allValid) {
            console.log('✅ All locations have at least 10 hotels and 10 restaurants!');
        } else {
            console.log('❌ Some locations are missing data.');
        }
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

verify();
