require('dotenv').config();
const mongoose = require('mongoose');

// Alternative connection string without SRV (using standard format)
const alternativeUri = 'mongodb+srv://nihalmather31:nihal123@cluster0.r5jcjhl.mongodb.net/tourism_db?retryWrites=true&w=majority';

console.log('Attempting connection with increased timeout...');

mongoose.connect(alternativeUri, {
    serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
    socketTimeoutMS: 45000,
})
    .then(() => {
        console.log('✅ SUCCESS! MongoDB Atlas connected!');
        console.log('Host:', mongoose.connection.host);
        console.log('Database:', mongoose.connection.name);
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ CONNECTION FAILED!');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);

        if (error.message.includes('ECONNREFUSED')) {
            console.error('\n🔍 Diagnosis: Connection refused');
            console.error('Possible causes:');
            console.error('1. Firewall or antivirus blocking MongoDB port');
            console.error('2. VPN blocking the connection');
            console.error('3. Corporate network restrictions');
            console.error('4. IP whitelist not yet active (wait 5 more minutes)');
        } else if (error.message.includes('authentication')) {
            console.error('\n🔍 Diagnosis: Authentication failed');
            console.error('Check your username and password');
        } else if (error.message.includes('timeout')) {
            console.error('\n🔍 Diagnosis: Connection timeout');
            console.error('Network might be slow or blocking MongoDB');
        }

        process.exit(1);
    });
