import type { ComponentEmit, ComponentProps } from 'vue-component-type-helpers'
import { Dialog } from '#components'

export function useDialog() {
  const overlay = useOverlay()
  const modal = overlay.create(Dialog)
  type Props = Pick<ComponentProps<typeof Dialog> & ComponentEmit<typeof Dialog>, 'title' | 'onCancel' | 'onConfirm' | 'type' | 'cancelLabel' | 'confirmLabel' | 'description'>

  const open = (props: Props) => {
    return new Promise<void>((resolve, reject) => {
      modal.open({
        ...props,
        onCancel() {
          props.onCancel?.()
          reject(new Error('Canceled'))
        },
        onConfirm() {
          props.onConfirm?.()
          resolve()
        },
      })
    })
  }

  const primary = (title: string, description = '') => {
    return open({
      type: 'primary',
      title,
      description,
      confirmLabel: '确定',
      cancelLabel: '关闭',
    })
  }

  const success = (title: string, description = '') => {
    return open({
      type: 'success',
      title,
      description,
      confirmLabel: '确定',
      cancelLabel: '关闭',
    })
  }

  const info = (title: string, description = '') => {
    return open({
      type: 'info',
      title,
      description,
      confirmLabel: '确定',
      cancelLabel: '关闭',
    })
  }

  const warning = (title: string, description = '') => {
    return open({
      type: 'warning',
      title,
      description,
      confirmLabel: '取消',
      cancelLabel: '关闭',
    })
  }

  const error = (title: string, description = '') => {
    return open({
      type: 'error',
      title,
      description,
      confirmLabel: '确定',
      cancelLabel: '关闭',
    })
  }

  return {
    open,
    primary,
    success,
    info,
    warning,
    error,
  }
}
