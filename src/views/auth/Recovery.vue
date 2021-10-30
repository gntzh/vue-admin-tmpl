<script setup lang="ts">
import { ref, reactive } from 'vue'
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
import { recoverAccount } from '@/api/auth'
import { axios } from '@/utils/http'

const message = useMessage()
const messageOption: MessageOptions = { duration: 5000 }

const formRef = ref<typeof NForm>(null!)
const formData = reactive({
  email: '',
})

const rules: FormRules = {
  email: [
    {
      required: true,
    },
    {
      pattern:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'The value is not a valid email address',
    },
  ],
}
function handleSubmit(evt: Event) {
  evt.preventDefault()
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      try {
        const { data } = await recoverAccount(formData.email)
        message.success(data.msg, messageOption)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          message.error(
            error.response?.data?.msg || 'Invalid email',
            messageOption,
          )
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
    content-style="display: flex; justify-content: center; padding-top: 5rem;"
  >
    <n-card size="huge" :bordered="false" class="max-w-md mx-4">
      <n-h1>Recover you account</n-h1>
      <n-divider />
      <n-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        size="large"
        label-align="left"
      >
        <n-form-item path="email" label="Please enter your email address">
          <n-input
            v-model:value="formData.email"
            placeholder="email@example.com"
          >
          </n-input>
        </n-form-item>
        <n-form-item>
          <n-button block type="primary" @click="handleSubmit">
            Request password reset
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </n-layout>
</template>
