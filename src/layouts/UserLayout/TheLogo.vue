<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { GithubOutlined } from '@vicons/antd'

const props = defineProps<{
  collapsed: boolean
}>()
</script>

<template>
  <a
    class="mx-4 my-3 flex justify-center items-center"
    href="https://github.com/grantzs"
    target="_blank"
  >
    <n-icon size="28px">
      <github-outlined />
    </n-icon>
    <span v-if="!collapsed" class="ml-3 text-xl font-semibold">GitHub</span>
  </a>
</template>
