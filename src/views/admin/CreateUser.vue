<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  NCard,
  NForm,
  NFormItem,
  FormRules,
  NInput,
  NCheckbox,
  NButton,
  useMessage,
} from 'naive-ui'
import { createUser } from '@/api/users'

const formRef = ref<typeof NForm>(null!)
const formData = reactive({
  username: '',
  password: '',
  email: '',
  isSuperuser: false,
  emailVerified: false,
})
const formRules: FormRules = {
  username: { required: true, trigger: 'blur' },
  password: { required: true, trigger: 'blur' },
  email: { required: true, trigger: 'blur', type: 'email' },
}

const message = useMessage()

function handleSubmit(evt: Event) {
  evt.preventDefault()
  formRef.value.validate(async (errors?: any) => {
    if (!errors) {
      try {
        await createUser(formData)
        message.success('Create user successfully')
      } catch (error) {
        message.error('Username or Email has been used.')
      }
    }
  })
}
</script>

<template>
  <n-card title="Create User">
    <div class="mx-auto max-w-xl mb-4">
      <n-form size="large" :model="formData" :rules="formRules" ref="formRef">
        <n-form-item path="username" label="Username">
          <n-input v-model:value="formData.username" placeholder="Username" />
        </n-form-item>
        <n-form-item path="email" label="Email">
          <n-input v-model:value="formData.email" placeholder="E-mail" />
        </n-form-item>
        <div class="flex gap-8">
          <n-form-item path="isSuperuser" :show-label="false">
            <n-checkbox
              v-model:checked="formData.isSuperuser"
              placeholder="isSuperuser"
            />
            <div class="ml-2">User is superuser?</div>
          </n-form-item>
          <n-form-item path="emailVerified" :show-label="false">
            <n-checkbox
              v-model:checked="formData.emailVerified"
              placeholder="emailVerified"
            />
            <div class="ml-2">Email is verified?</div>
          </n-form-item>
        </div>
        <n-form-item path="password" label="Password">
          <n-input v-model:value="formData.password" placeholder="Password" />
        </n-form-item>
        <div class="flex justify-end">
          <n-button ghost type="primary" @click="handleSubmit">
            Create User
          </n-button>
        </div>
      </n-form>
    </div>
  </n-card>
</template>
