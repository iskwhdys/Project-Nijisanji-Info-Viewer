import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
