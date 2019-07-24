import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "documentation-v2" */ './views/documentation-v2.vue')
    },
    {
        path: '/v1',
        component: () => import(/* webpackChunkName: "documentation-v1" */ './views/documentation-v1.vue')
    }
  ]
})