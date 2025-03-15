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
        name: 'examples-intro',
        component: () => import('@/documentation/examples/introduction.vue')
      },
      {
        path: 'view',
        name: 'examples-view',
        component: () => import('@/documentation/examples/view.vue'),
        meta: { title: 'View' }
      },
      {
        path: 'date-and-time',
        name: 'examples-date-and-time',
        component: () => import('@/documentation/examples/date-and-time.vue'),
        meta: { title: 'Date and Time' }
      },
      {
        path: 'schedules',
        name: 'examples-schedules',
        component: () => import('@/documentation/examples/schedules.vue'),
        meta: { title: 'schedules' }
      },
      {
        path: 'calendar-events--display',
        name: 'examples-events-display',
        component: () => import('@/documentation/examples/calendar-events-display.vue'),
        meta: { title: 'Calendar Events Display' }
      },
      {
        path: 'calendar-events--interactions',
        name: 'examples-events-interactions',
        component: () => import('@/documentation/examples/calendar-events-interactions.vue'),
        meta: { title: 'Calendar Events Interactions' }
      },
      {
        path: 'dom-events',
        name: 'examples-dom-events',
        component: () => import('@/documentation/examples/dom-events.vue'),
        meta: { title: 'DOM Events' }
      },
      {
        path: 'customization',
        name: 'examples-customization',
        component: () => import('@/documentation/examples/customization.vue'),
        meta: { title: 'Customization' }
      },
      {
        path: 'playground',
        name: 'playground',
        component: () => import('@/documentation/examples/playground.vue')
      }
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
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: () => import('@/documentation/404.vue'),
    meta: { public: true }
  }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})
