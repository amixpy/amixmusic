from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from mutagen.mp3 import MP3
from mutagen.id3 import ID3, APIC, error
import os
from PIL import Image
import io

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///amixmusic.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    artist = db.Column(db.String(200), nullable=False)
    album = db.Column(db.String(200))
    duration = db.Column(db.Float)
    path = db.Column(db.String(500), nullable=False)
    cover_art = db.Column(db.LargeBinary)

class Playlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    songs = db.relationship('Song', secondary='playlist_songs', backref='playlists')

playlist_songs = db.Table('playlist_songs',
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlist.id')),
    db.Column('song_id', db.Integer, db.ForeignKey('song.id'))
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scan_music')
def scan_music():
    music_dir = os.path.join(os.path.expanduser('~'), 'Music')
    songs = []
    
    for root, dirs, files in os.walk(music_dir):
        for file in files:
            if file.lower().endswith('.mp3'):
                try:
                    audio = MP3(os.path.join(root, file))
                    song = {
                        'title': file,
                        'duration': audio.info.length,
                        'path': os.path.join(root, file)
                    }
                    songs.append(song)
                except:
                    continue
    
    return jsonify({'songs': songs})

@app.route('/upload_cover', methods=['POST'])
def upload_cover():
    if 'cover' not in request.files:
        return jsonify({'error': 'No cover art provided'}), 400
    
    cover = request.files['cover']
    song_id = request.form.get('song_id')
    
    if not song_id:
        return jsonify({'error': 'No song ID provided'}), 400
    
    song = Song.query.get(song_id)
    if not song:
        return jsonify({'error': 'Song not found'}), 404
    
    # Process and save cover art
    img = Image.open(cover)
    img.thumbnail((300, 300))
    
    # Save to database
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    song.cover_art = img_byte_arr.getvalue()
    db.session.commit()
    
    return jsonify({'message': 'Cover art uploaded successfully'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
