// Simple test without node-fetch
const http = require('http');

// First login
const loginData = JSON.stringify({
    username: 'admin',
    password: 'admin123',
    role: 'main-admin'
});

const loginOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData.length
    }
};

console.log('Testing login...');
const loginReq = http.request(loginOptions, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Login response status:', res.statusCode);
        console.log('Login response:', data.substring(0, 200));

        try {
            const loginResult = JSON.parse(data);
            if (loginResult.success) {
                const token = loginResult.token;
                console.log('\n✅ Login successful!');

                // Now test the local-admins endpoint
                console.log('\nTesting /api/auth/local-admins...');
                const adminsOptions = {
                    hostname: 'localhost',
                    port: 5000,
                    path: '/api/auth/local-admins',
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                const adminsReq = http.request(adminsOptions, (res2) => {
                    let data2 = '';

                    res2.on('data', (chunk) => {
                        data2 += chunk;
                    });

                    res2.on('end', () => {
                        console.log('Local admins response status:', res2.statusCode);
                        console.log('Local admins response headers:', res2.headers);
                        console.log('Local admins response:', data2);
                    });
                });

                adminsReq.on('error', (error) => {
                    console.error('Error:', error);
                });

                adminsReq.end();
            }
        } catch (error) {
            console.error('Error parsing login response:', error);
        }
    });
});

loginReq.on('error', (error) => {
    console.error('Error:', error);
});

loginReq.write(loginData);
loginReq.end();
