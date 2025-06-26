export default class Song {
    constructor(id, title, artist, album, duration, path, coverPath) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.duration = duration;
        this.path = path;
        this.coverPath = coverPath || null;
        this.isPlaying = false;
        this.progress = 0;
    }

    static fromJson(json) {
        return new Song(
            json.id,
            json.title,
            json.artist,
            json.album,
            json.duration,
            json.path,
            json.coverPath
        );
    }

    toJson() {
        return {
            id: this.id,
            title: this.title,
            artist: this.artist,
            album: this.album,
            duration: this.duration,
            path: this.path,
            coverPath: this.coverPath
        };
    }
}
