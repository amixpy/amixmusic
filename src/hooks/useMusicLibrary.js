import { useState, useEffect } from 'react';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';

const MUSIC_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a'];

export const useMusicLibrary = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'AmixMusic needs access to your storage to scan for music files',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const scanMusicFiles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        throw new Error('Storage permission denied');
      }

      const directories = [
        RNFS.ExternalStorageDirectoryPath,
        RNFS.ExternalStorageDirectoryPath + '/Music',
        RNFS.ExternalStorageDirectoryPath + '/Download',
      ];

      const allSongs = [];
      for (const dir of directories) {
        const files = await RNFS.readDir(dir);
        for (const file of files) {
          if (MUSIC_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext))) {
            const song = {
              id: file.name + Math.random(),
              title: file.name.replace(/\.[^/.]+$/, ""),
              artist: 'Unknown',
              path: file.path,
              duration: 0,
            };
            allSongs.push(song);
          }
        }
      }

      setSongs(allSongs);
    } catch (err) {
      setError(err.message);
      console.error('Error scanning music:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addToPlaylist = async (song) => {
    try {
      const playlistsPath = RNFS.ExternalStorageDirectoryPath + '/AmixMusic/playlists.json';
      const existingPlaylists = await RNFS.exists(playlistsPath) 
        ? JSON.parse(await RNFS.readFile(playlistsPath))
        : { playlists: [], likedSongs: [] };

      existingPlaylists.likedSongs.push(song);
      await RNFS.writeFile(playlistsPath, JSON.stringify(existingPlaylists));
    } catch (err) {
      console.error('Error adding to playlist:', err);
    }
  };

  const removeFromPlaylist = async (song) => {
    try {
      const playlistsPath = RNFS.ExternalStorageDirectoryPath + '/AmixMusic/playlists.json';
      const existingPlaylists = await RNFS.exists(playlistsPath) 
        ? JSON.parse(await RNFS.readFile(playlistsPath))
        : { playlists: [], likedSongs: [] };

      existingPlaylists.likedSongs = existingPlaylists.likedSongs.filter(
        s => s.id !== song.id
      );
      await RNFS.writeFile(playlistsPath, JSON.stringify(existingPlaylists));
    } catch (err) {
      console.error('Error removing from playlist:', err);
    }
  };

  useEffect(() => {
    scanMusicFiles();
  }, []);

  return {
    songs,
    isLoading,
    error,
    scanMusicFiles,
    addToPlaylist,
    removeFromPlaylist,
  };
};
