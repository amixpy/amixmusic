// Initialize audio context for visualizer
let audioContext = null;
let analyser = null;
let dataArray = null;
let canvas = null;
let ctx = null;

// Initialize audio
const audio = new Audio();
let isPlaying = false;
let currentSongIndex = 0;
let songs = [];
let playlists = [];
let featuredPlaylists = [];
let recentlyPlayed = [];

// Initialize visualizer
function initVisualizer() {
    canvas = document.getElementById('visualizer');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Create audio context and analyser
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    
    // Connect audio to analyser
    audio.srcElement.connect(analyser);
    
    // Start animation loop
    requestAnimationFrame(drawVisualizer);
}

// Draw visualizer
function drawVisualizer() {
    if (!isPlaying) return;
    
    analyser.getByteFrequencyData(dataArray);
    
    // Clear canvas
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    const barWidth = canvas.width / 64;
    const barHeight = canvas.height * 0.8;
    
    for (let i = 0; i < dataArray.length; i++) {
        const x = i * barWidth;
        const y = canvas.height - dataArray[i];
        const height = dataArray[i];
        
        ctx.fillStyle = `hsl(${i * 2}, 100%, 50%)`;
        ctx.fillRect(x, y, barWidth, height);
    }
    
    requestAnimationFrame(drawVisualizer);
}

// Playlist management
function createPlaylist(name) {
    const playlist = {
        id: Date.now(),
        name: name,
        songs: []
    };
    playlists.push(playlist);
    savePlaylists();
    updatePlaylistDisplay();
}

function savePlaylists() {
    localStorage.setItem('playlists', JSON.stringify(playlists));
}

function updatePlaylistDisplay() {
    const playlistGrid = document.querySelector('.playlist-grid');
    playlistGrid.innerHTML = playlists.map(playlist => `
        <div class="playlist-card" onclick="openPlaylist(${playlist.id})">
            <div class="playlist-info">
                <h3>${playlist.name}</h3>
                <p>${playlist.songs.length} songs</p>
            </div>
        </div>
    `).join('');
}

// Audio controls
function playSong(song) {
    currentSongIndex = songs.findIndex(s => s === song);
    audio.src = song.path;
    audio.play();
    isPlaying = true;
    updateUI();
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    updateUI();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex]);
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex]);
}

function updateUI() {
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const songTitle = document.querySelector('.song-title');
    const songArtist = document.querySelector('.song-artist');
    const albumArt = document.querySelector('.album-art');
    
    if (isPlaying) {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        const currentSong = songs[currentSongIndex];
        songTitle.textContent = currentSong.title;
        songArtist.textContent = currentSong.artist;
        albumArt.src = currentSong.albumArt || 'default-album.png';
    } else {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Progress bar handling
function updateProgress() {
    const progress = document.querySelector('.progress');
    const progressTime = document.querySelectorAll('.progress-time');
    
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    
    if (duration) {
        progress.style.width = `${(currentTime / duration) * 100}%`;
        progressTime[0].textContent = formatTime(currentTime);
        progressTime[1].textContent = formatTime(duration);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Volume control
function setVolume(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const volume = x / width;
    audio.volume = volume;
    updateVolumeDisplay(volume);
}

function updateVolumeDisplay(volume) {
    const volumeLevel = document.querySelector('.volume-level');
    volumeLevel.style.width = `${volume * 100}%`;
}

// Social sharing functions
function shareOnFacebook() {
    const song = getCurrentSong();
    const shareUrl = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&t=${encodeURIComponent(song.title)}`;
    window.open(shareUrl, '_blank');
}

function shareOnTwitter() {
    const song = getCurrentSong();
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(song.title)}`;
    window.open(shareUrl, '_blank');
}

function shareOnInstagram() {
    const song = getCurrentSong();
    const shareUrl = `https://instagram.com/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(song.title)}`;
    window.open(shareUrl, '_blank');
}

function shareOnWhatsApp() {
    const song = getCurrentSong();
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(song.title + '\n' + window.location.href)}`;
    window.open(shareUrl, '_blank');
}

// Download functions
function downloadSong() {
    const song = getCurrentSong();
    const link = document.createElement('a');
    link.href = song.path;
    link.download = `${song.title}.mp3`;
    link.click();
}

function downloadPlaylist() {
    const playlist = getActivePlaylist();
    const blob = new Blob([JSON.stringify(playlist)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${playlist.name}.json`;
    link.click();
}

function exportPlaylist() {
    const playlist = getActivePlaylist();
    const csv = playlist.songs.map(song => `
        "${song.title}","${song.artist}","${song.album}","${song.duration}"
    `).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${playlist.name}.csv`;
    link.click();
}

// Theme functions
function setTheme(theme) {
    document.body.className = theme + '-theme';
    localStorage.setItem('theme', theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

// Initialize everything
function initialize() {
    // Load saved playlists
    const savedPlaylists = localStorage.getItem('playlists');
    if (savedPlaylists) {
        playlists = JSON.parse(savedPlaylists);
    }
    
    // Load featured playlists
    loadFeaturedPlaylists();
    
    // Initialize visualizer
    initVisualizer();
    
    // Update UI
    updatePlaylistDisplay();
    loadTheme();
}

// Load sample featured playlists
function loadFeaturedPlaylists() {
    featuredPlaylists = [
        {
            id: 1,
            name: 'Top Hits',
            description: 'Most popular songs of the week',
            image: 'top-hits.jpg'
        },
        {
            id: 2,
            name: 'Chill Vibes',
            description: 'Relaxing music for study and work',
            image: 'chill-vibes.jpg'
        },
        {
            id: 3,
            name: 'Workout Mix',
            description: 'Energetic tracks for your workout',
            image: 'workout-mix.jpg'
        }
    ];
    updateFeaturedDisplay();
}

function updateFeaturedDisplay() {
    const featuredGrid = document.querySelector('.featured-grid');
    featuredGrid.innerHTML = featuredPlaylists.map(playlist => `
        <div class="featured-card" onclick="openFeatured(${playlist.id})">
            <img src="${playlist.image}" alt="${playlist.name}">
            <div class="playlist-info">
                <h3>${playlist.name}</h3>
                <p>${playlist.description}</p>
            </div>
        </div>
    `).join('');
}

// Event listeners
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

document.querySelector('.play-pause-btn').addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong(songs[currentSongIndex]);
    }
});

// Initialize the player
initialize();
