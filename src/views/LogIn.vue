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

import PasswordIcon from '~icons/ri/lock-line'
import UsernameIcon from '~icons/ri/user-line'

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
      min-h-screen
      flex flex-col
      items-center
      justify-between
      pt-20
      bg-gray-100
      dark:bg-gray-900
    "
  >
    <div
      class="p-6 w-full max-w-sm shadow-md rounded-md bg-white dark:bg-gray-800"
    >
      <h1
        class="
          my-8
          text-center text-3xl
          font-extrabold
          text-gray-900
          dark:text-gray-50
        "
      >
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
                <username-icon></username-icon>
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
                <password-icon></password-icon>
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="rememberMe">
          <div class="flex w-full justify-between items-center">
            <n-checkbox v-model:checked="formData.rememberMe"
              >Remember me</n-checkbox
            >
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
              >
                Forgot your password?
              </n-element>
            </router-link>
          </div>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" block @click="handleLogIn">
            Log In
          </n-button>
        </n-form-item>
      </n-form>
    </div>
    <footer class="mt-12 mb-6 text-gray-500 dark:text-gray-400">
      © 2021 Grant
    </footer>
  </div>
</template>
