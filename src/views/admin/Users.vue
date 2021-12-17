<script setup lang="ts">
import {
  NAvatar,
  NButton,
  NCheckbox,
  NDataTable,
  NIcon,
  NTooltip,
  NCard,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { reactive, ref, onMounted, h } from 'vue'
import EditIcon from '~icons/ri/edit-fill'
import AddIcon from '~icons/ri/add-fill'
import { IUserInfo } from '@/api/schemas'
import { listUsers } from '@/api/users'
import { useRouter } from 'vue-router'

const router = useRouter()
const columns: DataTableColumns<IUserInfo> = [
  {
    title: 'Avatar',
    key: 'avatar',
    render: (row: IUserInfo) => {
      const avatar = row.avatar
      return h(NAvatar, {
        round: true,
        src:
          row.avatar ||
          'https://pic3.zhimg.com/v2-abed1a8c04700ba7d72b45195223e0ff_s.jpg',
      })
    },
  },
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'Username',
    key: 'username',
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Email Verified',
    key: 'emailVerified',
    align: 'center',
    render: (row: IUserInfo) => {
      return h(NCheckbox, {
        disabled: true,
        checked: row.emailVerified,
      })
    },
  },
  {
    title: 'Action',
    key: 'edit',
    align: 'center',
    render: (row: IUserInfo) => {
      return h(NTooltip, null, {
        default: () => 'Edit',
        trigger: () =>
          h(
            NButton,
            {
              circle: true,
              type: 'primary',
              strong: true,
              secondary: true,
              onClick: () => {
                router.push({
                  name: 'admin/users/edit',
                  params: {
                    id: row.id,
                  },
                })
              },
            },
            { icon: () => h(NIcon, null, { default: () => h(EditIcon) }) },
          ),
      })
    },
  },
]
const loading = ref(true)
const pagination = reactive({
  page: 1,
  pageCount: 0,
  pageSize: 5,
  itemCount: 0,
})
const data = ref<IUserInfo[]>([])

async function queryUsers(page: number, pageSize: number) {
  const { data } = await listUsers((page - 1) * pageSize, pageSize)
  return data
}
function rowKey(row: IUserInfo) {
  return row.id
}
onMounted(async () => {
  const { items, totalCount } = await queryUsers(
    pagination.page,
    pagination.pageSize,
  )
  data.value = items
  loading.value = false
  pagination.itemCount = totalCount
  pagination.pageCount = Math.ceil(totalCount / pagination.pageSize)
  console.log(data.value)
  console.log(pagination)
})

async function handlePageChange(currentPage: number) {
  if (!loading.value) {
    loading.value = true
    try {
      const { items, totalCount } = await queryUsers(
        currentPage,
        pagination.pageSize,
      )
      data.value = items
      loading.value = false
      pagination.page = currentPage
      pagination.itemCount = totalCount
      pagination.pageCount = Math.ceil(totalCount / pagination.pageSize)
      loading.value = false
    } catch (error) {}
  }
}
</script>

<template>
  <n-card>
    <n-button
      ghost
      type="primary"
      class="mb-4"
      @click="router.push({ name: 'admin/users/create' })"
    >
      <template #icon>
        <n-icon>
          <add-icon />
        </n-icon>
      </template>
      Add User
    </n-button>
    <n-data-table
      remote
      :columns="columns"
      :data="data"
      :row-key="rowKey"
      :pagination="pagination"
      :loading="loading"
      @update-page="handlePageChange"
    />
  </n-card>
</template>
