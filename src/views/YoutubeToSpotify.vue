<template>
  <div>
    <v-container>
      <v-row align="center">

        <v-col cols="6" class="YorSbutton" @click="goBack">
          <v-btn>Go Back</v-btn>
        </v-col>

        <v-col cols="6" class="YorSbutton" @click="authenticate">
          <v-btn v-if="!loggdIn" rounded color="orange">Login</v-btn>
        </v-col>


      </v-row>
    </v-container>
  </div>
</template>


<script src="https://apis.google.com/js/api.js"></script>
<script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async defer></script>
<script>
export default {
methods:{

  authenticate() {

    
    gapi.auth2.init({
      client_id: '352942451792-fvfoas989dlp93hd2jm3mim9689egfgs.apps.googleusercontent.com.apps.googleusercontent.com'
    }
    

    
    );




    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  },

      goBack() {
      this.$router.push('/')
    

    }



}



};
// AIzaSyCljyGykLH8i7zJsljdA4ycCHso4FCDdmQ



  /**
   * Sample JavaScript code for youtube.channels.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/code-samples#javascript
   */


  // function loadClient() {
  //   gapi.client.setApiKey("AIzaSyCljyGykLH8i7zJsljdA4ycCHso4FCDdmQ");
  //   return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
  //       .then(function() { console.log("GAPI client loaded for API"); },
  //             function(err) { console.error("Error loading GAPI client for API", err); });
  // }
  // // Make sure the client is loaded and sign-in is complete before calling this method.
  // function execute() {
  //   return gapi.client.youtube.channels.list({})
  //       .then(function(response) {
  //               // Handle the results here (response.result has the parsed body).
  //               console.log("Response", response);
  //             },
  //             function(err) { console.error("Execute error", err); });
  // }
  // gapi.load("client:auth2", function() {
  //   gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  // });

// <button onclick="authenticate().then(loadClient)">authorize and load</button>
// <button onclick="execute()">execute</button>

    
</script>

<style>
</style>