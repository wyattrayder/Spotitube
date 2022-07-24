
let apiKey = "AIzaSyAH_Wf0fE_ka5Eqk1JbG5YGiV0xMnTV6l8";
//let clientId = "556153415784-86m5gsd0s0dvj4gbkop03sqf3d0lpb7i.apps.googleusercontent.com"

const youtubeApi = {
    async youtubeSearch(keywords) {
        var url = "https://youtube.googleapis.com/youtube/v3/search?";

        await fetch(url + new URLSearchParams({
            key: apiKey,
            part: 'snippet',
            maxResults: '2',
            q: keywords,
        }), {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => console.log(data));
    },
    async getYoutubePlaylists(access_token) {
        var url = "https://www.googleapis.com/youtube/v3/playlists?"

        await fetch(url + new URLSearchParams({
            key: apiKey,
            part: 'snippet,contentDetails',
            mine: 'true',
            maxResults: '25',
        }), {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token,
            }
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }


} 
export default youtubeApi;