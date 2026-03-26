const fs = require('fs');
const util = require('util');

const content = fs.readFileSync('seed-kerala-final.js', 'utf8');
const startIndex = content.indexOf('const comprehensiveData = [');
if (startIndex === -1) {
    console.error('Could not find comprehensiveData array start');
    process.exit(1);
}

const prefix = content.substring(0, startIndex);
// Find the exact '];' that ends the array
const arrayEndIndex = content.lastIndexOf('];');
if (arrayEndIndex === -1) {
    console.error('Could not find comprehensiveData array end');
    process.exit(1);
}

const arrayString = content.substring(startIndex + 26, arrayEndIndex + 1);
const suffix = content.substring(arrayEndIndex + 1);

let comprehensiveData;
try {
    comprehensiveData = eval(arrayString);
} catch (e) {
    console.error('Error parsing array:', e.message);
    process.exit(1);
}

const hotelTemplates = [
    { name: "Grand {city} Residency", description: "Premium luxury stay with modern amenities", price: "4500", distance: 2.5 },
    { name: "{village} Heritage Inn", description: "Experience traditional Kerala hospitality", price: "3200", distance: 1.2 },
    { name: "Sunrise {village} Resort", description: "Beautiful views and serene environment", price: "5500", distance: 3.8 },
    { name: "{city} Comfort Stay", description: "Affordable and clean rooms for travelers", price: "1500", distance: 0.5 },
    { name: "Blue Lagoon {village}", description: "Waterside retreat with great food", price: "6000", distance: 4.2 },
    { name: "Green Park {city}", description: "Lush green surroundings and quiet ambiance", price: "2800", distance: 2.0 },
    { name: "{village} Boutique Hotel", description: "Stylish and cozy boutique stay", price: "4000", distance: 1.5 },
    { name: "The {city} Plaza", description: "Centrally located with easy access to transport", price: "3500", distance: 0.3 },
    { name: "Mist Valley {village}", description: "Cool breeze and mountain view stay", price: "4800", distance: 5.5 },
    { name: "{city} Eco Lodge", description: "Sustainable and nature-friendly stay", price: "2200", distance: 2.8 },
    { name: "Royal {village} Palace", description: "Stay like royalty in a restored mansion", price: "7500", distance: 1.8 },
    { name: "{city} Budget Inn", description: "Top choice for backpackers and solo travelers", price: "900", distance: 0.7 }
];

const foodTemplates = [
    { name: "{city} Spice House", description: "Best local spices and authentic curries", price: "350", distance: 0.8 },
    { name: "{village} Seafood Grill", description: "Fresh catch of the day served traditional style", price: "600", distance: 1.5 },
    { name: "Green Leaf {city}", description: "Pure vegetarian delights and South Indian meals", price: "200", distance: 0.4 },
    { name: "{village} Tiffen Center", description: "Quick bites and famous Kerala snacks", price: "100", distance: 0.2 },
    { name: "Malabar Kitchen {city}", description: "Famous for Biryani and Malabar delicacies", price: "450", distance: 1.2 },
    { name: "The {village} Cafe", description: "Mocha, shakes and continental snacks", price: "300", distance: 0.6 },
    { name: "Spicy Route {city}", description: "Fusion of traditional and modern multi-cuisine", price: "550", distance: 2.5 },
    { name: "Urban Treat {village}", description: "Trendy spot with outdoor seating", price: "400", distance: 3.0 },
    { name: "{city} Dhaba", description: "Tasty highway style food and grills", price: "300", distance: 5.0 },
    { name: "{village} Sweets Hub", description: "Famous for local desserts and halwa", price: "150", distance: 0.3 },
    { name: "Bamboo Resto {city}", description: "Unique interiors and forest theme dining", price: "450", distance: 2.0 },
    { name: "Grand {village} Feast", description: "Elaborate Sadhya and traditional feasts", price: "500", distance: 1.0 }
];

for (let place of comprehensiveData) {
    if (!place.hotels) place.hotels = [];
    if (!place.food) place.food = [];

    // Add hotels until at least 10
    let hCount = place.hotels.length;
    let templateIdx = 0;
    while (place.hotels.length < 10 && templateIdx < hotelTemplates.length) {
        let t = hotelTemplates[templateIdx];
        let hName = t.name.replace('{city}', place.city).replace('{village}', place.village);
        if (!place.hotels.some(h => h.name === hName)) {
            place.hotels.push({
                name: hName,
                description: t.description,
                price: t.price,
                distance: t.distance + (Math.random() * 2)
            });
        }
        templateIdx++;
    }

    // Add food until at least 10
    let fCount = place.food.length;
    templateIdx = 0;
    while (place.food.length < 10 && templateIdx < foodTemplates.length) {
        let t = foodTemplates[templateIdx];
        let fName = t.name.replace('{city}', place.city).replace('{village}', place.village);
        if (!place.food.some(f => f.name === fName)) {
            place.food.push({
                name: fName,
                description: t.description,
                price: t.price,
                distance: t.distance + (Math.random() * 1.5)
            });
        }
        templateIdx++;
    }
}

const modifiedArrayStr = util.inspect(comprehensiveData, {
    depth: null,
    maxArrayLength: null,
    showHidden: false,
    breakLength: 120,
    compact: false
});

const newContent = prefix + 'const comprehensiveData = ' + modifiedArrayStr + ';' + suffix;
fs.writeFileSync('seed-kerala-final.js', newContent);
console.log('Successfully bulk enriched seed-kerala-final.js with 10+ hotels and 10+ restaurants per location!');
