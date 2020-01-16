import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Broadcasters from '../views/Broadcasters.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/broadcasters',
    name: 'broadcasters',
    component: Broadcasters
  },
  
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
