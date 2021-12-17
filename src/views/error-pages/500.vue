<script lang="ts" setup>
import { NResult, NButton } from 'naive-ui'
</script>
<template>
  <n-result
    status="500"
    title="500"
    description="Sorry, the server is reporting an error."
    class="mx-8 my-52"
  >
    <template #footer>
      <router-link to="/"> <n-button>Back to home</n-button> </router-link>
    </template>
  </n-result>
</template>
