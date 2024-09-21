let channels = [];

// Function to load channels from the server
async function loadChannels() {
    const response = await fetch('/api/channels');
    channels = await response.json();
    displayChannels(channels);
}

// Function to display channels in the dropdown
function displayChannels(channelList) {
    const channelSelect = document.getElementById('channelSelect');
    channelSelect.innerHTML = '';
    channelList.forEach(channel => {
        const option = document.createElement('option');
        option.value = channel.url; // Store the URL in the value
        option.textContent = channel.name;
        channelSelect.appendChild(option);
    });
}

// Event listener for the play button
document.getElementById('playButton').addEventListener('click', () => {
    const channelUrl = document.getElementById('channelSelect').value;
    const video = document.getElementById('video');
    const hls = new Hls();

    // Clear previous sources if any
    hls.loadSource(channelUrl);
    hls.attachMedia(video);
});

// Event listener for search input
document.getElementById('searchChannel').addEventListener('input', function() {
    const searchText = this.value.toLowerCase();
    const filteredChannels = channels.filter(channel =>
        channel.name.toLowerCase().includes(searchText)
    );
    displayChannels(filteredChannels);
});

// Function to load video quality options
async function loadQualities() {
    const response = await fetch('/api/qualities');
    const qualities = await response.json();
    const qualitySelect = document.getElementById('qualitySelect');

    qualities.forEach(quality => {
        const option = document.createElement('option');
        option.value = quality.url;
        option.textContent = quality.label;
        qualitySelect.appendChild(option);
    });
}

// Event listener for quality selection
document.getElementById('qualitySelect').addEventListener('change', function() {
    const qualityUrl = this.value;
    const video = document.getElementById('video');
    const hls = new Hls();

    hls.loadSource(qualityUrl);
    hls.attachMedia(video);
});

// Load channels and qualities when the page is ready
loadChannels();
loadQualities();
