<script setup lang="ts">
import { computed } from 'vue'
import { NConfigProvider, darkTheme } from 'naive-ui'
import { isDark } from '@/composables/darkMode'

const theme = computed(() => (isDark.value ? darkTheme : null))

</script>

<template>
  <n-config-provider :theme="theme">
    <router-view />
  </n-config-provider>
</template>
