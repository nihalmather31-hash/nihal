// API Configuration
const API_BASE_URL = window.location.origin + '/api';

// API Service Layer
class TourismAPI {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('authToken');
    }

    // Helper method to make API requests — always returns data, never throws
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, { ...options, headers });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            // Return a structured error instead of throwing
            return { success: false, message: 'Cannot connect to server. Please check your internet connection.' };
        }
    }

    // Authentication methods
    async login(username, password, role) {
        try {
            const data = await this.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password, role })
            });

            if (data.success && data.token) {
                this.token = data.token;
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('username', username);
                localStorage.setItem('userRole', role);
                // Save admin's jurisdiction location if present
                if (data.user && (data.user.district || data.user.city || data.user.village)) {
                    localStorage.setItem('adminLocation', JSON.stringify({
                        district: data.user.district || '',
                        city: data.user.city || '',
                        village: data.user.village || ''
                    }));
                }
            }

            return data;
        } catch (error) {
            return { success: false, message: 'Login failed. Please try again.' };
        }
    }

    async register(username, password, role, additionalFields = {}) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                role,
                email: additionalFields.email || '',
                fullName: additionalFields.fullName || '',
                phone: additionalFields.phone || '',
                address: additionalFields.address || '',
                district: additionalFields.district || '',
                city: additionalFields.city || '',
                village: additionalFields.village || ''
            })
        });

        if (data.success && data.token) {
            this.token = data.token;
            localStorage.setItem('authToken', data.token);
        }

        return data;
    }

    async verifyToken() {
        return await this.request('/auth/verify');
    }

    // Place methods
    async getPlaceDetails(district, city, village) {
        const data = await this.request(`/places/${district}/${city}/${village}`);
        return data.data;
    }

    async getAllPlaces() {
        const data = await this.request('/places');
        return data.data;
    }

    async getLocations() {
        const data = await this.request('/places/locations');
        return data.data;
    }

    async savePlaceDetails(district, city, village, details) {
        const data = await this.request('/places', {
            method: 'POST',
            body: JSON.stringify({ district, city, village, ...details })
        });
        return data.data;
    }

    async addItem(placeId, category, item) {
        const data = await this.request(`/places/${placeId}/items`, {
            method: 'POST',
            body: JSON.stringify({ category, item })
        });
        return data.addedItem;
    }

    async removeItem(placeId, category, itemId) {
        const data = await this.request(`/places/${placeId}/items/${itemId}?category=${category}`, {
            method: 'DELETE'
        });
        return data.data;
    }

    async updateItem(placeId, category, itemId, updates) {
        const data = await this.request(`/places/${placeId}/items/${itemId}`, {
            method: 'PUT',
            body: JSON.stringify({ category, updates })
        });
        return data.updatedItem;
    }

    async updateEmergencyContacts(placeId, emergency) {
        const data = await this.request(`/places/${placeId}/emergency`, {
            method: 'PUT',
            body: JSON.stringify(emergency)
        });
        return data.data;
    }

    logout() {
        this.token = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
    }

    // User Monitoring
    async getUsers() {
        return await this.request('/auth/users');
    }

    async deleteUser(userId) {
        return await this.request(`/auth/users/${userId}`, {
            method: 'DELETE'
        });
    }

    // Chat methods
    async sendMessage(receiverId, content) {
        return await this.request('/chat/send', {
            method: 'POST',
            body: JSON.stringify({ receiverId, content })
        });
    }

    async getMessages(otherUserId) {
        return await this.request(`/chat/messages/${otherUserId}`);
    }

    async getConversations() {
        return await this.request('/chat/conversations');
    }

    async getMainAdminId() {
        return await this.request('/auth/main-admin-id');
    }
}

// Backward compatible wrapper class that mimics the old localStorage-based API
class TourismDatabase {
    constructor() {
        this.api = new TourismAPI();
        this.currentPlace = null;
    }

    // Helper to generate a key from location (kept for compatibility)
    getKey(district, city, village) {
        return `${district.toLowerCase().trim()}_${city.toLowerCase().trim()}_${village.toLowerCase().trim()}`;
    }

    // Save details for a specific place
    async savePlaceDetails(district, city, village, details) {
        try {
            const place = await this.api.savePlaceDetails(district, city, village, details);
            console.log(`Saved details for ${district}/${city}/${village}`);
            return place;
        } catch (error) {
            console.error('Error saving place details:', error);
            throw error;
        }
    }

    // Add an item to a specific category (hotels, food, etc.)
    async addItem(district, city, village, category, item) {
        try {
            // First get the place to get its ID
            let place = await this.api.getPlaceDetails(district, city, village);

            if (!place) {
                // Create the place if it doesn't exist
                place = await this.api.savePlaceDetails(district, city, village, {
                    [category]: []
                });
            }

            // Add the item
            const addedItem = await this.api.addItem(place._id, category, item);
            return addedItem;
        } catch (error) {
            console.error('Error adding item:', error);
            throw error;
        }
    }

    // Remove an item from a category
    async removeItem(district, city, village, category, itemId) {
        try {
            const place = await this.api.getPlaceDetails(district, city, village);

            if (place) {
                await this.api.removeItem(place._id, category, itemId);
            }
        } catch (error) {
            console.error('Error removing item:', error);
            throw error;
        }
    }

    // Update an existing item in a category
    async updateItem(district, city, village, category, itemId, updates) {
        try {
            const place = await this.api.getPlaceDetails(district, city, village);

            if (!place) throw new Error('Place not found');

            return await this.api.updateItem(place._id, category, itemId, updates);
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    }

    // Get details for a specific place
    async getPlaceDetails(district, city, village) {
        try {
            const place = await this.api.getPlaceDetails(district, city, village);
            return place || null;
        } catch (error) {
            console.error('Error getting place details:', error);
            return null;
        }
    }

    // Update emergency contacts
    async updateEmergencyContacts(district, city, village, emergency) {
        try {
            const place = await this.api.getPlaceDetails(district, city, village);

            if (place) {
                await this.api.updateEmergencyContacts(place._id, emergency);
            }
        } catch (error) {
            console.error('Error updating emergency contacts:', error);
            throw error;
        }
    }

    // Get all available locations
    async getLocations() {
        try {
            return await this.api.getLocations();
        } catch (error) {
            console.error('Error getting locations:', error);
            return { districts: [], cities: [], villages: [], all: [] };
        }
    }
}

// Export singleton instances
const api = new TourismAPI();
const db = new TourismDatabase();
