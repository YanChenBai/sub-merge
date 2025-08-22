<script setup lang="ts">
import type { LoginSchema } from '#shared/schema'
import { loginSchema } from '#shared/schema'

const { login, isLoading } = useLogin()

const state = reactive<LoginSchema>({
  token: '',
})

const validate = createFormValidator(loginSchema)

function handleSubmit(data: LoginSchema) {
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
