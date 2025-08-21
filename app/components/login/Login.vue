<script setup lang="ts">
import type { Schema } from './schema'
import { schema } from './schema'

const { login, isLoading } = useLogin()

const state = reactive<Schema>({
  token: '',
})

const validate = createFormValidator(schema)

function handleSubmit(data: Schema) {
  login(data)
}
</script>

<template>
  <div class="sm:w-2xl m-auto py-10">
    <UCard>
      <template #header>
        <h2>登录</h2>
      </template>
      <UForm :state="state" :validate="validate" class="gap-3 grid" @submit="(event) => handleSubmit(event.data)">
        <UFormField name="token">
          <UInput v-model="state.token" class="w-full" placeholder="Please enter your token" />
        </UFormField>

        <UButton type="submit" class="w-full !justify-center" :loading="isLoading">
          登录
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>
