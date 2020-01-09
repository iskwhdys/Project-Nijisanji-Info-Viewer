import Vue from 'vue'
import VueRouter from 'vue-router'
import NewArrival from '../views/NewArrival.vue'
import Ranking from '../views/Ranking.vue'
import Manager from '../views/Manager.vue'

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
  {
    path: '/manager',
    name: 'manager',
    component: Manager
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
