import { buildProps } from '@hongluan-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type Link from './link.vue'

export const linkProps = buildProps({
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', ''],
    default: '',
  },
  underline: {
    type: [Boolean, String],
    default: false,
  },
  disabled: { type: Boolean, default: false },
  href: { type: String, default: '' },
} as const)
export type LinkProps = ExtractPropTypes<typeof linkProps>

export const linkEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type LinkEmits = typeof linkEmits

export type LinkInstance = InstanceType<typeof Link>
