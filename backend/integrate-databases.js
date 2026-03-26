require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('./models/Place');

const mergePlaces = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // We want to merge everything into the "Canonical" records (Proper Case)
        const places = await Place.find({});
        console.log(`Total places in DB: ${places.length}`);

        const duplicatesMap = {};

        places.forEach(p => {
            // Key based on lowercase names to ignore casing
            const key = `${p.district.toLowerCase()}|${p.city.toLowerCase()}|${p.village.toLowerCase()}`;
            if (!duplicatesMap[key]) {
                duplicatesMap[key] = [];
            }
            duplicatesMap[key].push(p);
        });

        for (const [key, variants] of Object.entries(duplicatesMap)) {
            if (variants.length > 1) {
                console.log(`\nFound ${variants.length} records for ${key}`);

                // Identify the best record (canonical)
                // We prefer Proper Case district/city and more data
                let canonical = variants[0];
                let others = variants.slice(1);

                // Find the one with Proper Case district "Ernakulam" or more data
                variants.forEach(v => {
                    const isProper = /^[A-Z]/.test(v.district);
                    const hasMuchData = (v.hotels?.length || 0) + (v.food?.length || 0) > (canonical.hotels?.length || 0) + (canonical.food?.length || 0);

                    if (isProper || (hasMuchData && !/^[A-Z]/.test(canonical.district))) {
                        canonical = v;
                    }
                });

                others = variants.filter(v => v._id.toString() !== canonical._id.toString());

                console.log(`Canonical: ${canonical._id} (${canonical.village}, ${canonical.district})`);

                for (const source of others) {
                    console.log(`Merging ${source._id} (${source.village}) into canonical...`);

                    const mergeArray = (targetArr, sourceArr) => {
                        const combined = [...(targetArr || [])];
                        (sourceArr || []).forEach(item => {
                            if (item.name) {
                                const exists = combined.some(e => e.name && e.name.toLowerCase() === item.name.toLowerCase());
                                if (!exists) {
                                    combined.push(item);
                                }
                            }
                        });
                        return combined;
                    };

                    canonical.hotels = mergeArray(canonical.hotels, source.hotels);
                    canonical.food = mergeArray(canonical.food, source.food);
                    canonical.transport = mergeArray(canonical.transport, source.transport);
                    canonical.events = mergeArray(canonical.events, source.events);
                    canonical.banks = mergeArray(canonical.banks, source.banks);
                    canonical.medical = mergeArray(canonical.medical, source.medical);
                    canonical.fuelStations = mergeArray(canonical.fuelStations, source.fuelStations);
                    canonical.touristspots = mergeArray(canonical.touristspots, source.touristspots);

                    await Place.findByIdAndDelete(source._id);
                    console.log(`  Deleted ${source._id}`);
                }

                await canonical.save();
                console.log(`✅ Canonical record updated!`);
            }
        }

        console.log('\nGlobal integration complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error during global merge:', error);
        process.exit(1);
    }
};

mergePlaces();
