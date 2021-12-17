<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToggle } from '@vueuse/core'
import {
  useMessage,
  MessageOptions,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NIcon,
  FormRules,
  NElement,
} from 'naive-ui'
import EyeIcon from '~icons/ri/eye-line'
import EyeOffIcon from '~icons/ri/eye-off-line'

import { changePassword } from '@/api/auth'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const messageOption: MessageOptions = { duration: 5000 }

const [is_visible, toggleVisible] = useToggle(false)
const formRef = ref<typeof NForm>(null!)
const formData = reactive({
  oldPassword: '',
  password1: '',
  password2: '',
})

const rules: FormRules = {
  oldPassword: {
    required: true,
    message: 'Enter a password',
  },
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
        const { data } = await changePassword({
          oldPassword: formData.oldPassword,
          newPassword: formData.password1,
        })
        message.success(data.msg, messageOption)
        router.push('/')
      } catch (error) {
        message.error('Error old password', messageOption)
      }
    }
  })
}
</script>

<template>
  <n-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    size="large"
    :show-label="false"
    label-align="left"
  >
    <n-form-item path="oldPassword">
      <n-input
        v-model:value="formData.oldPassword"
        type="password"
        show-password-on="mousedown"
        placeholder="Old password"
      >
      </n-input>
    </n-form-item>
    <n-form-item path="password1">
      <n-input
        v-model:value="formData.password1"
        :type="is_visible ? 'text' : 'password'"
        placeholder="Password"
      >
        <template #suffix>
          <n-icon @click="toggleVisible()">
            <eye-icon v-if="is_visible" />
            <eye-off-icon v-else />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>
    <n-form-item first path="password2">
      <n-input
        v-model:value="formData.password2"
        :type="is_visible ? 'text' : 'password'"
        placeholder="Confirm Password"
      >
        <template #suffix>
          <n-icon @click="toggleVisible()">
            <eye-icon v-if="is_visible" />
            <eye-off-icon v-else />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>
    <div class="flex justify-end items-center">
      <router-link
        :to="{ name: 'recovery' }"
        custom
        v-slot="{ navigate, href }"
      >
        <n-element
          tag="a"
          :href="href"
          @click="navigate"
          style="color: var(--info-color)"
          class="mr-2"
        >
          Forgot your password?
        </n-element>
      </router-link>
      <n-button ghost type="primary" @click="handleSubmit">
        Set new password
      </n-button>
    </div>
  </n-form>
</template>
