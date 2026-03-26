const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

// @route   GET /api/places
// @desc    Get all places
// @access  Public
router.get('/', async (req, res) => {
    try {
        const places = await Place.find({});
        res.json({
            success: true,
            data: places
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   GET /api/places/locations
// @desc    Get all unique districts, cities, and villages for suggestions
// @access  Public
router.get('/locations', async (req, res) => {
    try {
        const places = await Place.find({}, 'district city village');

        // Extract unique values
        const locations = {
            districts: [...new Set(places.map(p => p.district))].filter(Boolean),
            cities: [...new Set(places.map(p => p.city))].filter(Boolean),
            villages: [...new Set(places.map(p => p.village))].filter(Boolean),
            // Also provide full combinations for better matching
            all: places.map(p => ({
                district: p.district,
                city: p.city,
                village: p.village
            }))
        };

        res.json({
            success: true,
            data: locations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   GET /api/places/:district/:city/:village
// @desc    Get place details by location
// @access  Public
router.get('/:district/:city/:village', async (req, res) => {
    try {
        // Trim and escape to make lookup robust
        const escape = s => s.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const district = escape(req.params.district);
        const city = escape(req.params.city);
        const village = escape(req.params.village);

        const place = await Place.findOne({
            district: new RegExp(`^${district}$`, 'i'),
            city: new RegExp(`^${city}$`, 'i'),
            village: new RegExp(`^${village}$`, 'i')
        });

        if (place) {
            res.json({
                success: true,
                data: place
            });
        } else {
            res.json({
                success: true,
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   POST /api/places
// @desc    Create or update place details
// @access  Public (should be protected in production)
router.post('/', async (req, res) => {
    try {
        const { district, city, village, ...details } = req.body;

        // Find existing place or create new one
        let place = await Place.findOne({
            district: new RegExp(`^${district}$`, 'i'),
            city: new RegExp(`^${city}$`, 'i'),
            village: new RegExp(`^${village}$`, 'i')
        });

        if (place) {
            // Update existing place
            Object.keys(details).forEach(key => {
                if (details[key] !== undefined) {
                    place[key] = details[key];
                }
            });
            place.lastUpdated = Date.now();
            await place.save();
        } else {
            // Create new place
            place = await Place.create({
                district,
                city,
                village,
                ...details,
                hotels: details.hotels || [],
                food: details.food || [],
                transport: details.transport || [],
                events: details.events || [],
                touristspots: details.touristspots || [],
                shopping: details.shopping || [],
                medical: details.medical || [],
                banks: details.banks || [],
                parking: details.parking || [],
                emergency: details.emergency || { police: '', hospital: '', fire: '' }
            });
        }

        res.json({
            success: true,
            data: place
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   POST /api/places/:id/items
// @desc    Add item to a category (hotels, food, transport, events)
// @access  Public (should be protected in production)
router.post('/:id/items', async (req, res) => {
    try {
        const { id } = req.params;
        const { category, item } = req.body;

        console.log('🔍 Backend received - Category:', category);
        console.log('🔍 Backend received - Item:', JSON.stringify(item, null, 2));

        const place = await Place.findById(id);

        if (!place) {
            return res.status(404).json({
                success: false,
                message: 'Place not found'
            });
        }

        // Add ID to item if not present
        if (!item.id) {
            item.id = Date.now().toString();
        }

        console.log('💾 Saving item to database:', JSON.stringify(item, null, 2));

        // Add item to the specified category
        if (!place[category]) {
            place[category] = [];
        }
        place[category].push(item);
        place.lastUpdated = Date.now();

        await place.save();

        console.log('✅ Item saved successfully');

        res.json({
            success: true,
            data: place,
            addedItem: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   DELETE /api/places/:id/items/:itemId
// @desc    Remove item from a category
// @access  Public (should be protected in production)
router.delete('/:id/items/:itemId', async (req, res) => {
    try {
        const { id, itemId } = req.params;
        const { category } = req.query;

        const place = await Place.findById(id);

        if (!place) {
            return res.status(404).json({
                success: false,
                message: 'Place not found'
            });
        }

        // Remove item from the specified category
        if (place[category]) {
            place[category] = place[category].filter(item => item.id !== itemId);
            place.lastUpdated = Date.now();
            await place.save();
        }

        res.json({
            success: true,
            data: place
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/places/:id/items/:itemId
// @desc    Update an existing item in a category
// @access  Public (should be protected in production)
router.put('/:id/items/:itemId', async (req, res) => {
    try {
        const { id, itemId } = req.params;
        const { category, updates } = req.body;

        if (!category || !updates) {
            return res.status(400).json({ success: false, message: 'category and updates are required' });
        }

        // Build $set payload using positional arrayFilters — most reliable Mongoose array update
        const setPayload = {};
        Object.keys(updates).forEach(key => {
            setPayload[`${category}.$[elem].${key}`] = updates[key];
        });
        setPayload.lastUpdated = Date.now();

        const result = await Place.findByIdAndUpdate(
            id,
            { $set: setPayload },
            {
                arrayFilters: [{ 'elem._id': itemId }],
                new: true,
                runValidators: false
            }
        );

        if (!result) {
            return res.status(404).json({ success: false, message: 'Place not found' });
        }

        const updatedItem = (result[category] || []).find(i => i._id.toString() === itemId);

        res.json({ success: true, data: result, updatedItem: updatedItem || {} });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/places/:id/emergency
// @desc    Update emergency contacts
// @access  Public (should be protected in production)
router.put('/:id/emergency', async (req, res) => {
    try {
        const { id } = req.params;
        const { police, hospital, fire } = req.body;

        const place = await Place.findById(id);

        if (!place) {
            return res.status(404).json({
                success: false,
                message: 'Place not found'
            });
        }

        place.emergency = {
            police: police || place.emergency.police,
            hospital: hospital || place.emergency.hospital,
            fire: fire || place.emergency.fire
        };
        place.lastUpdated = Date.now();

        await place.save();

        res.json({
            success: true,
            data: place
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   POST /api/places/migrate-categories
// @desc    ONE-TIME migration: adds all category arrays to existing Place documents
// @access  Public (remove after use)
router.post('/migrate-categories', async (req, res) => {
    try {
        const allCategories = [
            'hotels', 'food', 'transport', 'events',
            'touristspots', 'shopping', 'medical', 'banks', 'parking'
        ];

        // Build $set object: only set field if it doesn't exist yet
        const setOnInsert = {};
        allCategories.forEach(cat => {
            setOnInsert[cat] = [];
        });

        const result = await Place.updateMany(
            {}, // match all documents
            [
                {
                    $set: {
                        hotels: { $ifNull: ['$hotels', []] },
                        food: { $ifNull: ['$food', []] },
                        transport: { $ifNull: ['$transport', []] },
                        events: { $ifNull: ['$events', []] },
                        touristspots: { $ifNull: ['$touristspots', []] },
                        shopping: { $ifNull: ['$shopping', []] },
                        medical: { $ifNull: ['$medical', []] },
                        banks: { $ifNull: ['$banks', []] },
                        parking: { $ifNull: ['$parking', []] }
                    }
                }
            ]
        );

        res.json({
            success: true,
            message: `Migration complete! Updated ${result.modifiedCount} place document(s).`,
            matched: result.matchedCount,
            modified: result.modifiedCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Migration failed: ' + error.message
        });
    }
});

module.exports = router;
