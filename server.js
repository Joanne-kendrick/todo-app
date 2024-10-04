const express = require('express');
const os = require('os');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

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

    res.sendFile(path.join(__dirname, 'public', 'index.html'),{
        headers: {'X-Instance-IP': instanceIP }
    }) ;
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
