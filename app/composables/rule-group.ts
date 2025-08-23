import type { Group } from '#server/db'
import type { CreateGroupSchema, UpdateGroupSchema } from '#shared/schema'

export const useGroupQuery = defineQuery(() => {
  const toast = useToast()

  const { data, isLoading, refetch, refresh } = useQuery({
    key: () => ['group'],
    placeholderData: () => [],
    enabled: !import.meta.env.SSR,
    async query() {
      return $fetch<Group[]>('/api/group', {
        credentials: 'include',
      })
    },
  })

  const { mutateAsync: create, isLoading: isCreating } = useMutation({
    key: () => ['group-create'],
    async mutation(schema: CreateGroupSchema) {
      return $fetch('/api/group/create', {
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

  const { mutateAsync: remove, isLoading: isRemoving } = useMutation({
    key: () => ['group-remove'],
    mutation: async (id: number) => {
      return $fetch(`/api/group/delete/${id}`, {
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

  const { mutateAsync: update, isLoading: isUpdating } = useMutation({
    key: () => ['group-enabled'],
    mutation: async (data: UpdateGroupSchema) => {
      return $fetch(`/api/group/update`, {
        credentials: 'include',
        method: 'POST',
        body: data,
      })
    },

    onSuccess() {
      refetch()
      toast.add({
        title: '更新成功🎉',
        color: 'success',
      })
    },

    onError() {
      toast.add({
        title: '更新失败😂',
        color: 'error',
      })
    },
  })

  const { mutateAsync: setEnabled, isLoading: isSetEnabledLoading } = useMutation({
    key: () => ['group-enabled'],
    mutation: async ({ id, value }: { id: number, value: boolean }) => {
      return $fetch(`/api/group/enabled/${id}`, {
        credentials: 'include',
        method: 'POST',
        body: {
          enabled: value,
        },
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

  const { mutateAsync: updateInsertProxies } = useMutation({
    key: () => ['group-enabled'],
    mutation: async ({ id, value }: { id: number, value: boolean }) => {
      return $fetch(`/api/group/insert-proxies/${id}`, {
        credentials: 'include',
        method: 'POST',
        body: {
          enabled: value,
        },
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
    isRemoving,
    isSetEnabledLoading,
    isUpdating,
    refetch,
    refresh,
    create,
    remove,
    setEnabled,
    update,
    updateInsertProxies,
  }
})
