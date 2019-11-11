import Vue from 'vue'
import VueRouter from 'vue-router'
import DocumentationV2 from '@/views/documentation-v2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DocumentationV2
  },
  {
    path: '/v1',
    component: () => import(/* webpackChunkName: "documentation-v1" */ '@/views/documentation-v1.vue')
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
