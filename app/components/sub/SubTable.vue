<script lang="tsx" setup>
import type { Table } from '#components'
import type { Sub } from '#server/db'
import type { TableColumn } from '@nuxt/ui'
import { UButton } from '#components'
import { useClipboard } from '@vueuse/core'
import CreateSubModal from './CreateSubModal.vue'

const dialog = useDialog()
const { modal: subModal } = useUpdateSub()
const { data, isLoading, refreshSub, remove, toggleMainSub, refetch } = useSubQuery()
const source = ref('')
const toast = useToast()
const { copy } = useClipboard({ source })

const columns: TableColumn<Sub>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      class: { th: 'w-[100px]' },
    },
  },
  {
    accessorKey: 'name',
    header: '名称',
    meta: {
      class: { th: 'w-[200px]' },
    },
  },
  {
    accessorKey: 'url',
    header: 'URL',
    cell({ row }) {
      return (
        <div class="w-[300px] text-ellipsis overflow-hidden" title={row.original.url}>
          {row.original.url}
        </div>
      )
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'UpdatedAt',
    meta: {
      class: { th: 'w-[200px]' },
    },
    cell(props) {
      return formatDay(props.row.original.updatedAt)
    },
  },
  {
    id: 'actions',
    meta: {
      class: { th: 'w-[200px]' },
    },

    cell({ row }) {
      async function handleSetPrimary() {
        await dialog.open({
          confirmLabel: '确定',
          cancelLabel: '取消',
          title: '确定要设置该订阅为主订阅吗？',
        })

        await toggleMainSub(row.original.id)
      }

      async function handleUpdate() {
        await subModal.open({
          data: row.original,
        })
      }

      async function handleRefresh() {
        await refreshSub(row.original.id)
      }

      async function handleRemove() {
        await dialog.open({
          title: '确定要删除该订阅吗？',
          confirmLabel: '删除',
        })

        await remove(row.original.id)
      }

      return (
        <div class="flex gap-2 justify-end">
          <UButton
            size="sm"
            color={row.original.main ? 'error' : 'neutral'}
            variant="ghost"
            loadingAuto
            onClick={handleSetPrimary}
          >
            {row.original.main ? '取消' : '设置'}
            主订阅
          </UButton>

          <UButton
            size="sm"
            color="neutral"
            icon="fluent:edit-12-filled"
            variant="ghost"
            loadingAuto
            onClick={handleUpdate}
          >
            修改
          </UButton>

          <UButton
            size="sm"
            color="neutral"
            icon="mingcute:refresh-2-fill"
            variant="ghost"
            loadingAuto
            onClick={handleRefresh}
          >
            刷新
          </UButton>

          <UButton
            size="sm"
            color="error"
            icon="fluent:delete-12-regular"
            variant="ghost"
            loadingAuto
            onClick={handleRemove}
          >
            删除
          </UButton>
        </div>
      )
    },
  },
]

function handleCopy() {
  copy()
  toast.add({
    title: '复制成功😎',
    description: '你需要拼接 Token 后才能使用捏~',
    color: 'success',
  })
}

onMounted(() => source.value = `${window.origin}/sub/`)
</script>

<template>
  <Table :data="data ?? []" :columns="columns" :table-max-height="60" title="订阅列表" :loading="isLoading">
    <template #header>
      <div class="flex justify-end gap-2">
        <UButton
          size="sm"
          color="neutral"
          icon="mingcute:refresh-2-fill"
          variant="ghost"
          loading-auto
          @click="async () => { await refetch() }"
        >
          刷新
        </UButton>

        <UButton color="neutral" variant="ghost" @click="handleCopy">
          复制订阅地址
        </UButton>

        <CreateSubModal />
      </div>
    </template>
    <template #footer>
      <UBadge variant="outline">
        Total: {{ data?.length ?? 0 }}
      </UBadge>
    </template>
  </Table>
</template>

<style>

</style>
