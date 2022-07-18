<template>
  <div>
    <v-container>
      <v-row align="center">
        <v-col cols="6" class="YorSbutton" @click="goToSpotify">
          <v-btn>Spotify -> Youtube</v-btn>
        </v-col>
        <v-col cols="6" class="YorSbutton" @click="goToYoutube">
          <v-btn>Youtube -> Spotify</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
  }),
  components: {},
  methods: {
    //method called if user wants to convert Spotify -> Youtube
    goToSpotify() {
      this.$router.push('/spotify')
    },
    //method called if user wants to convert Youtube -> Spotify
    goToYoutube() {
      this.$router.push('/youtube')
    }
  }
};
</script>

<style scoped>
.YorSbutton{
  text-align: center;
}
</style>
