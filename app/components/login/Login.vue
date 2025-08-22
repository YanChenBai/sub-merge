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
  <div class="p-10 absolute top-0 left-0 w-screen flex justify-center">
    <UCard class="sm:w-xl h-fit">
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
