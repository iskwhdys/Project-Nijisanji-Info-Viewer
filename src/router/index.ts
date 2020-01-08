import Vue from 'vue'
import VueRouter from 'vue-router'
import NewArrival from '../views/NewArrival.vue'
import Ranking from '../views/Ranking.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'newArrival',
    component: NewArrival
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: Ranking
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
