const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

require('dotenv').config();
const mongoose = require('mongoose');

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });

        const User = require('./models/User');
        const user = await User.findOne({ username: 'RohithRamesh' });

        if (!user) { console.log('User not found'); return; }

        // Match exact spelling of the Place record in DB
        user.district = 'ernakulam';
        user.city = 'Perumbavoor';
        user.village = 'Kuruppampady';
        await user.save();

        console.log(`✅ Updated RohithRamesh => district='${user.district}' city='${user.city}' village='${user.village}'`);
    } catch (err) {
        console.error('❌', err.message);
    } finally {
        await mongoose.disconnect();
    }
}
run();
