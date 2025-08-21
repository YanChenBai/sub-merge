import type { Rule } from '#server/db'
import type { Schema } from '../components/rule/schema'

export const useRuleQuery = defineQuery(() => {
  const toast = useToast()

  const { data, isLoading, refetch, refresh } = useQuery({
    key: () => ['rule'],
    placeholderData: () => [],
    enabled: !import.meta.env.SSR,
    async query() {
      return $fetch<Rule[]>('/api/rule', {
        credentials: 'include',
      })
    },
  })

  const { mutateAsync: create, isLoading: isCreating } = useMutation({
    key: () => ['rule-create'],
    async mutation(schema: Schema) {
      return $fetch('/api/rule/create', {
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
    key: () => ['rule-remove'],
    mutation: async (id: number) => {
      return $fetch(`/api/rule/delete/${id}`, {
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

  const { mutateAsync: setEnabled, isLoading: isSetEnabledLoading } = useMutation({
    key: () => ['rule-enabled'],
    mutation: async ({ id, value }: { id: number, value: boolean }) => {
      return $fetch(`/api/rule/enabled/${id}`, {
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
    refetch,
    refresh,
    create,
    remove,
    setEnabled,
  }
})
