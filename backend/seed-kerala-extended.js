const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('./models/Place');

const extendedKeralaData = [
    {
        district: 'Idukki',
        city: 'Munnar',
        village: 'Munnar Colony',
        description: 'Munnar is a town and hill station in the Idukki district of the southwestern Indian state of Kerala. Munnar is situated at around 1,600 metres (5,200 ft) above mean sea level.',
        hotels: [
            { name: 'Blanket Hotel & Spa', description: 'Luxury hilltop resort with tea plantation views', price: '12000', address: 'Attukad Waterfall Road, Pallivassal, Munnar', bookingLink: 'https://www.booking.com/hotel/in/blanket-hotel-spa.html', distance: 5 },
            { name: 'Tea County Munnar', description: 'Classic KTDC property near city center', price: '7000', address: 'KTDC Hill Resort, Colony Road, Munnar', bookingLink: 'https://www.ktdc.com/tea-county', distance: 1 },
            { name: 'Munnar Inn', description: 'Budget friendly stay in town center', price: '2500', address: 'Main Bazar, Munnar', distance: 0.5 }
        ],
        food: [
            { name: 'Rapsy Restaurant', description: 'Famous for Spanish omelettes and local cuisine', price: '300', hotelName: 'Munnar Town', address: 'Main Bazar, Munnar', distance: 0.5 },
            { name: 'Sariya Lunch Home', description: 'Excellent Kerala Sadya', price: '200', hotelName: 'Market Road', address: 'Market Road, Munnar', distance: 0.8 },
            { name: 'Saravana Bhavan', description: 'Authentic South Indian Veg Food', price: '250', hotelName: 'Munnar Town', distance: 0.5 }
        ],
        transport: [
            { type: 'Taxi', name: 'Munnar Taxi Service', contact: '04865-230001', route: 'Local Sightseeing', price: '2500', distance: 0 },
            { type: 'Bus', name: 'KSRTC Munnar', route: 'Munnar to Kochi', price: '250', distance: 1 }
        ],
        touristspots: [
            { name: 'Eravikulam National Park', description: 'Home to the endangered Nilgiri Tahr', distance: 8, price: '200' },
            { name: 'Mattupetty Dam', description: 'Scenic dam with boat rides', distance: 12, price: '500' },
            { name: 'Tea Museum', description: 'History of tea plantations in Munnar', distance: 2, price: '150' }
        ],
        medical: [
            { name: 'Tata Global Beverages General Hospital', description: 'Main hospital in Munnar', distance: 2 },
            { name: 'Munnar Medicals', description: '24/7 Pharmacy', distance: 0.5 }
        ],
        banks: [
            { name: 'SBI Munnar', description: 'With ATM services', distance: 0.5 },
            { name: 'Federal Bank', description: 'Near Town Hall', distance: 0.6 }
        ],
        emergency: { police: '04865-230321', hospital: '04865-232222', fire: '101' }
    },
    {
        district: 'Thiruvananthapuram',
        city: 'Trivandrum',
        village: 'Varkala Beach',
        description: 'Varkala is a coastal town in the Thiruvananthapuram district. It is the only place in southern Kerala where cliffs are found adjacent to the Arabian Sea.',
        hotels: [
            { name: 'Gateway Varkala - IHCL SeleQtions', description: 'Luxury resort on the cliff', price: '9500', bookingLink: 'https://www.seleqtionshotels.com/', distance: 0.5 },
            { name: 'Clafouti Beach Resort', description: 'Boutique stay with sea views', price: '4500', distance: 0.2 }
        ],
        food: [
            { name: 'Darjeeling Cafe', description: 'Trendy cliff-side cafe with global cuisine', price: '600', hotelName: 'North Cliff', distance: 0.3 },
            { name: 'Abba Restaurant', description: 'Famous for fresh seafood and bakery items', price: '800', hotelName: 'North Cliff', distance: 0.4 }
        ],
        transport: [
            { type: 'Auto', name: 'Local Auto Stand', route: 'Cliff to Varkala Station', price: '100', distance: 0.1 },
            { type: 'Bike Rental', name: 'Varkala Wheels', price: '500', distance: 0.5 }
        ],
        touristspots: [
            { name: 'Varkala Cliff', description: 'Stunning geographical feature with shops and cafes', distance: 0, price: '0' },
            { name: 'Janardanaswamy Temple', description: '2000-year-old ancient temple', distance: 2, price: '0' },
            { name: 'Kappil Beach', description: 'Estuary where backwaters meet sea', distance: 6, price: '0' }
        ],
        medical: [
            { name: 'Mission Hospital Varkala', distance: 3 },
            { name: 'Devi Pharmacy', distance: 0.5 }
        ],
        banks: [
            { name: 'South Indian Bank Varkala', distance: 2 },
            { name: 'ICICI Bank ATM Cliff', distance: 0.2 }
        ],
        emergency: { police: '0470-2602331', hospital: '0470-2607730', fire: '101' }
    },
    {
        district: 'Thrissur',
        city: 'Chalakudy',
        village: 'Athirappilly',
        description: 'Athirappilly is famous for its majestic waterfall, often called the "Niagara of India". It is located on the Chalakudy River.',
        hotels: [
            { name: 'Rainforest Resort', description: 'Luxury resort facing the waterfall', price: '15000', bookingLink: 'https://www.rainforest.in/', distance: 0.5 },
            { name: 'Athirappilly Residency', description: 'Budget comfortable stay', price: '3000', distance: 2 }
        ],
        food: [
            { name: 'Waterfalls View Restaurant', description: 'Dine with a view of the falls', price: '500', distance: 0.5 },
            { name: 'Puzhayoram Restaurant', description: 'Local Kerala meals', price: '200', distance: 1.5 }
        ],
        transport: [
            { type: 'Bus', name: 'KSRTC Chalakudy', route: 'Athirappilly to Chalakudy', price: '50', distance: 1 },
            { type: 'Taxi', name: 'Athirappilly Cab', price: '1500', distance: 0.2 }
        ],
        touristspots: [
            { name: 'Athirappilly Waterfalls', description: 'Largest waterfall in Kerala', distance: 0.1, price: '50' },
            { name: 'Vazhachal Falls', description: 'Scenic waterfall near Athirappilly', distance: 5, price: '30' },
            { name: 'Ezhattumugham', description: 'Nature village and check dam', distance: 12, price: '20' }
        ],
        medical: [
            { name: 'Government PHC Athirappilly', distance: 2 }
        ],
        emergency: { police: '0480-2708331', hospital: '0480-2709131', fire: '101' }
    }
];

async function seedExtendedData() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected!');

        for (const data of extendedKeralaData) {
            const query = {
                district: data.district,
                city: data.city,
                village: data.village
            };

            const existing = await Place.findOne(query);
            if (existing) {
                console.log(`Updating existing place: ${data.village}`);
                await Place.findByIdAndUpdate(existing._id, { ...data, lastUpdated: new Date() }, { new: true });
            } else {
                console.log(`Creating new place: ${data.village}`);
                const newPlace = new Place(data);
                await newPlace.save();
            }
        }

        console.log('✅ Extended Seeding completed successfully!');
    } catch (err) {
        console.error('❌ Error Seeding:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

seedExtendedData();
