<script setup lang="ts">
import { ref } from 'vue'

import { NDrawer, NDrawerContent } from 'naive-ui'

const isShow = ref(false)

function showSettings() {
  isShow.value = true
}
defineExpose({ showSettings })
</script>

<template>
  <n-tooltip trigger="hover" placement="bottom-start">
    Settings
    <template #trigger>
      <n-button class="px-3" text @click="() => showSettings()">
        <n-icon size="18px"> <setting-outlined /> </n-icon>
      </n-button>
    </template>
  </n-tooltip>
  <the-settings ref="settingsRef"></the-settings>
  <n-drawer v-model:show="isShow" placement="right" width="281">
    <n-drawer-content title="Settings"> Settings </n-drawer-content>
  </n-drawer>
</template>
