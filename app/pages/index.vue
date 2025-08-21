<script lang="ts" setup>
import type { Sub } from '#server/db'

useHead(() => {
  return {
    title: 'Sub Merge',
  }
})

const { data: isLogin } = useFetch('/api/validate-auth', { credentials: 'include' })
const { data: subs, refresh } = useSubQuery()

onMounted(() => {
  refresh()
})
</script>

<template>
  <div v-if="isLogin" class="grid gap-5">
    <SubTable :data="subs" />
    <!-- <RuleTable :data="rules" /> -->
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<style>

</style>
