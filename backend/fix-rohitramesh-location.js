/**
 * One-time script to set district/city/village for existing local admin 'rohitramesh'.
 * 
 * USAGE:
 *   1. Edit the DISTRICT, CITY, VILLAGE values below to match where rohitramesh manages.
 *   2. Run: node backend/fix-rohitramesh-location.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// ── EDIT THESE VALUES ──────────────────────────────────────────────────────
const USERNAME = 'rohitramesh';
const DISTRICT = 'ernakulam';
const CITY = 'perumbavoor';
const VILLAGE = 'kurupumpady';
// ──────────────────────────────────────────────────────────────────────────

async function fixLocation() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const user = await User.findOne({ username: USERNAME });
        if (!user) {
            console.log(`❌ User '${USERNAME}' not found in database.`);
            return;
        }

        console.log(`Found user: ${user.username} (role: ${user.role}, status: ${user.status})`);
        console.log(`Current location: district='${user.district}', city='${user.city}', village='${user.village}'`);

        user.district = DISTRICT;
        user.city = CITY;
        user.village = VILLAGE;
        await user.save();

        console.log(`✅ Updated location to: ${DISTRICT} / ${CITY} / ${VILLAGE}`);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

fixLocation();
