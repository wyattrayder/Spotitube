<template>
  <div>
    <v-container>
      <v-row align="center">

        <v-col cols="4" class="YorSbutton" >
          <v-btn @click="goBack" rounded color="grey">Go Back</v-btn>
        </v-col>

        <v-col cols="4" class="YorSbutton">
          <v-btn @click="getLink" v-if="!loggedIn" rounded color="red">Youtube Link</v-btn>
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


}, // end of methods



}}; // end of export default
// AIzaSyCljyGykLH8i7zJsljdA4ycCHso4FCDdmQ - API key
// 352942451792-fvfoas989dlp93hd2jm3mim9689egfgs.apps.googleusercontent.com -> my OAuth
// I deleted my OAuth for now
// My channel ID is UCYauaCT2lnnv4D8WMNi5zig if you want to test using that
// console.log('test');




    
</script>

<!-- <script>
// let gapi = window.gapi;
// gapi.load('auth2', initSigninV2);

// function initSigninV2() {
//     gapi.auth2.init({
//         client_id: '352942451792-fvfoas989dlp93hd2jm3mim9689egfgs.apps.googleusercontent.com'
//     }).then(function (authInstance) {
//         // now auth2 is fully initialized
//     });
// }


</script> -->

<!-- <script src="https://apis.google.com/js/api.js"></script> -->


<style>
</style>