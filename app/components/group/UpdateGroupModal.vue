<script lang="ts" setup>
import type { UpdateGroupSchema } from '#shared/schema'
import { updateGroupSchema } from '#shared/schema'
import { useToggle } from '@vueuse/core'

const props = defineProps<{
  data: UpdateGroupSchema
}>()

const emit = defineEmits(['close'])

const { update, isUpdating } = useGroupQuery()
const state = reactive<UpdateGroupSchema>(props.data)
const validate = createFormValidator(updateGroupSchema)

function handleSubmit(data: UpdateGroupSchema) {
  update(data).then(() => emit('close'))
}
</script>

<template>
  <UModal title="修改规则">
    <template #body>
      <UForm :state="state" :validate="validate" class="gap-3 grid" @submit="(event) => handleSubmit(event.data)">
        <UFormField label="规则" name="value">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>

        <UButton type="submit" class="w-full !justify-center" :loading="isUpdating">
          提交
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>
