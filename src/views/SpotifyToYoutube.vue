<template>
  <div>
    <v-container>
      <!-- Login button, show if not logged in-->
      <v-btn v-if="!loggedIn" rounded color="green" @click="loginToSpotify"
        >Login</v-btn
      >

      <!-- Show this info if logged in (name, spotify info, and playlists)-->
      <div v-if="loggedIn" id="userInfo">
        <h1>Logged in as {{ user.display_name }}</h1>
        <div class="media">
          <v-row>
            <v-col cols="2">
              <div class="pull-left">
                <img
                  class="media-object"
                  width="150"
                  :src="`${this.user.images[0].url}`"
                />
              </div>
            </v-col>
            <v-col cols="5">
              <div class="media-body">
                <dl class="dl-horizontal">
                  <dt class="boldHeaders">Display name</dt>
                  <dd class="clearfix">{{ user.display_name }}</dd>
                  <dt class="boldHeaders">Id</dt>
                  <dd>{{ user.id }}</dd>
                  <dt class="boldHeaders">Email</dt>
                  <dd>{{ user.email }}</dd>
                </dl>
              </div>
            </v-col>
            <v-col cols="5">
              <dl class="dl-horizontal">
                <dt class="boldHeaders">Spotify URI</dt>
                <dd>
                  <a :href="`${this.user.external_urls.spotify}`">{{
                    user.external_urls.spotify
                  }}</a>
                </dd>
                <dt class="boldHeaders">Link</dt>
                <dd>
                  <a :href="`${this.user.href}`">{{ user.href }}</a>
                </dd>
                <dt class="boldHeaders">Country</dt>
                <dd>{{ user.country }}</dd>
              </dl>
            </v-col>
          </v-row>
        </div>
        <div class="playlists">
          <v-row>
            <v-col
              v-for="playlist in playlists.items"
              v-bind:key="playlist.name"
              class="playlistBoxes"
            >
              <img
                class="media-object"
                width="150"
                :src="`${playlist.images[0].url}`"
              /><v-spacer></v-spacer>
              {{ playlist.name }}
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: null,
    playlists: null,
    loggedIn: false,
  }),
  components: {},
  methods: {
    async getSpotifyInfo() {
      var params = this.getHashParams();
      var access_token = params.access_token;

      if (access_token) {
        var info = await this.getUserInfo(access_token);
        this.user = info;
        var playlists = await this.getUserPlaylists(access_token, info.id);
        this.playlists = playlists;
        this.loggedIn = true;
      } else {
        console.log("Could not login, no access token");
      }
    },
    //this method should go in a separate api file -- need to check my code at work to for reference
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
    loginToSpotify() {
      var stateKey = "spotify_auth_state";

      // I got these by registering an app at https://developer.spotify.com/dashboard/applications
      var client_id = "55fa7dbdd157441f9de6dd00c10e6f89"; // Your client id
      var redirect_uri = "http://localhost:8080/spotify"; // Your redirect uri
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
  },
  mounted() {
    this.getSpotifyInfo();
  },
};
</script>

<style scoped>
.boldHeaders {
  font-weight: bold;
}
.playlistBoxes {
  text-align: center;
}
</style>