<script lang="ts">
import { useMessage } from 'naive-ui'

export default {
  name: 'MessageContent',
  setup() {
    window['$message'] = useMessage()
  },
}
</script>

<template></template>
