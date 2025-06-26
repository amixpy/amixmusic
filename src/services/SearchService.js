export default class SearchService {
    constructor() {
        this.musicService = null;
    }

    setMusicService(service) {
        this.musicService = service;
    }

    searchSongs(query) {
        if (!this.musicService) return [];

        const normalizedQuery = query.toLowerCase();
        return this.musicService.songs.filter(song => {
            return (
                song.title.toLowerCase().includes(normalizedQuery) ||
                song.artist.toLowerCase().includes(normalizedQuery) ||
                song.album.toLowerCase().includes(normalizedQuery)
            );
        });
    }

    searchPlaylists(query) {
        if (!this.musicService) return [];

        const normalizedQuery = query.toLowerCase();
        return this.musicService.playlists.filter(playlist => {
            return playlist.name.toLowerCase().includes(normalizedQuery);
        });
    }

    async searchLyrics(query) {
        // TODO: Implement lyrics search API integration
        return [];
    }
}
