<script lang="tsx" setup>
import type { Table } from '#components'
import type { Rule } from '#server/db'
import type { TableColumn } from '@nuxt/ui'
import { UButton, USwitch } from '#components'
import CreateRuleModal from './CreateRuleModal.vue'

const dialog = useDialog()
const { modal: updateModal } = useUpdateRule()
const { remove, setEnabled, isLoading, data } = useRuleQuery()

const columns: TableColumn<Rule>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
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
      async function handleEnabledUpdate(value: boolean) {
        await setEnabled({ id: row.original.id, value })
      }

      async function handleRemove() {
        await dialog.open({
          title: '确定要删除该规则吗？',
          confirmLabel: '删除',
        })

        await remove(row.original.id)
      }

      async function handleUpdate() {
        await updateModal.open({ data: row.original })
      }

      return (
        <div class="flex gap-2 justify-end items-center">
          <USwitch
            defaultValue={row.original.enabled}
            onUpdate:modelValue={handleEnabledUpdate}
          >
          </USwitch>

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
  <Table :data="data ?? []" :columns="columns" :table-max-height="26" title="规则列表" :loading="isLoading">
    <template #header>
      <div class="flex justify-end">
        <CreateRuleModal />
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
