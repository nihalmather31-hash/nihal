const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    district: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    village: {
        type: String,
        required: true,
        trim: true
    },
    hotels: [{
        id: String,
        name: String,
        description: String,
        contact: String,
        address: String,
        price: String,
        amenities: [String],
        bookingLink: String,
        distance: Number
    }],
    food: [{
        id: String,
        name: String,
        description: String,
        contact: String,
        address: String,
        cuisine: String,
        price: String,
        hotelName: String,
        distance: Number
    }],
    transport: [{
        id: String,
        type: { type: String },
        name: String,
        contact: String,
        route: String,
        price: String,
        distance: Number
    }],
    events: [{
        id: String,
        name: String,
        description: String,
        timing: String,
        venue: String,
        date: String,
        location: String,
        contact: String,
        distance: Number
    }],
    fuelStations: [{
        name: String,
        type: { type: String }, // Petrol, EV, CNG
        description: String,
        distance: Number,
        address: String
    }],
    touristspots: [{
        id: String,
        name: String,
        price: String,
        description: String,
        distance: Number
    }],
    medical: [{
        id: String,
        name: String,
        price: String,
        description: String,
        distance: Number
    }],
    banks: [{
        id: String,
        name: String,
        price: String,
        description: String,
        distance: Number
    }],
    emergency: {
        police: { type: String, default: '' },
        hospital: { type: String, default: '' },
        fire: { type: String, default: '' }
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

// Create compound index for faster lookups
placeSchema.index({ district: 1, city: 1, village: 1 }, { unique: true });

module.exports = mongoose.model('Place', placeSchema);
