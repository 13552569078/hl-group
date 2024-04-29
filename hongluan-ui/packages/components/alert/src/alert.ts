import type { MessageIconType } from '@hongluan-ui/constants'
import type { ExtractPropTypes, PropType } from 'vue'

export type AlertEffect = 'light' | 'dark'

export const alertProps = {
  /**
   * @description alert title.
   */
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  /**
   * @description alert type.
   */
  type: {
    type: String as PropType<MessageIconType>,
    default: '',
  },
  /**
   * @description whether alert can be dismissed.
   */
  closable: {
    type: Boolean,
    default: true,
  },
  closeText: {
    type: String,
    default: '',
  },
  /**
   * @description whether show icon
   */
  showIcon: Boolean,
  dashed: Boolean,
  effect: {
    type: String as PropType<AlertEffect>,
    default: '',
  },
}

export const alertEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type AlertProps = ExtractPropTypes<typeof alertProps>
export type AlertEmits = typeof alertEmits
