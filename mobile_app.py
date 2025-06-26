from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.slider import Slider
from kivy.core.audio import SoundLoader
from kivy.clock import Clock
from mutagen.mp3 import MP3
import os

class MusicPlayer(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.orientation = 'vertical'
        self.padding = 10
        self.spacing = 10
        
        # Create UI elements
        self.playlist = []
        self.current_song = None
        self.sound = None
        
        # Title
        self.title_label = Label(text='AmixMusic - Mobile Player', size_hint_y=None, height=40)
        self.add_widget(self.title_label)
        
        # Playlist
        self.playlist_label = Label(text='Playlist', size_hint_y=None, height=30)
        self.add_widget(self.playlist_label)
        
        # Scan button
        self.scan_button = Button(text='Scan Music', size_hint_y=None, height=40)
        self.scan_button.bind(on_press=self.scan_music)
        self.add_widget(self.scan_button)
        
        # Controls
        self.controls_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=50)
        self.play_button = Button(text='Play', size_hint_x=0.3)
        self.pause_button = Button(text='Pause', size_hint_x=0.3)
        self.stop_button = Button(text='Stop', size_hint_x=0.3)
        
        self.play_button.bind(on_press=self.play)
        self.pause_button.bind(on_press=self.pause)
        self.stop_button.bind(on_press=self.stop)
        
        self.controls_layout.add_widget(self.play_button)
        self.controls_layout.add_widget(self.pause_button)
        self.controls_layout.add_widget(self.stop_button)
        self.add_widget(self.controls_layout)
        
        # Volume control
        self.volume_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=40)
        self.volume_label = Label(text='Volume:', size_hint_x=0.2)
        self.volume_slider = Slider(min=0, max=1, value=0.5)
        
        self.volume_layout.add_widget(self.volume_label)
        self.volume_layout.add_widget(self.volume_slider)
        self.add_widget(self.volume_layout)
        
        # Progress bar
        self.progress_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=40)
        self.progress_label = Label(text='0:00 / 0:00', size_hint_x=0.2)
        self.progress_slider = Slider(min=0, max=100)
        
        self.progress_layout.add_widget(self.progress_label)
        self.progress_layout.add_widget(self.progress_slider)
        self.add_widget(self.progress_layout)
        
        # Timer for updating progress
        self.timer = Clock.schedule_interval(self.update_progress, 1)
        
    def scan_music(self, instance):
        # This would need to be implemented for mobile
        pass
    
    def play(self, instance):
        if self.current_song:
            self.sound = SoundLoader.load(self.current_song)
            if self.sound:
                self.sound.volume = self.volume_slider.value
                self.sound.play()
                self.timer = Clock.schedule_interval(self.update_progress, 1)
    
    def pause(self, instance):
        if self.sound:
            self.sound.stop()
            Clock.unschedule(self.timer)
    
    def stop(self, instance):
        if self.sound:
            self.sound.stop()
            self.progress_slider.value = 0
            self.progress_label.text = '0:00 / 0:00'
            Clock.unschedule(self.timer)
    
    def set_volume(self, instance, value):
        if self.sound:
            self.sound.volume = value
    
    def update_progress(self, dt):
        if self.sound and self.sound.state == 'play':
            current = self.sound.get_pos()
            duration = self.sound.length
            
            self.progress_slider.value = (current / duration) * 100
            
            current_minutes = int(current // 60)
            current_seconds = int(current % 60)
            duration_minutes = int(duration // 60)
            duration_seconds = int(duration % 60)
            
            self.progress_label.text = f'{current_minutes}:{current_seconds:02d} / {duration_minutes}:{duration_seconds:02d}'

class AmixMusicApp(App):
    def build(self):
        return MusicPlayer()

if __name__ == '__main__':
    AmixMusicApp().run()
