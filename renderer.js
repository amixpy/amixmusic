const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

// DOM Elements
const screens = document.querySelectorAll('.screen');
const navItems = document.querySelectorAll('.nav-item');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const playButton = document.getElementById('play-btn');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const currentSongTitle = document.getElementById('current-song-title');
const currentSongArtist = document.getElementById('current-song-artist');

// State
let currentSong = null;
let songs = [];
let playlists = [];
let isPlaying = false;

// Audio Player
const audio = new Audio();

// Navigation
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const screen = item.dataset.screen;
        screens.forEach(s => s.classList.remove('active'));
        document.getElementById(`${screen}-screen`).classList.add('active');
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

// Search
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        const results = songs.filter(song => 
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase())
        );
        displaySearchResults(results);
    }
});

// Audio Controls
playButton.addEventListener('click', () => {
    if (currentSong) {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }
});

prevButton.addEventListener('click', () => {
    if (currentSong) {
        // Implement previous song logic
    }
});

nextButton.addEventListener('click', () => {
    if (currentSong) {
        // Implement next song logic
    }
});

// Progress Bar
audio.addEventListener('timeupdate', () => {
    const progressWidth = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressWidth}%`;
});

// Load Songs
function loadSongs() {
    // This would be replaced with actual file scanning in production
    const sampleSongs = [
        {
            id: '1',
            title: 'Sample Song 1',
            artist: 'Artist Name',
            path: path.join(__dirname, 'sample.mp3')
        },
        // Add more sample songs
    ];
    songs = sampleSongs;
    displaySongs(songs);
}

// Display Functions
function displaySongs(songs) {
    const container = document.getElementById('recent-songs');
    container.innerHTML = songs.map(song => `
        <div class="song-item" onclick="playSong('${song.id}')">
            <div class="song-info">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            </div>
        </div>
    `).join('');
}

function displayPlaylists(playlists) {
    const container = document.getElementById('playlists');
    container.innerHTML = playlists.map(playlist => `
        <div class="playlist-item" onclick="openPlaylist('${playlist.id}')">
            <h3>${playlist.name}</h3>
            <p>${playlist.songs.length} songs</p>
        </div>
    `).join('');
}

function displaySearchResults(results) {
    const container = document.getElementById('search-results');
    container.innerHTML = results.map(song => `
        <div class="song-item" onclick="playSong('${song.id}')">
            <div class="song-info">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            </div>
        </div>
    `).join('');
}

function playSong(songId) {
    const song = songs.find(s => s.id === songId);
    if (song) {
        currentSong = song;
        audio.src = song.path;
        audio.play();
        isPlaying = true;
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        currentSongTitle.textContent = song.title;
        currentSongArtist.textContent = song.artist;
    }
}

// Initialize
loadSongs();
