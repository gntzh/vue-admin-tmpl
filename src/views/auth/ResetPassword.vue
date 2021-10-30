<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToggle } from '@vueuse/core'
import {
  useMessage,
  MessageOptions,
  NLayout,
  NCard,
  NH1,
  NDivider,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NIcon,
  FormRules,
} from 'naive-ui'
import EyeIcon from '~icons/ri/eye-line'
import EyeOffIcon from '~icons/ri/eye-off-line'

import { resetPassword } from '@/api/auth'
import { axios } from '@/utils/http'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const messageOption: MessageOptions = { duration: 5000 }

const token = route.query.token
console.log(
  route.fullPath,
  router,
  token,
  typeof token,
  typeof token == 'string',
)
const is_valid = Boolean(token && typeof token == 'string')
if (!is_valid) {
  message.warning('Invalid link', messageOption)
  router.push('/recovery')
}

const [is_visable, toggleVisable] = useToggle(false)
const formRef = ref<typeof NForm>(null!)
const formData = reactive({
  password1: '',
  password2: '',
})

const rules: FormRules = {
  password1: {
    required: true,
    message: 'Enter a password',
  },
  password2: [
    {
      required: true,
      message: 'Confirm your password',
    },
    {
      validator: (rule: any, value: string) => value === formData.password1,
      message: 'Those passwords didn’t match. Try again.',
    },
  ],
}

function handleSubmit(evt: Event) {
  evt.preventDefault()
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      try {
        const { data } = await resetPassword(
          token as string,
          formData.password1,
        )
        message.success(data.msg, messageOption)
        router.push('/')
      } catch (error) {
        if (axios.isAxiosError(error)) {
          message.error(
            error.response?.data?.msg || 'Invalid link',
            messageOption,
          )
          router.push('/recovery')
        } else {
          message.error('Unknown error', messageOption)
        }
      }
    }
  })
}
</script>

<template>
  <n-layout
    class="min-h-screen"
    content-style="display: flex; justify-content: center;"
  >
    <n-card size="huge" :bordered="false" class="max-w-md mx-4">
      <n-h1>Reset your password</n-h1>
      <n-divider />
      <n-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        size="large"
        :show-label="false"
        label-align="left"
      >
        <n-form-item path="password1">
          <n-input
            v-model:value="formData.password1"
            :type="is_visable ? 'text' : 'password'"
            placeholder="Password"
          >
            <template #suffix>
              <n-icon @click="toggleVisable">
                <eye-icon v-if="is_visable" />
                <eye-off-icon v-else />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item first path="password2">
          <n-input
            v-model:value="formData.password2"
            :type="is_visable ? 'text' : 'password'"
            placeholder="Confirm Password"
          >
            <template #suffix>
              <n-icon @click="toggleVisable">
                <eye-icon v-if="is_visable" />
                <eye-off-icon v-else />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item>
          <n-button block type="primary" @click="handleSubmit">
            Set new password
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </n-layout>
</template>
