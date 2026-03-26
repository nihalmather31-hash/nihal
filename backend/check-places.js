const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

require('dotenv').config();
const mongoose = require('mongoose');

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
        console.log('✅ Connected!');

        const Place = require('./models/Place');

        // Show ALL place records
        const places = await Place.find({}, 'district city village description hotels food transport events touristspots shopping medical banks parking lastUpdated');
        console.log(`\nTotal places in DB: ${places.length}\n`);
        places.forEach(p => {
            console.log(`📍 district='${p.district}' | city='${p.city}' | village='${p.village}'`);
            console.log(`   hotels:${p.hotels.length} food:${p.food.length} transport:${p.transport.length} events:${p.events.length} spots:${p.touristspots.length} shop:${p.shopping.length} med:${p.medical.length} banks:${p.banks.length} parking:${p.parking.length}`);
            console.log(`   description: ${p.description ? p.description.substring(0, 60) : 'NONE'}`);
            console.log('---');
        });
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}
run();
