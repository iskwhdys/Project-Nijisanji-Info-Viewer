import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
    component: () => import('@/views/ChannelList.vue'),
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue'),
  },
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
