let musicUrls = [];
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
let currentSongIndex = 0;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        musicUrls = data.songs;
        loadSong();
    });

function loadSong() {
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
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;
    currentTimeEl.textContent = formatTime(currentTime);
}

function setProgress() {
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (progressBar.value * duration) / 100;
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

function changeSong() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * musicUrls.length);
    } while (newIndex === currentSongIndex);
    
    currentSongIndex = newIndex;
    loadSong();
    if (isPlaying) playSong();
}

playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
changeSongBtn.addEventListener('click', changeSong);

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextSong);
progressBar.addEventListener('input', setProgress);
