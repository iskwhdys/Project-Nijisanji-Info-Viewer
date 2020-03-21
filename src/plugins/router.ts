import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Schedules from '@/views/Schedules.vue'
import Channels from '@/views/Channels.vue'
import Broadcasters from '@/views/Broadcasters.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/schedules',
    component: Schedules,
  },
  {
    path: '/channels',
    component: Channels,
  },
  {
    path: '/broadcasters',
    component: Broadcasters,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '*',
    redirect: "/",
  },

  /**
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/schedules',
    component: () => import('@/views/Schedules.vue'),
  },
  {
    path: '/channels',
    component: () => import('@/views/Channels.vue'),
  },
  {
    path: '/broadcasters',
    component: () => import('@/views/Broadcasters.vue'),
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '*',
    redirect: "/",
  },
  */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
