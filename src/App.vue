<script setup lang="ts">
import { computed } from 'vue'
import { NConfigProvider, darkTheme, NMessageProvider } from 'naive-ui'
import MessageContent from '@/components/application/MessageContent.vue'
import { isDark } from '@/composables/darkMode'

const theme = computed(() => (isDark.value ? darkTheme : null))
</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <message-content />
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
