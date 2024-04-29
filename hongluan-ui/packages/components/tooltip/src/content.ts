import { buildProps, definePropType } from '@hongluan-ui/utils'
import { popperContentProps } from '@hongluan-ui/components/popper'
import {
  useDelayedToggleProps,
} from '@hongluan-ui/hooks'
import type { ExtractPropTypes } from 'vue'
import type { MaybeElementRef } from '@vueuse/core'

export const useTooltipContentProps = buildProps({
  ...useDelayedToggleProps,
  ...popperContentProps,
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
  },
  content: {
    type: String,
    default: '',
  },
  rawContent: {
    type: Boolean,
    default: false,
  },
  persistent: Boolean,
  ariaLabel: String,
  // because model toggle prop is generated dynamically
  // so the typing cannot be evaluated by typescript as type:
  // [name]: { type: Boolean, default: null }
  // so we need to declare that again for type checking.
  visible: {
    type: definePropType<boolean | null>(Boolean),
    default: null,
  },
  transition: {
    type: String,
    default: 'fade',
  },
  teleported: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
  },
  outsideIgnore: {
    type: definePropType<MaybeElementRef[]>(Array),
    default: () => [],
  },
} as const)

export type TooltipContentProps = ExtractPropTypes<
  typeof useTooltipContentProps
>
