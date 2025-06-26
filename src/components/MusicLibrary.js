import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useMusicLibrary } from '../hooks/useMusicLibrary';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MusicLibrary = () => {
  const { songs, isLoading, error, addToPlaylist, removeFromPlaylist } = useMusicLibrary();
  const [selectedSong, setSelectedSong] = useState(null);

  const handleSongPress = (song) => {
    setSelectedSong(song);
    // Handle song playback
  };

  const renderSongItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.songItem,
        selectedSong?.id === item.id && styles.selectedSong,
      ]}
      onPress={() => handleSongPress(item)}
    >
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => addToPlaylist(item)}
          style={styles.actionButton}
        >
          <Icon name="playlist-plus" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => removeFromPlaylist(item)}
          style={styles.actionButton}
        >
          <Icon name="playlist-remove" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  selectedSong: {
    backgroundColor: '#333',
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  artist: {
    color: '#888',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginHorizontal: 8,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MusicLibrary;
