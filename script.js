// Load configuration from data.json
let config = {};

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        config = data;
        initializeWebsite();
        initializeMusicPlayer();
    })
    .catch(error => {
        console.error('Error loading configuration:', error);
        // Fallback data if data.json fails to load
        config = {
            siteInfo: {
                title: "Glospot Botz",
                description: "Asisten Digital Anda",
                thumbnailUrl: "https://g.top4top.io/p_3420aouot1.jpg"
            },
            buttons: [
                {
                    title: "Whatsapp Pemilik Bot",
                    url: "https://wa.me/message/FEKYR7NENFG7N1",
                    icon: "fab fa-whatsapp"
                },
                {
                    title: "Group Bot",
                    url: "https://chat.whatsapp.com/JzpLPmrYl8g5YTihhLo0Gh",
                    icon: "fa fa-commenting"
                },
                {
                    title: "Channel Bot/Informasi",
                    url: "https://whatsapp.com/channel/0029VaIRJkGInlqPr3kjRV0s",
                    icon: "fa-solid fa-headset"
                },
                {
                    title: "Sewa Bot",
                    url: "https://wa.me/p/8376318075818227/6283890747424",
                    icon: "fa-solid fa-robot"
                }
            ],
            music: {
                urls: [
                    "https://a.top4top.io/m_3019nsgq00.mp3",
                    "https://a.top4top.io/m_301981ieu0.mp3",
                    "https://i.top4top.io/m_30194pxva0.mp3",
                    "https://f.top4top.io/m_3018obkyc0.mp3",
                    "https://i.top4top.io/m_30161kg540.mp3"
                ],
                currentIndex: 0
            },
            footer: {
                text: "© 2021-2025 Glospot - Botz"
            }
        };
        initializeWebsite();
        initializeMusicPlayer();
    });

function initializeWebsite() {
    // Set site info
    document.getElementById('site-title').textContent = config.siteInfo.title;
    document.getElementById('site-description').textContent = config.siteInfo.description;
    document.getElementById('thumbnail').src = config.siteInfo.thumbnailUrl;
    document.getElementById('footer-text').innerHTML = config.footer.text;

    // Create buttons
    const buttonsContainer = document.getElementById('buttons-container');
    config.buttons.forEach(button => {
        const buttonElement = document.createElement('a');
        buttonElement.href = button.url;
        buttonElement.className = 'button';
        buttonElement.innerHTML = `<i class="${button.icon}"></i> ${button.title}`;
        buttonsContainer.appendChild(buttonElement);
    });
}

function initializeMusicPlayer() {
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const songTitleEl = document.getElementById('song-title');
    const changeSongBtn = document.getElementById('change-song-btn');

    let isPlaying = false;
    let currentSongIndex = config.music.currentIndex || 0;

    // Load song
    function loadSong() {
        const songUrl = config.music.urls[currentSongIndex];
        audioPlayer.src = songUrl;
        songTitleEl.textContent = `Lagu ${currentSongIndex + 1}`;
        
        audioPlayer.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(audioPlayer.duration);
        });
    }

    // Play song
    function playSong() {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        audioPlayer.play();
    }

    // Pause song
    function pauseSong() {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        audioPlayer.pause();
    }

    // Format time
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Update progress bar
    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(currentTime);
    }

    // Set progress bar
    function setProgress() {
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (progressBar.value * duration) / 100;
    }

    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex >= config.music.urls.length) {
            currentSongIndex = 0;
        }
        loadSong();
        if (isPlaying) playSong();
    }

    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = config.music.urls.length - 1;
        }
        loadSong();
        if (isPlaying) playSong();
    }

    // Change song randomly
    function changeSong() {
        const newIndex = Math.floor(Math.random() * config.music.urls.length);
        if (newIndex !== currentSongIndex) {
            currentSongIndex = newIndex;
        } else {
            currentSongIndex = (newIndex + 1) % config.music.urls.length;
        }
        loadSong();
        if (isPlaying) playSong();
    }

    // Event listeners
    playBtn.addEventListener('click', () => {
        isPlaying ? pauseSong() : playSong();
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    changeSongBtn.addEventListener('click', changeSong);

    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextSong);
    progressBar.addEventListener('input', setProgress);

    // Load first song
    loadSong();
        }
