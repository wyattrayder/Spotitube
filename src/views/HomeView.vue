<template>
  <div>
    <v-container fluid style="height: 50vh">
      <v-row style="width: 100%">
        <v-col class="YorSCols">
          <v-card class="YorSCards" @click="goToSpotify" :ripple="{ class: 'green--text' }" hover>
          <div style="top: 30%; position: relative; height: 200px;">
            <v-img
              class="YorSImage"
              src="../assets/spotify_icon.png"
              max-height="200"
              max-width="200"
              contain
            ></v-img>
          </div>
            <div style="top: 50%; position: relative; width: 100%">
              <span>Convert Spotify Playlist</span>
            </div>
          </v-card>
        </v-col>
        <v-col class="YorSCols">
          <v-card class="YorSCards" @click="goToYoutube" :ripple="{ class: 'red--text' }" hover>
          <div style="top: 30%; position: relative; height: 200px;">
            <v-img
              class="YorSImage"
              src="../assets/youtube_icon.png"
              max-height="200"
              max-width="200"
              contain
            ></v-img>
          </div>
            <div style="top: 50%; position: relative; width: 100%">
              <span>Convert YouTube Playlist</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  components: {},
  methods: {
    goToSpotify() {
      setTimeout( () => this.$router.push({ path: '/spotify'}), 100);
    },
    goToYoutube() {
      setTimeout( () => this.$router.push({ path: '/youtube'}), 100);
    }
  },
};
</script>

<style scoped>
.YorSCols {
  text-align: center;
  height: 500px;
}
.YorSCards {
  height: 100%;
}
.YorSImage {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
