<script lang="ts" setup>
import { NResult, NButton } from 'naive-ui'
</script>
<template>
  <n-result
    status="403"
    title="403"
    description="Sorry, you don't have access to this page."
    class="mx-8 my-52"
  >
    <template #footer>
      <router-link to="/"> <n-button>Back to home</n-button> </router-link>
    </template>
  </n-result>
</template>
