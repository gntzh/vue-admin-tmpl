<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  NForm,
  NFormItem,
  NInput,
  NCheckbox,
  NButton,
  NElement,
  NIcon,
  FormRules,
} from 'naive-ui'
import { LockOutlined, UserOutlined } from '@vicons/antd'

import { logIn } from '@/composables/auth'

const router = useRouter()
const route = useRoute()

const formRef = ref<typeof NForm>(null!)
const formData = reactive({
  username: '',
  password: '',
  rememberMe: true,
})
const formRules: FormRules = {
  username: { required: true, trigger: 'blur' },
  password: { required: true, trigger: 'blur' },
}

function handleLogIn(evt: Event) {
  evt.preventDefault()
  console.log(formData)
  formRef.value.validate(async (errors?: any) => {
    if (!errors) {
      if (
        await logIn(formData.username, formData.password, formData.rememberMe)
      ) {
        router.push((route.query.redirect || '/') as string)
      }
    }
  })
}
</script>

<template>
  <div
    class="
      bg-gray-100
      min-h-screen
      flex flex-col
      items-center
      justify-between
      pt-20
    "
  >
    <div class="p-6 w-full max-w-sm bg-white shadow-md rounded-md">
      <h1 class="my-8 text-center text-3xl font-extrabold text-gray-900">
        Admin Template
      </h1>
      <n-form
        :model="formData"
        :rules="formRules"
        size="large"
        :show-label="false"
        ref="formRef"
      >
        <n-form-item path="username">
          <n-input v-model:value="formData.username" placeholder="Usernmae">
            <template #prefix>
              <n-icon>
                <user-outlined></user-outlined>
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            type="password"
            v-model:value="formData.password"
            placeholder="Password"
            show-password-on="click"
          >
            <template #prefix>
              <n-icon>
                <lock-outlined></lock-outlined>
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="rememberMe">
          <div class="flex w-full justify-between items-center">
            <n-checkbox v-model:checked="formData.rememberMe"
              >Remember me</n-checkbox
            >
            <n-element tag="a" href="#" style="color: var(--info-color)">
              Forgot your password?
            </n-element>
          </div>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" block @click="handleLogIn">
            Log In
          </n-button>
        </n-form-item>
      </n-form>
    </div>
    <footer class="mt-12 mb-6">© 2021 Grant</footer>
  </div>
</template>
