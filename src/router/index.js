import { createRouter, createWebHistory } from 'vue-router'
import Documentation from '@/documentation/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/documentation/home.vue')
  },
  {
    path: '/getting-started',
    name: 'getting-started',
    component: () => import('@/documentation/getting-started.vue')
  },
  {
    path: '/api',
    name: 'api',
    component: () => import('@/documentation/api.vue')
  },
  {
    path: '/date-prototypes',
    name: 'date-prototypes',
    component: () => import('@/documentation/date-prototypes.vue')
  },
  {
    path: '/examples',
    name: 'examples',
    component: () => import('@/documentation/examples/index.vue'),
    redirect: '/examples/introduction',
    children: [
      {
        path: 'introduction',
        name: 'introduction',
        component: () => import('@/documentation/examples/introduction.vue')
      },
      {
        path: 'view',
        name: 'view-examples',
        component: () => import('@/documentation/examples/view.vue'),
        meta: { title: 'View' }
      },
      {
        path: 'date-and-time',
        name: 'date-and-time-examples',
        component: () => import('@/documentation/examples/date-and-time.vue'),
        meta: { title: 'Date and Time' }
      },
      {
        path: 'calendar-events',
        name: 'calendar-events-examples',
        component: () => import('@/documentation/examples/calendar-events.vue'),
        meta: { title: 'Calendar Events' }
      },
      {
        path: 'dom-events',
        name: 'dom-events-examples',
        component: () => import('@/documentation/examples/dom-events.vue'),
        meta: { title: 'DOM Events' }
      },
      {
        path: 'customization',
        name: 'customization-examples',
        component: () => import('@/documentation/examples/customization.vue'),
        meta: { title: 'Customization' }
      },
    ]
  },
  {
    path: '/migration-guide',
    name: 'migration-guide',
    component: () => import('@/documentation/migration-guide.vue')
  },
  {
    path: '/road-map',
    name: 'road-map',
    component: () => import('@/documentation/road-map.vue')
  },
  {
    path: '/release-notes',
    name: 'release-notes',
    component: () => import('@/documentation/release-notes.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/documentation/isolated-test-view.vue')
  }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else if (to.hash) return { el: to.hash, behavior: 'smooth' }
    else return { top: 0 }
  }
})
