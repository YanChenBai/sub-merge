<script lang="ts" setup>
import type { CreateGroupSchema } from '#shared/schema'
import { createGroupSchema } from '#shared/schema'
import { useToggle } from '@vueuse/core'

defineEmits<{
  (e: 'submit', data: CreateGroupSchema): void
}>()

const [isOpen, openToggle] = useToggle()
const { create, isCreating } = useGroupQuery()

const state = reactive<CreateGroupSchema>({
  name: '',
})

const validate = createFormValidator(createGroupSchema)

function handleSubmit(data: CreateGroupSchema) {
  create(data).then(() => openToggle(false))
}
</script>

<template>
  <UModal v-model:open="isOpen" title="添加规则">
    <UButton color="neutral" variant="ghost" class="justify-center">
      添加
    </UButton>

    <template #body>
      <UForm :state="state" :validate="validate" class="gap-3 grid" @submit="(event) => handleSubmit(event.data)">
        <UFormField label="分组名" name="value">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>

        <UButton type="submit" class="w-full !justify-center" :loading="isCreating">
          提交
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>

<style>

</style>
