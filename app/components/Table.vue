<script lang="ts" setup generic="T">
import type { CardSlots, TableColumn, TableOptions, TableSlots } from '@nuxt/ui'

defineProps<{
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
}>()
defineSlots<TableSlots & Omit<CardSlots, 'default'>>()
</script>

<template>
  <UCard :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <slot name="header" />
    </template>
    <UTable
      v-bind="{ ...$props, ...$attrs }"
      :ui="{
        base: '',
        tr: 'border-0',
        separator: 'bg-muted',
        th: 'sticky top-0 inset-x-0 bg-default/75 z-[1] backdrop-blur text-xs',
      }"
    />
    <template #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>
