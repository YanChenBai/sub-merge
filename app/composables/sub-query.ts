import type { Sub } from '#server/db'
import type { CreateSubSchema, UpdateSubSchema } from '#shared/schema'

export const useSubQuery = defineQuery(() => {
  const toast = useToast()

  const { data, isLoading, refetch, refresh } = useQuery({
    key: () => ['sub'],
    placeholderData: () => [],
    enabled: !import.meta.env.SSR,
    async query() {
      return $fetch<Sub[]>('/api/sub', {
        credentials: 'include',
      })
    },
  })

  const { mutateAsync: create, isLoading: isCreating } = useMutation({
    key: () => ['sub-create'],
    async mutation(schema: CreateSubSchema) {
      return $fetch('/api/sub/create', {
        method: 'POST',
        body: schema,
        credentials: 'include',
      })
    },

    onSuccess() {
      refetch()
      toast.add({
        title: '创建成功😎',
        color: 'success',
      })
    },

    onError() {
      toast.add({
        title: '创建失败😅',
        color: 'error',
      })
    },
  })

  const { mutateAsync: update, isLoading: isUpdating } = useMutation({
    key: () => ['sub-create'],
    async mutation(schema: UpdateSubSchema) {
      return $fetch('/api/sub/update', {
        method: 'POST',
        body: schema,
        credentials: 'include',
      })
    },

    onSuccess() {
      refetch()
      toast.add({
        title: '修改成功😎',
        color: 'success',
      })
    },

    onError() {
      toast.add({
        title: '修改失败😅',
        color: 'error',
      })
    },
  })

  const { mutateAsync: remove, isLoading: isRemoving } = useMutation({
    key: () => ['sub-remove'],
    mutation: async (id: number) => {
      return $fetch(`/api/sub/delete/${id}`, {
        credentials: 'include',
      })
    },

    onSuccess() {
      refetch()
      toast.add({
        title: '删除成功🎉',
        color: 'success',
      })
    },

    onError() {
      toast.add({
        title: '删除失败😂',
        color: 'error',
      })
    },
  })

  const { mutateAsync: refreshSub, isLoading: isRefreshingSub } = useMutation({
    key: () => ['sub-refresh'],
    mutation: async (id: number) => {
      return $fetch(`/api/sub/refresh/${id}`, {
        credentials: 'include',
      })
    },

    onSuccess() {
      toast.add({
        title: '刷新成功🎉',
        color: 'success',
      })
    },

    onError() {
      toast.add({
        title: '刷新失败😂',
        color: 'error',
      })
    },
  })

  const { mutateAsync: toggleMainSub, isLoading: isSetMainSubLoading } = useMutation({
    key: () => ['main-sub'],
    mutation: async (id: number) => {
      return $fetch(`/api/sub/toggle-main/${id}`, {
        credentials: 'include',
      })
    },

    onSuccess() {
      refetch()
      toast.add({
        title: '设置成功🎉',
        color: 'success',
      })
    },

    onError() {
      toast.add({
        title: '设置失败😂',
        color: 'error',
      })
    },
  })

  return {
    data,
    isLoading,
    isCreating,
    isUpdating,
    isRemoving,
    isRefreshingSub,
    isSetMainSubLoading,
    toggleMainSub,
    refreshSub,
    create,
    update,
    remove,
    refetch,
    refresh,
  }
})
