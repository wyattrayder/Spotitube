const spotifyApi = {
    async getUserInfo(access_token) {
        var url = "https://api.spotify.com/v1/me";
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token,
            },
        });
        return response.json();
    },
    async getUserPlaylists(access_token, user_id) {
        var url = `https://api.spotify.com/v1/users/${user_id}/playlists?limit=10`;
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token,
            },
        });
        return response.json();
    },
    async getPlaylistTracks(playlist_id, access_token) {
        var url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
        let response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token,
            },
        })
        return response.json();
    }
} 
export default spotifyApi;

