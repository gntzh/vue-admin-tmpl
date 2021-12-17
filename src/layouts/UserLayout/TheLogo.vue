<script setup lang="ts">
import { NIcon } from 'naive-ui'
import GithubIcon from '~icons/ri/github-fill'

const props = defineProps<{
  collapsed: boolean
}>()
</script>

<template>
  <a
    class="mx-4 my-3 flex justify-center items-center"
    href="https://github.com/gntzh"
    target="_blank"
  >
    <n-icon size="28px">
      <github-icon />
    </n-icon>
    <span v-if="!collapsed" class="ml-3 text-xl font-semibold">Grant</span>
  </a>
</template>
