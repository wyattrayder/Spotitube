import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeView',
    component: HomeView
  },
  {
    path: '/spotify',
    name: 'SpotifyToYoutube',
    component: () => import(/* webpackChunkName: "SpotifyToYoutube" */ '../views/SpotifyToYoutube.vue')
  },
  {
    path: '/youtube',
    name: 'YoutubeToSpotify',
    component: () => import(/* webpackChunkName: "YoutubeToSpotify" */ '../views/YoutubeToSpotify.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


