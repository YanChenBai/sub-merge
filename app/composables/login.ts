import type { Schema } from '~~/app/components/login/schema'

export const useLogin = defineQuery(() => {
  const toast = useToast()

  const { mutateAsync: login, isLoading } = useMutation({
    async mutation(schema: Schema) {
      return $fetch('/api/auth', {
        method: 'POST',
        body: schema,
        credentials: 'include',
      })
    },

    onSuccess() {
      toast.add({
        title: '登录成功😎',
        color: 'success',
      })
      window.location.reload()
    },

    onError() {
      toast.add({
        title: '登录失败😅',
        color: 'error',
      })
    },
  })

  return {
    login,
    isLoading,
  }
})
