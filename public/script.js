async function loadChannels() {
    const response = await fetch('/api/channels');
    const channels = await response.json();
    const channelSelect = document.getElementById('channelSelect');

    channels.forEach(channel => {
        const option = document.createElement('option');
        option.value = channel.url; // Store the URL in the value
        option.textContent = channel.name;
        channelSelect.appendChild(option);
    });

    // Add search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const options = channelSelect.options;

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const text = option.text.toLowerCase();
            option.style.display = text.includes(filter) ? 'block' : 'none';
        }
    });
}

document.getElementById('playButton').addEventListener('click', () => {
    const channelUrl = document.getElementById('channelSelect').value;
    const video = document.getElementById('video');
    const hls = new Hls();

    hls.loadSource(channelUrl);
    hls.attachMedia(video);
});

// Load channels when the page is ready
loadChannels();
