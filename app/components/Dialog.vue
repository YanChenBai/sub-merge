<script lang="ts" setup>
import { UModal } from '#components'
import {
  DialogContent,
} from 'reka-ui'

type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'

defineProps({
  type: {
    type: String as () => Color,
    default: 'primary',
  },
  title: {
    type: String,
    default: '提示',
  },
  description: {
    type: String,
    default: '',
  },
  confirmLabel: {
    type: String,
    default: '确认',
  },
  cancelLabel: {
    type: String,
    default: '取消',
  },
})

const emit = defineEmits(['confirm', 'cancel'])

const open = defineModel<boolean>('open', { default: false })

function handleConfirm() {
  emit('confirm')
  open.value = false
}

function handleCancel() {
  emit('cancel')
  open.value = false
}
</script>

<template>
  <UModal
    :close="true"
    :title="title"
    :open="open"
    :ui="{
      footer: 'justify-end',
      header: 'justify-between',
    }"
  >
    <template #header>
      <h2 class="text-highlighted font-semibold">
        {{ title }}
      </h2>

      <UButton icon="ion:close" variant="ghost" color="neutral" @click="handleCancel" />
    </template>
    <template v-if="description" #body>
      {{ description }}
    </template>
    <template #footer>
      <UButton variant="soft" color="neutral" @click="handleCancel">
        {{ cancelLabel }}
      </UButton>
      <UButton :color="type" @click="handleConfirm">
        {{ confirmLabel }}
      </UButton>
    </template>
  </UModal>
</template>

<style>

</style>
