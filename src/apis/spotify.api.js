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
    //this method should go in a separate api file -- need to check my code at work to for reference
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
} 
export default spotifyApi;

