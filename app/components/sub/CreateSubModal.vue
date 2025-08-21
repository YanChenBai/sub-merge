<script lang="ts" setup>
import type { FormError } from '@nuxt/ui'
import type { Schema } from './schema'
import { useToggle } from '@vueuse/core'
import { schema } from './schema'

const state = reactive<Schema>({
  name: '',
  url: '',
})

const [isOpen, openToggle] = useToggle()
const validate = createFormValidator(schema)

const { isCreating, create } = useSubQuery()

function handleSubmit(data: Schema) {
  create(data).then(() => openToggle(false))
}
</script>

<template>
  <UModal v-model:open="isOpen" title="添加订阅">
    <UButton @click="openToggle(true)">
      添加
    </UButton>

    <template #body>
      <UForm :state="state" :validate="validate" class="gap-3 grid" @submit="(event) => handleSubmit(event.data)">
        <UFormField label="名称" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>

        <UFormField label="地址" name="url">
          <UInput v-model="state.url" class="w-full" />
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
