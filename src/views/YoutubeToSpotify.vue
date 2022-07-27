<template>
  <div>
    <v-container>
      <v-row align="center">

        <v-col cols="4" class="YorSbutton" >
          <v-btn @click="goBack" rounded color="grey">Go Back</v-btn>
        </v-col>

        <v-col cols="2" class="YorSbutton">
          <v-btn v-if="!loggedIn" @click="loginToSpotify" rounded color="green"> Login </v-btn>
        </v-col>

        <v-col cols="2" class="YorSbutton">
          <v-btn @click="loginToYoutube" v-if="loggedIn" rounded color="red">Youtube Link</v-btn>
        </v-col>

        <v-col cols="4" class="YorSbutton"> 
          <v-btn v-if="!enteredPlaylist" rounded disabled> Go </v-btn>
          <v-btn v-else rounded color="green" @click="execute" :loading="loading"> Go </v-btn>
        </v-col>





      </v-row>
    </v-container>
  </div>
</template>

<!--------------------------------------------------------------------------->
<!-- <script src="https://apis.google.com/js/api.js"></script> -->

<!-- <script>
window.onLoadCallback = function(){
  gapi.auth2.init({
      client_id: 'filler_text_for_client_id.apps.googleusercontent.com'
    });
}
</script> -->
<script src="https://apis.google.com/js/platform.js"></script>
<script>
export default {
  data: () => ({
    user: null,
    playlists: null,
    loggedIn: false,
    enteredPlaylist: false,
    loading: false,
  }),

//  mounted() {
//           let gapi = window.gapi
//           gapi.signin2.render('signin', {
//                'scope': 'profile email',
//                'width': 240,
//                'height': 50,
//                'longtitle': true,
//                'theme': 'dark',
//                'onsuccess': this.onSuccess,
//               })
//             },

methods:{

  // authenticate() {

    
  //   gapi.auth2.init({
  //     client_id: '352942451792-fvfoas989dlp93hd2jm3mim9689egfgs.apps.googleusercontent.com'
  //   } // This is the part where it shits itself
  //   );




  //   return gapi.auth2.getAuthInstance()
  //       .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
  //       .then(function() { console.log("Sign-in successful"); },
  //             function(err) { console.error("Error signing in", err); });
  // },

      goBack() {
      this.$router.push('/')
    },

// EVERYTHING BELOW THIS IS FROM DEVELOPERS.GOOGLE.COM!
// https://console.cloud.google.com/apis/dashboard

      loadClient() {
    gapi.client.setApiKey("AIzaSyCljyGykLH8i7zJsljdA4ycCHso4FCDdmQ");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  },
  // Make sure the client is loaded before calling this method.
    execute(playLink) {
    this.loading = true; // make wheel spin
    return gapi.client.youtube.playlistItems.list({
      "part": [
        "snippet,contentDetails"
      ],
      "maxResults": 25,
      "playlistId": playLink
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
              this.loading = false; 
  },

getLink(){

 let playLink =  prompt('Enter Youtube playlist link: ', 'www.youtube.com/')

  console.log(playLink)
  this.enteredPlaylist = true; // It took me so long to figure out I had to put the this. in there :( what does it even do
  // Also we need a way to make sure it is an acceptable link format, but that's a job for later
  return playLink
  console.log(enteredPlaylist)


}, 

async loginToYoutube() {

      //this initializes the "Login to Google" page and saves the access token in localstorage
      //we may want to find a way to encode the access token so people cant just see it in the console
      const client = google.accounts.oauth2.initTokenClient({
        client_id:
          "556153415784-86m5gsd0s0dvj4gbkop03sqf3d0lpb7i.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/youtube.readonly \ https://www.googleapis.com/auth/youtube",
        ux_mode: "popup",
        callback(tokenResponse) {
          if (tokenResponse && !tokenResponse.error) {
            localStorage.setItem( // this saves the access token in local storage
              "token",
              JSON.parse(JSON.stringify(tokenResponse.access_token))
            );
            onSuccess(tokenResponse.access_token);
          }
          onError(tokenResponse.error || "google authentication failed");
        },
      });

      //request the access token
      client.requestAccessToken();
      console.log(client);   

      if(client == 1){ // I don't know how to get this working

        loggedIn = true;
      }

      //var token = localStorage.getItem("token");

      // this gets all of the users current playlists on their youtube account
      // we really don't need this on the spotify page, so this will be used in the youtube page

      //var youtubePlaylistResponse = youtubeApi.getYoutubePlaylists(token);
      //console.log(youtubePlaylistResponse);  
    }, 
    generateRandomString(length) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    getHashParams() {
      var hashParams = {};
      var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    },

      loginToSpotify() {
        var stateKey = "spotify_auth_state";

        // I got these by registering an app at https://developer.spotify.com/dashboard/applications
        var client_id = "55fa7dbdd157441f9de6dd00c10e6f89"; // Your client id
        var redirect_uri = "http://localhost:8080/youtube"; // Your redirect uri
        /* 
          A redirect uri is the location where the 
          authorization server sends the user once the app 
          has been successfully authorized and granted
          an authorization code or access token
        */

        var generatedString = this.generateRandomString(16);

        localStorage.setItem(stateKey, generatedString);
        var scope = "user-read-private user-read-email";

        //base url is being added onto with its necessary params
        var url = "https://accounts.spotify.com/authorize";
        url += "?response_type=token";
        url += "&client_id=" + encodeURIComponent(client_id);
        url += "&scope=" + encodeURIComponent(scope);
        url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
        url += "&state=" + encodeURIComponent(generatedString);

        window.location = url;

        this.getSpotifyInfo();
    },
    

  



},     // end of methods

mounted(){
  this.getSpotifyInfo();


},

}; // end of export default
// AIzaSyCljyGykLH8i7zJsljdA4ycCHso4FCDdmQ - API key
// 352942451792-fvfoas989dlp93hd2jm3mim9689egfgs.apps.googleusercontent.com -> my OAuth
// I deleted my OAuth for now
// My channel ID is UCYauaCT2lnnv4D8WMNi5zig if you want to test using that

</script>


<style scoped>
</style>