<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui'

const items: TabsItem[] = [
  {
    label: '订阅记录',
    icon: 'fontisto:email',
    slot: 'sub',
  },
  {
    label: '规则记录',
    icon: 'mynaui:ruler',
    slot: 'rule',
  },
]
useHead(() => {
  return {
    title: 'Sub Merge',
  }
})

const { data: isLogin, isLoading } = useQuery({
  key: () => ['isLogin'],
  query: async () => {
    return $fetch('/api/validate-auth', { credentials: 'include' })
  },
})
</script>

<template>
  <Transition v-if="!isLoading">
    <template v-if="isLogin">
      <UTabs :items="items" class="w-full">
        <template #sub>
          <SubTable />
        </template>
        <template #rule>
          <RuleTable />
        </template>
      </UTabs>
    </template>
    <template v-else>
      <Login />
    </template>
  </Transition>
</template>

<style scoped>
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  position: absolute;
  top: 0;
}
</style>
