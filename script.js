let musicUrls = [];
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitleEl = document.getElementById('song-title');

let isPlaying = false;
let currentSongIndex = 0;

// Load songs from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        musicUrls = data.songs;
        loadSong();
    });

function loadSong() {
    if (musicUrls.length === 0) return;

    audioPlayer.src = musicUrls[currentSongIndex];
    songTitleEl.textContent = `Lagu ${currentSongIndex + 1}`;
    
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });
}

function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audioPlayer.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audioPlayer.pause();
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgress() {
    if (audioPlayer.duration) {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
}

function setProgress() {
    if (audioPlayer.duration) {
        const newTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % musicUrls.length;
    loadSong();
    if (isPlaying) playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + musicUrls.length) % musicUrls.length;
    loadSong();
    if (isPlaying) playSong();
}

// Event Listeners
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextSong);

progressBar.addEventListener('input', setProgress);
