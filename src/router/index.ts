import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { auth, logInLocally } from '@/composables/auth'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    permissions?: string[]
  }
}

const errorPages: Array<RouteRecordRaw> = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error-pages/403.vue'),
    meta: {
      title: 'Forbidden',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-pages/404.vue'),
    meta: {
      title: 'Not Found',
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/error-pages/500.vue'),
    meta: {
      title: 'Server Error',
    },
  },
]

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
    path: '/recovery',
    name: 'recovery',
    component: () => import('@/views/auth/Recovery.vue'),
    meta: {
      title: 'Verify Email',
    },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/auth/ResetPassword.vue'),
    meta: {
      title: 'Verify Email',
    },
  },
  {
    path: '/verify-email',
    name: 'verify-email',
    component: () => import('@/views/auth/VerifyEmail.vue'),
    meta: {
      title: 'Verify Email',
    },
  },
  ...errorPages,
  {
    path: '/',
    component: () => import('@/layouts/UserLayout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        redirect: '/dashboard',
      },
      ...errorPages.map(e => {
        return {
          ...e,
          path: 'error-pages' + e.path,
          name: 'error-pages/' + (e.name as string),
        }
      }),
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: 'Dashboard',
          permissions: ['admin'],
        },
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: 'account/profile',
        name: 'account/profile',
        meta: {
          title: 'Profile',
          permissions: ['admin'],
        },
        component: () => import('@/views/account/Profile.vue'),
      },
      {
        path: 'account/settings',
        name: 'account/settings',
        meta: {
          title: 'Settings',
          permissions: ['admin'],
        },
        component: () => import('@/views/account/Settings.vue'),
      },
      {
        path: 'about',
        name: 'about',
        meta: {
          title: 'About',
          permissions: ['admin'],
        },
        component: () => import('@/views/About.vue'),
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
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
