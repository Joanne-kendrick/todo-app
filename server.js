const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json()); // To handle JSON data

function getIPAddress() {
    const networkInterfaces = os.networkInterfaces();
    for (const iface of Object.values(networkInterfaces)) {
        for (const alias of iface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address; // Return the IP address
            }
        }
    }
    return 'IP not found'; // In case no IP address is found
}

app.get('/', (req, res) => {
    const instanceIP = getIPAddress();
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/ip', (req, res) => {
    const instanceIP = getIPAddress();
    res.send(instanceIP);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});