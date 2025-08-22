<script lang="ts" setup>
import type { UpdateRuleSchema } from '#shared/schema'
import { updateRuleSchema } from '#shared/schema'
import { useToggle } from '@vueuse/core'

const props = defineProps<{
  data: UpdateRuleSchema
}>()

defineEmits<{
  (e: 'submit', data: UpdateRuleSchema): void
}>()

const [isOpen, openToggle] = useToggle()
const { create, isCreating } = useRuleQuery()

const state = reactive<UpdateRuleSchema>(props.data)

const validate = createFormValidator(updateRuleSchema)

function handleSubmit(data: UpdateRuleSchema) {
  create(data).then(() => openToggle(false))
}
</script>

<template>
  <UModal v-model:open="isOpen" title="修改规则">
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
