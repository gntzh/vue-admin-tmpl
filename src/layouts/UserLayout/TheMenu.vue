<script setup lang="ts">
import { h, ref } from 'vue'
import { NMenu } from 'naive-ui'
import {
  DashboardOutlined,
  BulbOutlined,
  UserOutlined,
  ExceptionOutlined,
} from '@vicons/antd'
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
    icon: () => renderIcon(DashboardOutlined),
  },
  {
    label: 'Account',
    key: 'account',
    icon: () => renderIcon(UserOutlined),
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
    label: 'Error Pages',
    key: 'error-pages',
    icon: () => renderIcon(ExceptionOutlined),
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
    icon: () => renderIcon(BulbOutlined),
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
    v-model:value="activeKey"
  />
</template>
