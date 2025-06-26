import React, { useState, useEffect } from 'react';
import { View, Text, Slider, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import MusicService from '../services/MusicService';

export default function PlayerScreen({ route }) {
    const [currentSong, setCurrentSong] = useState(route.params?.song);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const musicService = new MusicService();

    useEffect(() => {
        if (currentSong) {
            musicService.playSong(currentSong);
            startProgressUpdate();
        }

        return () => {
            musicService.stopSong();
            clearInterval(progressInterval);
        };
    }, [currentSong]);

    const startProgressUpdate = () => {
        const interval = setInterval(() => {
            if (musicService.audioPlayer) {
                musicService.audioPlayer.getCurrentTime((seconds) => {
                    setProgress(seconds);
                });
            }
        }, 1000);
        setProgressInterval(interval);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        if (musicService.audioPlayer) {
            if (musicService.audioPlayer.isPlaying()) {
                musicService.audioPlayer.pause();
            } else {
                musicService.audioPlayer.play();
            }
        }
    };

    if (!currentSong) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: currentSong.coverPath }}
                style={styles.albumArt}
            />
            
            <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{currentSong.title}</Text>
                <Text style={styles.artist}>{currentSong.artist}</Text>
            </View>

            <View style={styles.progressContainer}>
                <Text style={styles.time}>{formatTime(progress)}</Text>
                <Slider
                    style={styles.progressSlider}
                    minimumValue={0}
                    maximumValue={currentSong.duration}
                    value={progress}
                    onSlidingComplete={(value) => {
                        if (musicService.audioPlayer) {
                            musicService.audioPlayer.setCurrentTime(value);
                        }
                    }}
                />
                <Text style={styles.time}>{formatTime(currentSong.duration)}</Text>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlButton}>
                    <Icon name="shuffle" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                    <Icon name="skip-previous" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.controlButton, styles.playButton]}
                    onPress={handlePlayPause}
                >
                    <Icon 
                        name={musicService.audioPlayer?.isPlaying() ? 'pause' : 'play'} 
                        size={32} 
                        color="#fff"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                    <Icon name="skip-next" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                    <Icon name="repeat" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        padding: 20,
    },
    albumArt: {
        width: 300,
        height: 300,
        borderRadius: 8,
    },
    songInfo: {
        marginTop: 20,
        alignItems: 'center',
    },
    songTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    artist: {
        color: '#888',
        fontSize: 16,
    },
    progressContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
    progressSlider: {
        width: '90%',
        height: 40,
    },
    time: {
        color: '#fff',
        fontSize: 14,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 40,
    },
    controlButton: {
        padding: 12,
        backgroundColor: '#333',
        borderRadius: 50,
    },
    playButton: {
        padding: 16,
    },
});
