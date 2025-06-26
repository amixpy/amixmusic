import sys
import os
from PyQt6.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
                            QPushButton, QListWidget, QLabel, QSlider, QFileDialog)
from PyQt6.QtCore import Qt, QTimer
from PyQt6.QtMultimedia import QMediaPlayer, QAudioOutput
from PyQt6.QtMultimediaWidgets import QVideoWidget
from PyQt6.QtGui import QIcon
from mutagen.mp3 import MP3

class MusicPlayer(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("AmixMusic - Desktop Player")
        self.setGeometry(100, 100, 800, 600)
        
        # Create central widget and layout
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)
        
        # Create playlist section
        playlist_layout = QHBoxLayout()
        self.playlist = QListWidget()
        self.playlist.setFixedWidth(300)
        self.scan_button = QPushButton("Scan Music")
        self.scan_button.clicked.connect(self.scan_music)
        
        playlist_layout.addWidget(self.playlist)
        playlist_layout.addWidget(self.scan_button)
        layout.addLayout(playlist_layout)
        
        # Create player controls
        controls_layout = QHBoxLayout()
        self.play_button = QPushButton("Play")
        self.pause_button = QPushButton("Pause")
        self.stop_button = QPushButton("Stop")
        
        self.play_button.clicked.connect(self.play)
        self.pause_button.clicked.connect(self.pause)
        self.stop_button.clicked.connect(self.stop)
        
        controls_layout.addWidget(self.play_button)
        controls_layout.addWidget(self.pause_button)
        controls_layout.addWidget(self.stop_button)
        layout.addLayout(controls_layout)
        
        # Create volume control
        volume_layout = QHBoxLayout()
        self.volume_label = QLabel("Volume:")
        self.volume_slider = QSlider(Qt.Orientation.Horizontal)
        self.volume_slider.setRange(0, 100)
        self.volume_slider.setValue(50)
        self.volume_slider.valueChanged.connect(self.set_volume)
        
        volume_layout.addWidget(self.volume_label)
        volume_layout.addWidget(self.volume_slider)
        layout.addLayout(volume_layout)
        
        # Create progress bar
        self.progress_slider = QSlider(Qt.Orientation.Horizontal)
        self.progress_slider.setRange(0, 100)
        layout.addWidget(self.progress_slider)
        
        # Initialize media player
        self.media_player = QMediaPlayer()
        self.audio_output = QAudioOutput()
        self.media_player.setAudioOutput(self.audio_output)
        
        # Connect signals
        self.media_player.positionChanged.connect(self.update_position)
        self.media_player.durationChanged.connect(self.update_duration)
        self.progress_slider.sliderMoved.connect(self.set_position)
        
        # Timer for updating progress
        self.timer = QTimer()
        self.timer.setInterval(1000)
        self.timer.timeout.connect(self.update_progress)
        
    def scan_music(self):
        directory = QFileDialog.getExistingDirectory(self, "Select Music Directory")
        if directory:
            self.playlist.clear()
            for root, dirs, files in os.walk(directory):
                for file in files:
                    if file.lower().endswith('.mp3'):
                        try:
                            path = os.path.join(root, file)
                            audio = MP3(path)
                            title = os.path.splitext(file)[0]
                            duration = int(audio.info.length)
                            item = f"{title} - {duration//60}:{duration%60:02d}"
                            self.playlist.addItem(item)
                        except:
                            continue
    
    def play(self):
        if self.playlist.currentItem():
            current_item = self.playlist.currentItem()
            index = self.playlist.row(current_item)
            self.media_player.setSource(QUrl.fromLocalFile(self.get_song_path(index)))
            self.media_player.play()
            self.timer.start()
    
    def pause(self):
        self.media_player.pause()
    
    def stop(self):
        self.media_player.stop()
        self.timer.stop()
        self.progress_slider.setValue(0)
    
    def set_volume(self, value):
        self.audio_output.setVolume(value / 100)
    
    def update_position(self, position):
        self.progress_slider.setValue(position / 1000)
    
    def update_duration(self, duration):
        self.progress_slider.setRange(0, duration / 1000)
    
    def set_position(self, position):
        self.media_player.setPosition(position * 1000)
    
    def update_progress(self):
        if self.media_player.position() >= self.media_player.duration():
            self.play_next_song()
    
    def play_next_song(self):
        current_row = self.playlist.currentRow()
        next_row = (current_row + 1) % self.playlist.count()
        self.playlist.setCurrentRow(next_row)
        self.play()
    
    def get_song_path(self, index):
        # This would need to be implemented based on how you store paths
        # For now, we'll just return a placeholder
        return ""

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MusicPlayer()
    window.show()
    sys.exit(app.exec())
