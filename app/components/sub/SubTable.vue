<script lang="tsx" setup>
import type { Table } from '#components'
import type { Sub } from '#server/db'
import type { TableColumn } from '@nuxt/ui'
import type { Schema } from './schema'
import { UButton } from '#components'
import CreateSubModal from './CreateSubModal.vue'

defineProps({
  data: {
    type: Array as () => Sub[],
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'refresh', data: Sub): void
  (e: 'remove', data: Sub): void
  (e: 'primary', data: Sub): void
  (e: 'submit', data: Schema): void
}>()

const dialog = useDialog()

const columns: TableColumn<Sub>[] = [
  {
    accessorKey: 'id',
    header: '#',
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
  },
  {
    id: 'actions',
    meta: {
      class: { th: 'w-[200px]' },
    },

    cell({ row }) {
      function handleSetPrimary() {
        dialog.open({
          confirmLabel: '确定',
          cancelLabel: '取消',
          title: '确定要设置该订阅为主订阅吗？',
        })
          .then(() => emit('primary', row.original))
      }

      function handleRefresh() {
        emit('refresh', row.original)
      }

      function handleRemove() {
        dialog.open({
          title: '确定要删除该订阅吗？',
          confirmLabel: '删除',
        })
          .then(() => emit('remove', row.original))
      }

      return (
        <div class="flex gap-2 justify-end">
          <UButton
            size="sm"
            color="success"
            icon="mingcute:refresh-2-fill"
            variant="soft"
            loadingAuto
            onClick={() => handleRefresh()}
          >
            刷新
          </UButton>

          <UButton
            size="sm"
            color="primary"
            variant="outline"
            icon="flat-color-icons:key"
            loadingAuto
            disabled={row.original.main ?? false}
            onClick={() => handleSetPrimary()}
          >
            设置主订阅
          </UButton>

          <UButton
            size="sm"
            color="error"
            icon="fluent:delete-12-regular"
            variant="soft"
            loadingAuto
            disabled={row.original.main ?? false}
            onClick={() => handleRemove()}
          >
            删除
          </UButton>
        </div>
      )
    },
  },
]
</script>

<template>
  <Table :data="data" :columns="columns" :table-max-height="20" title="订阅列表">
    <template #header>
      <div class="flex justify-end">
        <CreateSubModal />
      </div>
    </template>
    <template #footer>
      <UBadge variant="outline">
        Total: {{ data.length }}
      </UBadge>
    </template>
  </Table>
</template>

<style>

</style>
