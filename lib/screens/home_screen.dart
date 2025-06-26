import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import '../widgets/music_player.dart';
import '../widgets/playlist_grid.dart';
import '../widgets/search_bar.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _hasPermission = false;

  @override
  void initState() {
    super.initState();
    _checkPermission();
  }

  Future<void> _checkPermission() async {
    final status = await Permission.storage.status;
    if (status.isGranted) {
      setState(() => _hasPermission = true);
    } else {
      final result = await Permission.storage.request();
      setState(() => _hasPermission = result.isGranted);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AmixMusic'),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              showSearch(
                context: context,
                delegate: SearchBarDelegate(),
              );
            },
          ),
        ],
      ),
      body: _hasPermission
          ? Column(
              children: [
                const Expanded(
                  flex: 1,
                  child: MusicPlayer(),
                ),
                const Expanded(
                  flex: 3,
                  child: PlaylistGrid(),
                ),
              ],
            )
          : const Center(
              child: Text('Please grant storage permission'),
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // TODO: Add new playlist
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
