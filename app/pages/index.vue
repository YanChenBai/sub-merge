<script lang="ts" setup>
const { data, error } = useFetch('/api/validate-auth', { credentials: 'include' })

const title = 'Sub Merge'

useHead(() => {
  return {
    title,
  }
})

function createSub(name: string, url: string) {
  return {
    name,
    url,
  }
}
</script>

<template>
  <UContainer class="p-2">
    <div class="flex justify-between items-end pt-6 pb-2">
      <h1 class="font-black text-2xl">
        {{ title }}
      </h1>

      <div class="flex gap-2">
        <UButton variant="outline">
          更新全部
        </UButton>
        <UButton>
          添加
        </UButton>
      </div>
    </div>

    <USeparator type="dashed" class="mb-5" />

    <div class="grid gap-4">
      <UCard v-for="value in 10" :key="value">
        <div class="text-ellipsis overflow-hidden opacity-80">
          111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        </div>

        <template #footer>
          <div class="flex gap-2 justify-end">
            <UButton variant="soft">
              设置为主订阅
            </UButton>
            <UButton variant="soft" color="info">
              更新
            </UButton>
            <UButton color="error" variant="soft">
              删除
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>

<style>

</style>
