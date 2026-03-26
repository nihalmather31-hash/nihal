const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('./models/Place');

const keralaData = [
    {
        district: 'Idukki',
        city: 'Munnar',
        village: 'Munnar Colony',
        description: 'Munnar is a town and hill station in the Idukki district of the southwestern Indian state of Kerala. Munnar is situated at around 1,600 metres (5,200 ft) above mean sea level.',
        hotels: [
            {
                name: 'Blanket Hotel & Spa',
                description: 'Luxury hilltop resort with tea plantation views',
                price: '12000',
                address: 'Attukad Waterfall Road, Pallivassal, Munnar, Kerala 685612',
                bookingLink: 'https://www.booking.com/hotel/in/blanket-hotel-spa.html'
            },
            {
                name: 'Tea County Munnar',
                description: 'Classic KTDC property near city center',
                price: '7000',
                address: 'KTDC Hill Resort, Colony Road, Munnar, Kerala 685612',
                bookingLink: 'https://www.ktdc.com/tea-county'
            }
        ],
        food: [
            { name: 'Rapsy Restaurant', description: 'Famous for Spanish omelettes and local cuisine', price: '300', hotelName: 'Munnar Town', address: 'Main Bazar, Munnar' },
            { name: 'Sariya Lunch Home', description: 'Excellent Kerala Sadya', price: '200', hotelName: 'Market Road', address: 'Market Road, Munnar' }
        ],
        touristspots: [
            { name: 'Eravikulam National Park', description: 'Home to the endangered Nilgiri Tahr' },
            { name: 'Mattupetty Dam', description: 'Scenic dam with boat rides' }
        ],
        medical: [
            { name: 'Tata Global Beverages General Hospital', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 2 },
            { name: 'Munnar Medicals', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 1 }
        ],
        banks: [
            { name: 'SBI Munnar', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 1 },
            { name: 'HDFC Bank Munnar', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 1.5 }
        ],
        emergency: { police: '04865-230321', hospital: '04865-232222', fire: '101' }
    },
    {
        district: 'Alappuzha',
        city: 'Alappuzha',
        village: 'Punnamada',
        description: 'Alappuzha (or Alleppey) is a city on the Laccadive Sea in the southern Indian state of Kerala. It\'s best known for houseboat cruises along the rustic Kerala backwaters.',
        hotels: [
            {
                name: 'Ramada by Wyndham Alleppey',
                description: 'Backwater facing luxury hotel',
                price: '9000',
                address: 'Punnamada, Finishing Point, Alappuzha, Kerala 688013',
                bookingLink: 'https://www.wyndhamhotels.com/ramada/alappuzha-india/ramada-alleppey/overview'
            },
            {
                name: 'Lake Palace Resort',
                description: 'Waterfront resort near finishing point',
                price: '11000',
                address: 'Near Finishing Point, Alappuzha, Kerala 688013',
                bookingLink: 'https://www.lakepalaceresort.com/'
            }
        ],
        food: [
            { name: 'Thaff Restaurant', description: 'Popular for Biryani and Malabar dishes', price: '350', hotelName: 'Near Beach', address: 'Beach Road, Alappuzha' },
            { name: 'Dreamers Restaurant', description: 'Seafood specialty restaurant', price: '500', hotelName: 'Sea View', address: 'Alappuzha Beach' }
        ],
        touristspots: [
            { name: 'Alappuzha Beach', description: 'Famous for its ancient pier' },
            { name: 'Backwater Cruise', description: 'Houseboat journey through Vembanad Lake' }
        ],
        medical: [
            { name: 'Sahrudaya Hospital', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 3 },
            { name: 'Alleppey Medicals', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 1 }
        ],
        banks: [
            { name: 'Federal Bank Finishing Point', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 0.5 },
            { name: 'SBI Alappuzha', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 2 }
        ],
        emergency: { police: '0477-2230800', hospital: '0477-2251171', fire: '101' }
    },
    {
        district: 'Ernakulam',
        city: 'Kochi',
        village: 'Fort Kochi',
        description: 'Fort Kochi is a settlement located in the Kochi city in the state of Kerala, India. This is part of a handful of water-bound regions toward the south-west of the mainland Kochi.',
        hotels: [
            {
                name: 'Brunton Boatyard',
                description: 'Historic themed luxury hotel',
                price: '15000',
                address: '1/498, Calvathy Road, Fort Kochi, Kochi, Kerala 682001',
                bookingLink: 'https://www.cghearth.com/brunton-boatyard'
            },
            {
                name: 'Eight Bastion',
                description: 'Dutch colonial style boutique hotel',
                price: '10000',
                address: '1/259, Napier Street, Fort Kochi, Kochi, Kerala 682001',
                bookingLink: 'https://www.cghearth.com/eighth-bastion'
            }
        ],
        food: [
            { name: 'Kashi Art Cafe', description: 'Famous for organic food and art gallery', price: '600', hotelName: 'Burgher Street', address: 'Burgher St, Fort Kochi' },
            { name: 'Oceanos Restaurant', description: 'Premium seafood in colonial setting', price: '800', hotelName: 'Fort Kochi', address: 'Elphinstone Rd, Fort Kochi' }
        ],
        touristspots: [
            { name: 'Chinese Fishing Nets', description: 'Iconic fishing nets on the beach' },
            { name: 'Mattancherry Palace', description: 'Dutch Palace with historic murals' }
        ],
        medical: [
            { name: 'Government Hospital Fort Kochi', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 1.5 },
            { name: 'Gautham Hospital', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 2.5 }
        ],
        banks: [
            { name: 'Union Bank of India Fort Kochi', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 0.8 },
            { name: 'Axis Bank ATM', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 0.2 }
        ],
        emergency: { police: '0484-2215055', hospital: '0484-2216007', fire: '101' }
    },
    {
        district: 'Wayanad',
        city: 'Kalpetta',
        village: 'Meppadi',
        description: 'Meppadi is a village in Vythiri Taluk of Wayanad district, Kerala, India. It is a hill station located on the State Highway between Kozhikode and Ooty.',
        hotels: [
            {
                name: 'Vythiri Resort',
                description: 'Eco-friendly jungle resort',
                price: '14000',
                address: 'Lakkidi P.O, Vythiri, Wayanad, Kerala 673576',
                bookingLink: 'https://www.vythiriresort.com/'
            }
        ],
        food: [
            { name: '1980\'s A Nostalgic Restaurant', description: 'Traditional Wayanad food', price: '400', address: 'Kalpetta, Wayanad' }
        ],
        touristspots: [
            { name: 'Soochipara Falls', description: 'Beautiful three-tiered waterfall' },
            { name: 'Chembra Peak', description: 'Highest peak in Wayanad with a heart-shaped lake' }
        ],
        medical: [
            { name: 'Wayanad Institute of Medical Sciences (WIMS)', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 5 }
        ],
        banks: [
            { name: 'Kerala Bank Meppadi', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 1 },
            { name: 'Canara Bank Meppadi', description: 'Location: https://maps.app.goo.gl/9Z3f1Z7Z7Z7Z7Z7Z7', distance: 1.2 }
        ],
        emergency: { police: '04936-202222', hospital: '04936-202422', fire: '101' }
    }
];

async function seedData() {
    try {
        console.log('Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
        console.log('✅ Connected!');

        for (const data of keralaData) {
            const query = {
                district: new RegExp(`^${data.district.trim()}$`, 'i'),
                city: new RegExp(`^${data.city.trim()}$`, 'i'),
                village: new RegExp(`^${data.village.trim()}$`, 'i')
            };

            const existingPlace = await Place.findOne(query);

            if (existingPlace) {
                console.log(`Updating existing place: ${data.city}/${data.village}`);
                await Place.findByIdAndUpdate(existingPlace._id, data, { new: true });
            } else {
                console.log(`Creating new place: ${data.city}/${data.village}`);
                const newPlace = new Place(data);
                await newPlace.save();
            }
        }

        console.log('✅ Enriched Seeding completed successfully!');
    } catch (err) {
        console.error('❌ Error Seeding:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

seedData();
