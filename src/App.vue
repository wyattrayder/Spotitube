<template>
  <v-app>
    <v-app-bar
      app
      v-bind:color="barColor"
      dark    
    >
      <div class="d-flex align-center">
        <h3>Spotitube</h3>
      </div>

      <v-spacer></v-spacer>

      <v-btn
      target="_blank"
      text
      v-on:click="changeColor">
        <span class="mr-2">Change Color!</span>
        <v-icon>mdi-pallete</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main>
      <!-- This router determines the page you are on (like SpotifyToYoutube page) -->
      <!-- The default page is HomeView.vue, which allows the user to select Youtube or Spotify-->
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    barColor: "red",
    backColor: "white",
  }),
  methods: {
    changeColor(){
      if(this.barColor == "red")
      {
        this.barColor = "green";
        this.backColor = "black";
      }
      else
      {
        this.barColor = "red";
        this.backColor = "white";
      }
    },
  }
};
</script>
