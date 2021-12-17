<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  NCard,
  NForm,
  NFormItem,
  FormRules,
  NInput,
  NCheckbox,
  NButton,
  useMessage,
  NDatePicker,
} from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { getUser, updateUser } from '@/api/users'

const router = useRouter()
const route = useRoute()
const message = useMessage()

const userId = route.params.id as string

const formRef = ref<typeof NForm>(null!)
const formData = reactive({
  username: '',
  password: undefined,
  hashedPassword: '',
  email: '',
  isSuperuser: false,
  emailVerified: false,
  dateJoined: 0,
})
const formRules: FormRules = {
  username: { required: true, trigger: 'blur' },
  password: { required: false, trigger: 'blur' },
  email: { required: true, trigger: 'blur', type: 'email' },
  dateJoined: {
    required: true,
    trigger: 'blur',
    type: 'number',
    message: 'Date joined is required',
  },
}

onMounted(async () => {
  const { data } = await getUser(route.params.id as string)
  formData.username = data.username
  formData.email = data.email
  formData.hashedPassword = data.password
  formData.emailVerified = data.emailVerified
  formData.isSuperuser = data.isSuperuser
  formData.dateJoined = new Date(data.dateJoined).getTime()
})

function handleSubmit(evt: Event) {
  evt.preventDefault()
  formRef.value.validate(async (errors?: any) => {
    if (!errors) {
      try {
        const { data } = await updateUser(userId, {
          username: formData.username,
          email: formData.email,
          password: formData.password || undefined,
          emailVerified: formData.emailVerified,
          isSuperuser: formData.isSuperuser,
          dateJoined: new Date(formData.dateJoined),
        })
        formData.hashedPassword = data.password
        message.success('Update successfully')
      } catch (error) {
        message.error('Username or Email has been used.')
      }
    }
  })
}
</script>

<template>
  <n-card title="Edit User">
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
        <n-form-item path="password" label="Set plain password below:">
          <div>
            <n-input v-model:value="formData.password" placeholder="Password" />
            <div class="text-sm ml-3 mt-0.5">
              <span class="font-bold">hashed password with salt: </span>
              <span class="text-xs opacity-80">
                {{ formData.hashedPassword }}
              </span>
            </div>
          </div>
        </n-form-item>
        <n-form-item path="dateJoined" label="Date Joined">
          <n-date-picker v-model:value="formData.dateJoined" type="datetime" />
        </n-form-item>
        <div class="flex justify-end">
          <n-button ghost type="primary" @click="handleSubmit"> Save </n-button>
        </div>
      </n-form>
    </div>
  </n-card>
</template>
