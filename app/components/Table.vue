<script lang="ts" setup generic="T">
import type { CardSlots, TableColumn, TableOptions, TableSlots } from '@nuxt/ui'

defineProps<{
  data: T[]
  columns: TableColumn<T>[]
  tableMaxHeight?: number
  loading?: boolean
  title?: string
}>()
defineSlots<TableSlots & Omit<CardSlots, 'default'>>()
</script>

<template>
  <UCard
    class="flex-1"
    :ui="{
      root: 'hover:shadow-sm shadow-black transition-all duration-300',
      body: 'p-0 sm:p-0',
      header: 'p-3 sm:p-3',
      footer: 'p-3 sm:p-3',
    }"
  >
    <template #header>
      <div class="flex justify-between text-primary">
        <h3 class="font-black">
          {{ title }}
        </h3>
        <slot name="header" />
      </div>
    </template>
    <UTable
      class="relative overflow-auto flex-1"
      :style="{
        maxHeight: `${tableMaxHeight}rem`,
      }"
      v-bind="{
        ...$props,
        ...$attrs,
        sticky: 'header',
      }"
      :ui="{
        base: 'w-full',
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
