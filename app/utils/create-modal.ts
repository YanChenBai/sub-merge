import { createSharedComposable } from '@vueuse/core'

export function createModal<T extends Component>(component: T) {
  return createSharedComposable(() => {
    const overlay = useOverlay()

    const modal = overlay.create(component)

    return {
      open(props: Parameters<typeof modal.open>[number]) {
        if (!props)
          return modal.open()

        return modal.open({
          ...props,
          onClose() {
            modal.close()
            props?.onClose?.()
          },
        })
      },
      close: modal.close,
    }
  })
}
