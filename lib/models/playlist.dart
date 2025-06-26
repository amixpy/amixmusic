class Playlist {
  final String id;
  final String name;
  final int songCount;
  final String coverPath;

  Playlist({
    required this.id,
    required this.name,
    required this.songCount,
    required this.coverPath,
  });

  factory Playlist.fromJson(Map<String, dynamic> json) {
    return Playlist(
      id: json['id'],
      name: json['name'],
      songCount: json['songCount'],
      coverPath: json['coverPath'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'songCount': songCount,
      'coverPath': coverPath,
    };
  }
}
