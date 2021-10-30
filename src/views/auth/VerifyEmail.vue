<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage, MessageOptions } from 'naive-ui'
import { confirmEmailVerification } from '@/api/auth'
import { axios } from '@/utils/http'

const route = useRoute()
const router = useRouter()
const message = useMessage()

const token = route.query.token
console.log(
  route.fullPath,
  router,
  token,
  typeof token,
  typeof token == 'string',
)
message.info(token as string)
const messageOption: MessageOptions = { duration: 5000 }

const is_valid = token && typeof token == 'string'
if (!is_valid) {
  message.warning('Invalid link', messageOption)
  router.push('/')
} else {
  onBeforeMount(async () => {
    try {
      const { data } = await confirmEmailVerification(token)
      message.success(data.msg, messageOption)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(
          error.response?.data?.msg || 'Invalid link',
          messageOption,
        )
      } else {
        message.error('Unknown error', messageOption)
      }
    }
    router.push('/')
  })
}
</script>

<template></template>
