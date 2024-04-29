import { UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'
import { isBoolean } from '@hongluan-ui/utils'
import { panelProps } from '@hongluan-ui/components/panel'
import { dialogContentProps } from './dialog-content'

import type { ExtractPropTypes, PropType } from 'vue'

type DoneFn = (cancel?: boolean) => void
export type DialogBeforeCloseFn = (done: DoneFn) => void

export const dialogProps = {
  appendToBody: {
    type: Boolean,
    default: false,
  },
  beforeClose: {
    type: Function as PropType<DialogBeforeCloseFn>,
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  modal: {
    type: Boolean,
    default: true,
  },
  animationName: {
    type: String,
    default: 'slideDown',
  },
  openDelay: {
    type: Number,
    default: 0,
  },
  closeDelay: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  modalClass: {
    type: String,
  },
  zIndex: {
    type: Number,
  },
  trapFocus: {
    type: Boolean,
    default: false,
  },
  ...dialogContentProps,
  ...panelProps,
}
export type DialogProps = ExtractPropTypes<typeof dialogProps>

export const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value: boolean) => isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true,
}
export type DialogEmits = typeof dialogEmits
