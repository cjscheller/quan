import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Transactions from '../views/Transactions.vue'
import Categories from '../views/Categories.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/transactions',
    name: 'transactions',
    component: Transactions,
  },
  {
    path: '/categories',
    name: 'categories',
    component: Categories,
  },
  {
    path: "*",
    redirect: "/transactions"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
