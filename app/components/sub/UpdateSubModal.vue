<script lang="ts" setup>
import type { UpdateSubSchema } from '#shared/schema'
import { updateSubSchema } from '#shared/schema'
import { useToggle } from '@vueuse/core'

const props = defineProps<{
  data: UpdateSubSchema
}>()

const state = reactive(props.data)

const [isOpen, openToggle] = useToggle()
const validate = createFormValidator(updateSubSchema)

const { isCreating, update } = useSubQuery()

function handleSubmit(data: UpdateSubSchema) {
  update(data).then(() => openToggle(false))
}
</script>

<template>
  <UModal v-model:open="isOpen" title="修改订阅">
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
