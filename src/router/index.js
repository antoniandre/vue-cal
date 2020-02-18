import Vue from 'vue'
import VueRouter from 'vue-router'
import Documentation from '@/views/documentation'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Documentation
  },
  {
    path: '/test',
    component: () => import(/* webpackChunkName: "isolated-test-view" */ '@/views/isolated-test-view.vue')
  }
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
