const mongoose = require('mongoose');

console.log('Testing local MongoDB connection on port 27017...');

mongoose.connect('mongodb://127.0.0.1:27017/tourism_db', {
    serverSelectionTimeoutMS: 3000
}).then(() => {
    console.log('✅ Local MongoDB is running and connected successfully!');
    process.exit(0);
}).catch(err => {
    console.error('❌ Failed to connect to local MongoDB:', err.message);
    process.exit(1);
});
