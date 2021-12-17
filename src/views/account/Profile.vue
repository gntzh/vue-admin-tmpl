<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  NCard,
  NForm,
  NFormItem,
  FormRules,
  NInput,
  NModal,
  NButton,
  useMessage,
  NTag,
  NDivider,
  NAvatar,
  NIcon,
} from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { useToggle } from '@vueuse/core'
import { updateProfile } from '@/api/users'
import { requestEmailVerification } from '@/api/auth'
import ChangePassword from '@/components/forms/ChangePassword.vue'

import UserIcon from '~icons/ri/user-line'
import VerifiedIcon from '~icons/ri/lock-2-line'
import UnverifiedIcon from '~icons/ri/lock-unlock-line'

import { userInfo } from '@/composables/auth'

const router = useRouter()
const route = useRoute()
const message = useMessage()

const formRef = ref<typeof NForm>(null!)
const formData = reactive({
  username: userInfo.username,
  email: userInfo.email,
  password: undefined,
})
const formRules: FormRules = {
  username: { required: true, trigger: 'blur' },
  password: { required: false, trigger: 'blur' },
  email: { required: true, trigger: 'blur', type: 'email' },
}

async function handleEmailVerification() {
  try {
    const { data } = await requestEmailVerification()
    message.success(data.msg)
  } catch (error) {
    message.error('Failed to send email')
  }
}

function handleSubmit(evt: Event) {
  evt.preventDefault()
  formRef.value.validate(async (errors?: any) => {
    if (!errors) {
      try {
        const { data } = await updateProfile({
          username: formData.username,
          email: formData.email,
        })
        message.success('Update successfully')
      } catch (error) {
        message.error('Username or Email has been used.')
      }
    }
  })
}

const [is_visible, toggleVisible] = useToggle(false)
</script>

<template>
  <div class="gap-3 flex flex-wrap justify-center items-start">
    <n-card size="huge" :bordered="false" class="w-full lg:w-3/12">
      <div class="text-center">
        <n-avatar :size="96" circle>
          <n-icon :size="96"><user-icon /></n-icon>
        </n-avatar>
        <div class="text-xl font-semibold mb-1">{{ userInfo.username }}</div>
        <div class="text-sm text-gray-500">Short bio about you.</div>
      </div>
      <div class="flex">
        <div class="ml-6 flex flex-col justify-between"></div>
      </div>
      <n-divider />
      <div class="flex gap-1 flex-wrap">
        <n-tag type="info">Test Account</n-tag>
        <n-tag type="info">Superuser</n-tag>
        <n-tag type="info">Staff</n-tag>
        <n-tag type="info">Developer</n-tag>
        <n-tag type="info">Alpha</n-tag>
        <n-tag type="info">Backend</n-tag>
        <n-tag type="info">Frontend</n-tag>
      </div>
    </n-card>
    <n-card class="w-full lg:w-8/12">
      <div class="max-w-xl mb-4">
        <n-form size="large" :model="formData" :rules="formRules" ref="formRef">
          <n-form-item path="username" label="Username">
            <n-input v-model:value="formData.username" placeholder="Username" />
          </n-form-item>
          <n-form-item path="email" label="Email">
            <div class="flex flex-col flex-1">
              <n-input v-model:value="formData.email" placeholder="E-mail" />
              <div>
                <div
                  v-if="userInfo.emailVerified"
                  class="ml-2 text-green-600 flex items-center"
                >
                  <n-icon class="mr-1"><verified-icon /></n-icon>
                  <span>Verified</span>
                </div>
                <div v-else class="text-yellow-800 ml-2 flex items-center">
                  <n-icon class="mr-1"><unverified-icon /></n-icon>
                  <span>Unverified</span>
                  <n-button
                    @click="handleEmailVerification"
                    class="ml-4 mt-1 hover:underline"
                    text
                    size="small"
                    type="info"
                    >Resend verification email</n-button
                  >
                </div>
              </div>
            </div>
          </n-form-item>
          <div class="flex justify-end">
            <n-button ghost type="primary" @click="handleSubmit">
              Save
            </n-button>
          </div>
        </n-form>
      </div>
      <div class="text-lg">Security</div>
      <div class="w-full bg-gray-300 dark:bg-gray-800 h-0.5 my-2"></div>
      <n-button ghost type="primary" @click="toggleVisible(true)">
        Change Password
      </n-button>
      <n-modal v-model:show="is_visible">
        <n-card class="max-w-lg" title="Change Password">
          <change-password />
        </n-card>
      </n-modal>
    </n-card>
  </div>
</template>
