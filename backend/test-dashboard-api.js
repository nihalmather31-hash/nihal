// Test script to verify the /api/auth/local-admins endpoint
const fetch = require('node-fetch');

const API_URL = 'http://localhost:5000/api';

// First, login to get a token
async function testMainAdminDashboard() {
    try {
        console.log('1. Logging in as main admin...');
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'admin123',
                role: 'main-admin'
            })
        });

        const loginData = await loginResponse.json();

        if (!loginData.success) {
            console.error('❌ Login failed:', loginData.message);
            return;
        }

        console.log('✅ Login successful!');
        console.log('   Token:', loginData.token.substring(0, 20) + '...');

        const token = loginData.token;

        // Now fetch local admins
        console.log('\n2. Fetching local admins...');
        const adminsResponse = await fetch(`${API_URL}/auth/local-admins`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const adminsData = await adminsResponse.json();

        if (!adminsData.success) {
            console.error('❌ Failed to fetch local admins:', adminsData.message);
            return;
        }

        console.log('✅ Successfully fetched local admins!');
        console.log('\nPending:', adminsData.data.pending.length);
        adminsData.data.pending.forEach(admin => {
            console.log(`  - ${admin.username} (${admin.role})`);
        });

        console.log('\nApproved:', adminsData.data.approved.length);
        adminsData.data.approved.forEach(admin => {
            console.log(`  - ${admin.username} (${admin.role})`);
        });

        console.log('\nRejected:', adminsData.data.rejected.length);
        adminsData.data.rejected.forEach(admin => {
            console.log(`  - ${admin.username} (${admin.role})`);
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testMainAdminDashboard();
