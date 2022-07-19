<template>
  <div id="app">
    <div id="nav">
      <div id="google-signin-btn"></div>
      <a href="#" class="sign-out" @click="signOut" v-if="profile">Sign out</a>
    </div>
    <div v-if="profile" class="">
      <h2>Signed In User Profile</h2>
      <pre>{{ profile }}</pre>
    </div>
    <div v-if="!profile">
      <h2>Signed out.</h2>
    </div>
    <router-view />
  </div>
</template>



<script type="text/javascript">
    //   function triggerGoogleLoaded() {
    //     window.dispatchEvent(new Event("google-loaded"));
    //   }
    </script>
    <script
      src="https://apis.google.com/js/platform.js?onload=triggerGoogleLoaded"
      async
      defer
    ></script>
    <!-- <meta>
      name="google-signin-client_id"
      content="352942451792-fvfoas989dlp93hd2jm3mim9689egfgs.apps.googleusercontent.com"
    </meta> -->


<script>
export default {
  components: {},
  data() {
    return {
      profile: false
    };
  },
  methods: {
    onSignIn(user) {
      const profile = user.getBasicProfile();
      this.profile = profile;
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        location.reload(true);
      });
    },
    renderGoogleLoginButton() {
      gapi.signin2.render("google-signin-btn", {
        onsuccess: this.onSignIn
      });
    }
  },
  mounted() {
    window.addEventListener("google-loaded", this.renderGoogleLoginButton);
  }
};
</script>
