const fetch = require('node-fetch');

async function testLogin(username, password, role) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role })
        });
        const data = await response.json();
        const status = data.success ? '✅ SUCCESS' : '❌ FAILED';
        console.log(`${status} - ${username} (${role}): ${data.success ? 'Logged in!' : data.message}`);
    } catch (error) {
        console.error(`❌ ERROR - ${username} (${role}): ${error.message}`);
    }
}

async function runTests() {
    console.log('\n=== Testing All Login Types ===\n');

    console.log('--- General Users ---');
    await testLogin('testuser', 'test123', 'general');
    await testLogin('nihal', 'nihal123', 'general');
    await testLogin('simon', 'simon123', 'general');

    console.log('\n--- Local Admins ---');
    await testLogin('localadmin', 'admin123', 'local');
    await testLogin('mookanoor', 'admin123', 'local');

    console.log('\n--- Main Admins ---');
    await testLogin('mainadmin', 'admin123', 'main');

    console.log('\n--- Should Fail ---');
    await testLogin('wronguser', 'wrongpass', 'general');
    await testLogin('testuser', 'wrongpass', 'general');

    console.log('\n=== Done ===\n');
}

runTests();
