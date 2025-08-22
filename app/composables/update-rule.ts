import { createSharedComposable } from '@vueuse/core'
import UpdateRuleModal from '~/components/rule/UpdateRuleModal.vue'

export const useUpdateRule = createSharedComposable(() => {
  const overlay = useOverlay()
  const modal = overlay.create(UpdateRuleModal)

  return {
    modal,
  }
})
