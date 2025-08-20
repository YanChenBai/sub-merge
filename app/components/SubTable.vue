<script lang="ts" setup>
import type { Sub } from '#server/db'
import type { TableColumn } from '@nuxt/ui'

defineProps<{
  data: Sub[]
}>()

const columns: TableColumn<Sub>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: '名称',
  },
  {
    accessorKey: 'url',
    header: 'URL',
  },
  {
    id: 'action',
  },
] as const
</script>

<template>
  <Table :data="data" :columns="columns">
    <template #header>
      123
    </template>
    <template #footer>
      123
    </template>
  </Table>
</template>

<style>

</style>
