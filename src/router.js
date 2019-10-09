import Vue from 'vue'
import Router from 'vue-router'
import DocumentationV2 from '@/views/documentation-v2'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: DocumentationV2
    },
    {
      path: '/v1',
      component: () => import(/* webpackChunkName: "documentation-v1" */ './views/documentation-v1.vue')
    }
  ]
})
