// Script to view all MongoDB collections and their schemas
const mongoose = require('mongoose');
require('dotenv').config();

async function viewDatabaseSchema() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const db = mongoose.connection.db;

        // Get all collections
        const collections = await db.listCollections().toArray();

        console.log('📊 DATABASE SCHEMA\n');
        console.log('='.repeat(80));

        for (const collection of collections) {
            const collectionName = collection.name;
            console.log(`\n📁 Collection: ${collectionName}`);
            console.log('-'.repeat(80));

            // Get sample document to show schema
            const sampleDoc = await db.collection(collectionName).findOne();

            if (sampleDoc) {
                console.log('Fields:');
                Object.keys(sampleDoc).forEach(key => {
                    const value = sampleDoc[key];
                    const type = Array.isArray(value) ? 'Array' : typeof value;
                    console.log(`  • ${key}: ${type}`);

                    // Show array item structure if it's an array
                    if (Array.isArray(value) && value.length > 0) {
                        const firstItem = value[0];
                        if (typeof firstItem === 'object') {
                            console.log(`    Array contains objects with:`);
                            Object.keys(firstItem).forEach(subKey => {
                                console.log(`      - ${subKey}: ${typeof firstItem[subKey]}`);
                            });
                        }
                    }
                });

                // Count documents
                const count = await db.collection(collectionName).countDocuments();
                console.log(`\nTotal documents: ${count}`);
            } else {
                console.log('  (Empty collection)');
            }
        }

        console.log('\n' + '='.repeat(80));
        console.log('\n📋 SUMMARY:');
        console.log(`Total collections: ${collections.length}`);
        collections.forEach(c => console.log(`  • ${c.name}`));

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

viewDatabaseSchema();
