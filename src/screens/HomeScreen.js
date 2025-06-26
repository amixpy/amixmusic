import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import Song from '../models/Song';
import MusicService from '../services/MusicService';

export default function HomeScreen() {
    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const musicService = new MusicService();

    useEffect(() => {
        loadSongsAndPlaylists();
    }, []);

    const loadSongsAndPlaylists = async () => {
        try {
            await musicService.loadPlaylists();
            await musicService.scanSongs();
            setSongs(musicService.songs);
            setPlaylists(musicService.playlists);
        } catch (error) {
            console.error('Error loading songs and playlists:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderSongItem = ({ item }) => (
        <TouchableOpacity style={styles.songItem}>
            <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
            <Icon 
                name={musicService.likedSongs.has(item.id) ? 'heart' : 'heart-outline'} 
                size={24} 
                color={musicService.likedSongs.has(item.id) ? '#ff4081' : '#fff'}
                onPress={() => musicService.toggleLikeSong(item.id)}
            />
        </TouchableOpacity>
    );

    const renderPlaylistItem = ({ item }) => (
        <TouchableOpacity style={styles.playlistItem}>
            <Text style={styles.playlistName}>{item.name}</Text>
            <Text style={styles.playlistSongCount}>{item.songs.length} songs</Text>
        </TouchableOpacity>
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recently Played</Text>
                <FlatList
                    data={songs.slice(0, 5)}
                    renderItem={renderSongItem}
                    keyExtractor={item => item.id}
                    horizontal
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Playlists</Text>
                <FlatList
                    data={playlists}
                    renderItem={renderPlaylistItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        marginRight: 12,
    },
    songInfo: {
        flex: 1,
    },
    songTitle: {
        color: '#fff',
        fontSize: 16,
    },
    songArtist: {
        color: '#888',
        fontSize: 14,
    },
    playlistItem: {
        padding: 16,
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        marginBottom: 12,
    },
    playlistName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    playlistSongCount: {
        color: '#888',
        fontSize: 14,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
