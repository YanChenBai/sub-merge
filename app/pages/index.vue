<script lang="ts" setup>
import type { Sub } from '#server/db'

useHead(() => {
  return {
    title: 'Sub Merge',
  }
})

const { data: isLogin } = useFetch('/api/validate-auth', { credentials: 'include' })
const { data: subs } = useQuery({
  key: () => ['sub'],
  initialData: () => [],
  query() {
    return $fetch<Sub[]>('/api/sub', { credentials: 'include' })
  },
})

const { data: rules } = useQuery({
  key: () => ['sub'],
  initialData: () => [],
  query() {
    return $fetch('/api/rule', { credentials: 'include' }).then(res => resultFlatten(res))
  },
})
</script>

<template>
  {{ isLogin }}
  <SubTable :data="subs" />
</template>

<style>

</style>
