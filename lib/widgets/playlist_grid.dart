import 'package:flutter/material.dart';
import '../models/playlist.dart';

class PlaylistGrid extends StatelessWidget {
  const PlaylistGrid({super.key});

  @override
  Widget build(BuildContext context) {
    // TODO: Replace with actual playlist data
    final samplePlaylists = [
      Playlist(
        id: '1',
        name: 'My Favorites',
        songCount: 25,
        coverPath: 'assets/images/default_playlist.png',
      ),
      Playlist(
        id: '2',
        name: 'Workout Mix',
        songCount: 45,
        coverPath: 'assets/images/default_playlist.png',
      ),
    ];

    return GridView.builder(
      padding: const EdgeInsets.all(8),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 1,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
      ),
      itemCount: samplePlaylists.length,
      itemBuilder: (context, index) {
        final playlist = samplePlaylists[index];
        return PlaylistCard(playlist: playlist);
      },
    );
  }
}

class PlaylistCard extends StatelessWidget {
  final Playlist playlist;

  const PlaylistCard({super.key, required this.playlist});

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Expanded(
            child: ClipRRect(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
              child: Image.asset(
                playlist.coverPath,
                fit: BoxFit.cover,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  playlist.name,
                  style: Theme.of(context).textTheme.titleMedium,
                  overflow: TextOverflow.ellipsis,
                  maxLines: 1,
                ),
                Text(
                  '${playlist.songCount} songs',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
