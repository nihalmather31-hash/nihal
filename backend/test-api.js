const http = require('http');

const district = 'ernakulam';
const city = 'perumbavoor';
const village = 'kurupumpaddy';

const url = `http://localhost:5000/api/places/${encodeURIComponent(district)}/${encodeURIComponent(city)}/${encodeURIComponent(village)}`;

http.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response:', JSON.parse(data));
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
