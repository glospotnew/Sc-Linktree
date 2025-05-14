let musicUrls = [];
let currentSongIndex = 0;
const audioElement = document.getElementById('audioPlayer');
const changeSongButton = document.getElementById('changeSongButton');

async function loadConfig() {
    try {
        const response = await fetch('data.json');
        const config = await response.json();

        // Informasi Situs
        document.getElementById('pageTitle').textContent = config.siteInfo.title;
        document.getElementById('websiteTitle').textContent = config.siteInfo.title;
        document.getElementById('websiteDescription').textContent = config.siteInfo.description;
        document.getElementById('profileImage').src = config.siteInfo.thumbnailUrl;

        // Tema
        document.body.style.backgroundColor = config.theme.backgroundColor;
        document.documentElement.style.setProperty('--primary-text-color', config.theme.primaryTextColor);
        document.documentElement.style.setProperty('--secondary-text-color', config.theme.secondaryTextColor);
        document.documentElement.style.setProperty('--accent-color', config.theme.accentColor);
        document.documentElement.style.setProperty('--button-text-color', config.theme.buttonTextColor);

        // Musik
        musicUrls = config.music.urls;
        currentSongIndex = config.music.currentIndex || 0; // Gunakan currentIndex dari JSON atau default 0
        loadAndPlaySong(musicUrls[currentSongIndex]);

        // Tombol
        const buttonList = document.getElementById('buttonList');
        buttonList.innerHTML = '';
        config.buttons.forEach(buttonData => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = buttonData.url;

            const icon = document.createElement('i');
            icon.className = buttonData.icon;
            icon.style.marginRight = '10px';

            const titleSpan = document.createElement('span');
            titleSpan.textContent = buttonData.title;

            link.appendChild(icon);
            link.appendChild(titleSpan);
            listItem.appendChild(link);
            buttonList.appendChild(listItem);
        });

        // Footer
        document.getElementById('footerText').innerHTML = config.footer.text;

    } catch (error) {
        console.error('Failed to load configuration:', error);
        displayErrorMessage();
    }
}

function loadAndPlaySong(url) {
    audioElement.src = url;
    audioElement.load();
    audioElement.play();
}

function changeSong() {
    currentSongIndex = (currentSongIndex + 1) % musicUrls.length;
    loadAndPlaySong(musicUrls[currentSongIndex]);
}

function displayErrorMessage() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div style="color: #dc3545; padding: 20px; border: 1px solid #dc3545; border-radius: 8px; background-color: #f8d7da; text-align: center;">
            <strong>Error:</strong> Gagal memuat konfigurasi website. Periksa file <code>data.json</code> Anda.
        </div>
    `;
}

loadConfig();

changeSongButton.addEventListener('click', changeSong);
