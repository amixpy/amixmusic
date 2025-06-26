import { Sound } from 'react-native-sound';
import { PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';
import { NativeModules } from 'react-native';
import Song from '../models/Song';

export default class MusicService {
    constructor() {
        this.currentSong = null;
        this.songs = [];
        this.playlists = [];
        this.likedSongs = new Set();
        this.audioPlayer = null;
    }

    async requestStoragePermission() {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'AmixMusic needs access to your storage to play music',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    }

    async scanSongs() {
        if (!await this.requestStoragePermission()) {
            throw new Error('Storage permission denied');
        }

        try {
            const songs = await NativeModules.MediaScanner.scanSongs();
            this.songs = songs.map(song => new Song(
                song.id,
                song.title,
                song.artist,
                song.album,
                song.duration,
                song.path,
                song.coverPath
            ));
            return this.songs;
        } catch (error) {
            console.error('Error scanning songs:', error);
            throw error;
        }
    }

    async playSong(song) {
        if (this.audioPlayer) {
            this.audioPlayer.release();
        }

        this.audioPlayer = new Sound(song.path, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error('Failed to load the sound', error);
                return;
            }

            this.audioPlayer.play((success) => {
                if (!success) {
                    console.error('Failed to play the sound');
                }
            });
        });

        this.currentSong = song;
        song.isPlaying = true;
    }

    pauseSong() {
        if (this.audioPlayer) {
            this.audioPlayer.pause();
            if (this.currentSong) {
                this.currentSong.isPlaying = false;
            }
        }
    }

    stopSong() {
        if (this.audioPlayer) {
            this.audioPlayer.stop();
            this.audioPlayer.release();
            this.audioPlayer = null;
            if (this.currentSong) {
                this.currentSong.isPlaying = false;
                this.currentSong = null;
            }
        }
    }

    async createPlaylist(name) {
        const playlist = {
            id: Date.now().toString(),
            name: name,
            songs: []
        };
        this.playlists.push(playlist);
        await this.savePlaylists();
        return playlist;
    }

    async addSongToPlaylist(playlistId, song) {
        const playlist = this.playlists.find(p => p.id === playlistId);
        if (playlist) {
            playlist.songs.push(song);
            await this.savePlaylists();
        }
    }

    async toggleLikeSong(songId) {
        if (this.likedSongs.has(songId)) {
            this.likedSongs.delete(songId);
        } else {
            this.likedSongs.add(songId);
        }
        await this.saveLikedSongs();
    }

    async savePlaylists() {
        try {
            await NativeModules.StorageManager.savePlaylists(this.playlists);
        } catch (error) {
            console.error('Error saving playlists:', error);
        }
    }

    async saveLikedSongs() {
        try {
            await NativeModules.StorageManager.saveLikedSongs(Array.from(this.likedSongs));
        } catch (error) {
            console.error('Error saving liked songs:', error);
        }
    }

    async loadPlaylists() {
        try {
            this.playlists = await NativeModules.StorageManager.loadPlaylists();
        } catch (error) {
            console.error('Error loading playlists:', error);
        }
    }

    async loadLikedSongs() {
        try {
            const likedSongs = await NativeModules.StorageManager.loadLikedSongs();
            this.likedSongs = new Set(likedSongs);
        } catch (error) {
            console.error('Error loading liked songs:', error);
        }
    }
}
