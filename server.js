const express = require('express');
const os = require('os');

const app = express();

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

// Route to show the IP address of the instance
app.get('/', (req, res) => {
    const instanceIP = getIPAddress();
    res.send(`<h1>Welcome to the Todo App</h1><p>Instance IP Address: ${instanceIP}</p>`);
});

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json()); // To handle JSON data

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
