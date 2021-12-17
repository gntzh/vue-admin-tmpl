<script lang="ts" setup>
import { NResult, NButton } from 'naive-ui'
</script>
<template>
  <n-result
    status="404"
    title="404"
    description="Sorry, the page you visited does not exist."
    class="mx-8 my-52"
  >
    <template #footer>
      <router-link to="/"> <n-button>Back to home</n-button> </router-link>
    </template>
  </n-result>
</template>
