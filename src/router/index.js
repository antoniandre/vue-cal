import { createRouter, createWebHistory } from 'vue-router'
import Documentation from '@/documentation/index.vue'

const routes = [
  {
    path: '/',
    component: Documentation,
    children: [
      {
        path: '/',
        component: () => import('@/documentation/home.vue')
      },
      {
        path: '/getting-started',
        component: () => import('@/documentation/getting-started.vue')
      },
      {
        path: '/api',
        component: () => import('@/documentation/api.vue')
      },
      {
        path: '/examples',
        component: () => import('@/documentation/examples.vue')
      },
      {
        path: '/migration-guide',
        component: () => import('@/documentation/migration-guide.vue')
      },
      {
        path: '/road-map',
        component: () => import('@/documentation/road-map.vue')
      },
      {
        path: '/release-notes',
        component: () => import('@/documentation/release-notes.vue')
      }
    ]
  },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
