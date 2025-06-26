import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.playerContainer}>
        <Text style={styles.title}>No song playing</Text>
        <View style={styles.progress}>
          <View style={styles.progressBar} />
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button}>
            <Icon name="shuffle" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="skip-previous" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.playButton]}>
            <Icon name="play" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="skip-next" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="repeat" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.playlistContainer}>
        <Text style={styles.sectionTitle}>Playlists</Text>
        <View style={styles.playlistGrid}>
          {/* Playlist items will be added here */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  playerContainer: {
    padding: 16,
    backgroundColor: '#1e1e1e',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  progress: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#fff',
    width: '50%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 50,
  },
  playButton: {
    padding: 16,
  },
  playlistContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  playlistGrid: {
    flex: 1,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#1e1e1e',
            borderTopWidth: 0,
          },
          headerStyle: {
            backgroundColor: '#1e1e1e',
          },
          headerTintColor: '#fff',
        }}>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="magnify" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Library" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="library-music" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
