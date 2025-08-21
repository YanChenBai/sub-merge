<script lang="tsx" setup>
import type { Table } from '#components'
import type { Rule } from '#server/db'
import type { TableColumn } from '@nuxt/ui'
import type { Schema } from './schema'
import { UButton, USwitch } from '#components'
import CreateRuleModal from './CreateRuleModal.vue'

defineProps({
  data: {
    type: Array as () => Rule[],
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'enabled', data: { row: Rule, value: boolean }): void
  (e: 'remove', data: Rule): void
  (e: 'submit', data: Schema): void
}>()

const dialog = useDialog()

const columns: TableColumn<Rule>[] = [
  {
    accessorKey: 'id',
    header: '#',
    meta: {
      class: { th: 'w-2' },
    },
  },
  {
    accessorKey: 'value',
    header: '规则',
    meta: {
      class: { th: 'w-[200px]' },
    },
  },
  {
    id: 'actions',
    meta: {
      class: { th: 'w-[200px]' },
    },

    cell({ row }) {
      function handleUpdate(value: boolean) {
        emit('enabled', { row: row.original, value })
      }

      function handleRemove() {
        dialog.open({
          title: '确定要删除该规则吗？',
          confirmLabel: '删除',
        })
          .then(() => emit('remove', row.original))
      }

      return (
        <div class="flex gap-2 justify-end items-center">
          <USwitch
            defaultValue={row.original.enabled}
            onUpdate:modelValue={handleUpdate}
          >
          </USwitch>
          <UButton
            size="sm"
            color="error"
            icon="fluent:delete-12-regular"
            variant="soft"
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
</script>

<template>
  <Table :data="data" :columns="columns" :table-max-height="26" title="订阅列表">
    <template #header>
      <div class="flex justify-end">
        <CreateRuleModal />
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
