import { createSharedComposable } from '@vueuse/core'
import UpdateSubModal from '~/components/sub/UpdateSubModal.vue'

export const useUpdateSub = createSharedComposable(() => {
  const overlay = useOverlay()
  const modal = overlay.create(UpdateSubModal)

  return {
    modal,
  }
})
