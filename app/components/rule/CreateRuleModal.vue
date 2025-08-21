<script lang="ts" setup>
import type { Schema } from './schema'
import { useToggle } from '@vueuse/core'
import { schema } from './schema'

defineEmits<{
  (e: 'submit', data: Schema): void
}>()

const [isOpen, openToggle] = useToggle()
const { create, isCreating } = useRuleQuery()

const state = reactive<Schema>({
  value: '',
})

const validate = createFormValidator(schema)

function handleSubmit(data: Schema) {
  create(data).then(() => openToggle(false))
}
</script>

<template>
  <UModal v-model:open="isOpen" title="添加规则">
    <UButton>添加</UButton>

    <template #body>
      <UForm :state="state" :validate="validate" class="gap-3 grid" @submit="(event) => handleSubmit(event.data)">
        <UFormField label="规则" name="value">
          <UInput v-model="state.value" class="w-full" />
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
