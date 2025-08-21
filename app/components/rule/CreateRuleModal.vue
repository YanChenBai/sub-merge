<script lang="ts" setup>
import type { Schema } from './schema'
import { schema } from './schema'

defineEmits<{
  (e: 'submit', data: Schema): void
}>()

const state = reactive<Schema>({
  value: '',
})

const validate = createFormValidator(schema)
</script>

<template>
  <UModal title="添加规则">
    <UButton>添加</UButton>

    <template #body>
      <UForm :state="state" :validate="validate" class="gap-3 grid" @submit="(event) => $emit('submit', event.data)">
        <UFormField label="规则" name="value">
          <UInput v-model="state.value" class="w-full" />
        </UFormField>

        <UButton type="submit" class="w-full !justify-center">
          提交
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>

<style>

</style>
