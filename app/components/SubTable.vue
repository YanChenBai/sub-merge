<script lang="tsx" setup>
import type { Table } from '#components'
import type { Sub } from '#server/db'
import type { FormError, TableColumn } from '@nuxt/ui'
import type { Static } from '@sinclair/typebox'
import { UButton } from '#components'

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
}>()

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
      return (
        <div class="flex gap-2 justify-end">
          <UButton
            size="sm"
            color="primary"
            variant="outline"
            icon="flat-color-icons:key"
            loadingAuto
            onClick={() => emit('primary', row.original)}
          >
            设置主订阅
          </UButton>
          <UButton
            size="sm"
            color="success"
            icon="mingcute:refresh-2-fill"
            variant="soft"
            loadingAuto
            onClick={() => emit('refresh', row.original)}
          >
            刷新
          </UButton>
          <UButton
            size="sm"
            color="error"
            icon="fluent:delete-12-regular"
            variant="soft"
            loadingAuto
            onClick={() => emit('remove', row.original)}
          >
            删除
          </UButton>
        </div>
      )
    },
  },
]

const toast = useToast()

const schema = T.Object({
  name: T.String({
    maxLength: 20,
    minLength: 2,
  }),
  url: T.String({
    pattern: '^https?:\/\/.+$',
  }),
})

type Schema = Static<typeof schema>

const state = reactive<Schema>({
  name: '',
  url: '',
})

function validate(v: any): FormError[] {
  const errors = []

  for (const item of TValue.Errors(schema, v)) {
    errors.push({
      name: item.path.substring(1),
      message: item.message,
    })
  }

  return errors
}

function onSubmit() {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
}
</script>

<template>
  <Table :data="data" :columns="columns" :table-max-height="20" title="订阅列表">
    <template #header>
      <div class="flex justify-end">
        <UModal title="添加订阅">
          <UButton>添加</UButton>

          <template #body>
            <UForm :state="state" :validate="validate" @submit="onSubmit">
              <UFormField label="名称" name="name">
                <UInput v-model="state.name" class="w-full" />
              </UFormField>

              <UFormField label="地址" name="url">
                <UInput v-model="state.url" class="w-full" />
              </UFormField>

              <UButton type="submit" class="mt-4 w-full !justify-center">
                提交
              </UButton>
            </UForm>
          </template>
        </UModal>
      </div>
    </template>
    <template #footer>
      123
    </template>
  </Table>
</template>

<style>

</style>
