<script lang="ts" setup>
import type { Sub } from '#server/db'

useHead(() => {
  return {
    title: 'Sub Merge',
  }
})

const { data: isLogin } = useFetch('/api/validate-auth', { credentials: 'include' })
// const { data: subs } = useQuery({
//   key: () => ['sub'],
//   initialData: () => [],
//   async query() {
//     return $fetch<Sub[]>('/api/sub', { credentials: 'include' })
//   },
// })

// const { data: rules } = useQuery({
//   key: () => ['rule'],
//   initialData: () => [],
//   async query() {
//     return $fetch('/api/rule', { credentials: 'include' }).then(res => resultFlatten(res))
//   },
// })

const subs = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `Name${i + 1}`,
  url: `https://example.com/${i + 1}`,
  content: null,
  main: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}))

const rules = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  enabled: true,
  value: `Value${i + 1}`,
  createdAt: new Date(),
  updatedAt: new Date(),
}))
</script>

<template>
  <div class="grid gap-5">
    <SubTable :data="subs" />
    <RuleTable :data="rules" />
  </div>
</template>

<style>

</style>
