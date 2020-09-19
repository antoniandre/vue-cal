import { createRouter, createWebHistory } from 'vue-router'
import Documentation from '@/documentation'

const routes = [
  {
    path: '/',
    component: Documentation
  },
  {
    path: '/test',
    component: () => import(/* webpackChunkName: "isolated-test-view" */ '@/documentation/isolated-test-view.vue')
  }
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
