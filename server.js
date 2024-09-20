const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Function to fetch and parse the m3u file
async function fetchChannels() {
    const response = await axios.get('https://raw.githubusercontent.com/FunctionError/PiratesTv/main/combined_playlist.m3u');
    const data = response.data;
    const lines = data.split('\n');
    const channels = [];
    let currentChannel = {};

    lines.forEach(line => {
        if (line.startsWith('#EXTINF')) {
            const match = line.match(/,(.*)/);
            if (match) {
                currentChannel = { name: match[1] };
            }
        } else if (line.startsWith('http')) {
            if (currentChannel.name) {
                currentChannel.url = line;
                channels.push(currentChannel);
                currentChannel = {};
            }
        }
    });

    return channels;
}

// Route to serve channels
app.get('/api/channels', async (req, res) => {
    try {
        const channels = await fetchChannels();
        res.json(channels);
    } catch (error) {
        res.status(500).send('Error fetching channels');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
