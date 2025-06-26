class Song {
  final String id;
  final String title;
  final String artist;
  final String album;
  final String path;
  final String? coverPath;

  Song({
    required this.id,
    required this.title,
    required this.artist,
    required this.album,
    required this.path,
    this.coverPath,
  });

  factory Song.fromJson(Map<String, dynamic> json) {
    return Song(
      id: json['id'],
      title: json['title'],
      artist: json['artist'],
      album: json['album'],
      path: json['path'],
      coverPath: json['coverPath'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'artist': artist,
      'album': album,
      'path': path,
      'coverPath': coverPath,
    };
  }
}
