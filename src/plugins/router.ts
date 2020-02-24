import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Schedules from '../views/Schedules.vue'
import ChannelList from '../views/ChannelList.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/schedules',
    name: 'schedules',
    component: Schedules
  },
  {
    path: '/channels',
    name: 'channels',
    component: ChannelList
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
