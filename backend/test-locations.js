const http = require('http');

const url = `http://localhost:5000/api/places/locations`;

http.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        const result = JSON.parse(data);
        console.log('Response Success:', result.success);
        console.log('Districts:', result.data.districts);
        console.log('Cities:', result.data.cities);
        console.log('Villages:', result.data.villages);
        console.log('Total specific locations:', result.data.all.length);
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
