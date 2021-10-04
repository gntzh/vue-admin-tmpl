import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { auth, logInLocally } from '@/composables/auth'

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
    beforeEnter: async (to, from) => {
      if (auth.accessToken || (await logInLocally())) {
        return (to.query.redirect || '/') as string
      }
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

router.beforeEach(async (to, from) => {
  if (to.meta.permissions) {
    if (!auth.accessToken) {
      if (await logInLocally()) {
        return
      } else {
        return {
          path: '/login',
          query: {
            redirect: to.fullPath,
          },
        }
      }
    }
  }
})

router.afterEach((to, from, failure) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
export default router
