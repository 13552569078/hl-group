import type { PropType } from 'vue'

export type DialogShowAs = 'dialog' | 'drawer'
export type DialogPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center' | 'fullscreen'

export const dialogContentProps = {
  showAs: {
    type: String as PropType<DialogShowAs>,
    default: 'dialog',
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  customClass: {
    type: String,
    default: '',
  },
  placement: {
    type: String as PropType<DialogPlacement>,
    default: 'center',
  },
  top: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  height: {
    type: String,
  },
  width: {
    type: String,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
}
