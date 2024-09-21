let channels = [];

async function loadChannels() {
    const response = await fetch('/api/channels');
    channels = await response.json();
    populateChannelSelect(channels);
}

function populateChannelSelect(filteredChannels) {
    const channelSelect = document.getElementById('channelSelect');
    channelSelect.innerHTML = ''; // Clear previous options

    filteredChannels.forEach(channel => {
        const option = document.createElement('option');
        option.value = channel.url; // Store the URL in the value
        option.textContent = channel.name;
        channelSelect.appendChild(option);
    });
}

// Filter channels as the user types
document.getElementById('search').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredChannels = channels.filter(channel =>
        channel.name.toLowerCase().includes(searchTerm)
    );
    populateChannelSelect(filteredChannels);
});

document.getElementById('playButton').addEventListener('click', () => {
    const channelUrl = document.getElementById('channelSelect').value;
    const video = document.getElementById('video');
    const hls = new Hls();

    hls.loadSource(channelUrl);
    hls.attachMedia(video);
});

// Load channels when the page is ready
loadChannels();
