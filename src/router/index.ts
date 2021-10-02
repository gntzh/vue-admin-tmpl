import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    permissions?: string[]
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LogIn.vue'),
    meta: {
      title: 'Log In',
    },
  },
  {
    path: '/',
    component: () => import('@/layouts/UserLayout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: 'Home',
          permissions: ['admin'],
        },
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {})

router.afterEach((to, from, failure) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
export default router
