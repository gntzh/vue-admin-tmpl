<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { NDropdown, NAvatar, NIcon, NButton } from 'naive-ui'

import LogoutIcon from '~icons/ri/logout-circle-line'
import MenuFoldIcon from '~icons/ri/menu-fold-line'
import MenuUnfoldIcon from '~icons/ri/menu-unfold-line'
import SettingsIcon from '~icons/ri/settings-3-line'
import UserIcon from '~icons/ri/user-line'
import LightModeIcon from '~icons/ri/sun-line'
import DarkModeIcon from '~icons/ri/moon-line'

import { renderIcon } from '@/components/naive-ui'
import { userInfo, logOut } from '@/composables/auth'
import { isDark, toggleDark } from '@/composables/darkMode'

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
}>()

const router = useRouter()
const route = useRoute()

function handleUserAction(key: string) {
  switch (key) {
    case 'logout':
      logOut()
      router.push({
        path: '/login',
        query: { redirect: route.fullPath },
      })
      break
    case 'profile':
      router.push({ name: 'account/profile' })
      break
    case 'settings':
      router.push({ name: 'account/settings' })
      break
  }
}
const userOptions = [
  {
    label: 'Profile',
    key: 'profile',
    icon: () => renderIcon(UserIcon),
  },
  {
    label: 'Settings',
    key: 'settings',
    icon: () => renderIcon(SettingsIcon),
  },
  { type: 'divider', key: 'd1' },
  {
    label: 'Log Out',
    key: 'logout',
    icon: () => renderIcon(LogoutIcon),
  },
]
</script>

<template>
  <div class="px-4 flex justify-between h-full">
    <div class="flex items-center hover:text-green-600">
      <n-icon size="18px" @click="emit('update:collapsed', !collapsed)">
        <menu-unfold-icon v-if="collapsed" />
        <menu-fold-icon v-else />
      </n-icon>
    </div>
    <div class="flex">
      <n-button text @click="toggleDark()" class="px-3">
        <n-icon size="18px">
          <dark-mode-icon v-if="isDark" />
          <light-mode-icon v-else />
        </n-icon>
      </n-button>
      <n-dropdown
        :options="userOptions"
        @select="handleUserAction"
        trigger="hover"
        placement="bottom-end"
      >
        <div class="h-full px-3 flex items-center">
          <n-button text>
            <n-avatar round size="small">
              <n-icon><user-icon /></n-icon>
            </n-avatar>
            <span class="ml-2">{{ userInfo.username }}</span>
          </n-button>
        </div>
      </n-dropdown>
    </div>
  </div>
</template>
