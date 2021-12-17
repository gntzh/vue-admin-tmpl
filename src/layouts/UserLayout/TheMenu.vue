<script setup lang="ts">
import { h, ref } from 'vue'
import { NMenu } from 'naive-ui'

import AboutIcon from '~icons/ri/lightbulb-line'
import ErrorPageIcon from '~icons/ri/error-warning-line'
import DashboardIcon from '~icons/ri/dashboard-3-line'
import UserIcon from '~icons/ri/user-line'
import AdminIcon from '~icons/ri/admin-line'

import { RouterLink } from 'vue-router'
import { renderIcon } from '@/components/naive-ui'

const props = defineProps<{
  collapsed: boolean
}>()

const activeKey = ref(null)

const menuOptions = [
  {
    label: () =>
      h(RouterLink, { to: '/dashboard' }, { default: () => 'Dashboard' }),
    key: 'dashboard',
    icon: () => renderIcon(DashboardIcon),
  },
  {
    label: 'Account',
    key: 'account',
    icon: () => renderIcon(UserIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            { to: { name: 'account/profile' } },
            { default: () => 'Profile' },
          ),
        key: 'account/profile',
      },
      {
        label: () =>
          h(
            RouterLink,
            { to: { name: 'account/settings' } },
            { default: () => 'Settings' },
          ),
        key: 'account/settings',
      },
    ],
  },
  {
    label: 'Admin',
    key: 'admin',
    icon: () => renderIcon(AdminIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            { to: { name: 'admin/users' } },
            { default: () => 'Users' },
          ),
        key: 'admin/users',
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: { name: 'admin/users/create' },
            },
            { default: () => 'Create User' },
          ),
        key: 'account/users/create',
      },
    ],
  },
  {
    label: 'Error Pages',
    key: 'error-pages',
    icon: () => renderIcon(ErrorPageIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            { to: { name: 'error-pages/403' } },
            { default: () => '403' },
          ),
        key: 'error-pages/403',
      },
      {
        label: () =>
          h(
            RouterLink,
            { to: { name: 'error-pages/404' } },
            { default: () => '404' },
          ),
        key: 'error-pages/404',
      },
      {
        label: () =>
          h(
            RouterLink,
            { to: { name: 'error-pages/500' } },
            { default: () => '500' },
          ),
        key: 'error-pages/500',
      },
    ],
  },
  {
    label: () => h(RouterLink, { to: '/about' }, { default: () => 'About' }),
    key: 'about',
    icon: () => renderIcon(AboutIcon),
  },
]
</script>

<template>
  <n-menu
    :collapsed="collapsed"
    :options="menuOptions"
    :collapsed-width="48"
    :indent="24"
    :root-indent="16"
    inverted
    v-model:value="activeKey"
  />
</template>
