<script lang="ts" setup>
import type { UpdateRuleSchema } from '#shared/schema'
import { updateRuleSchema } from '#shared/schema'
import { useToggle } from '@vueuse/core'

const props = defineProps<{
  data: UpdateRuleSchema
}>()

const [isOpen, modalToggle] = useToggle()
const { update, isUpdating } = useRuleQuery()

const state = reactive<UpdateRuleSchema>(props.data)

const validate = createFormValidator(updateRuleSchema)

function handleSubmit(data: UpdateRuleSchema) {
  update(data).then(() => modalToggle(false))
}
</script>

<template>
  <UModal v-model:open="isOpen" title="修改规则">
    <template #body>
      <UForm :state="state" :validate="validate" class="gap-3 grid" @submit="(event) => handleSubmit(event.data)">
        <UFormField label="规则" name="value">
          <UInput v-model="state.value" class="w-full" />
        </UFormField>

        <UFormField label="备注" name="value">
          <UInput v-model="state.remark" class="w-full" />
        </UFormField>

        <UButton type="submit" class="w-full !justify-center" :loading="isUpdating">
          提交
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>

<style>

</style>
