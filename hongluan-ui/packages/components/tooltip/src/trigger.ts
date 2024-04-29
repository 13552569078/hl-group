import { buildProps, definePropType } from '@hongluan-ui/utils'
import { popperTriggerProps } from '@hongluan-ui/components/popper'
import { EVENT_CODE } from '@hongluan-ui/constants'
import type { Arrayable } from '@hongluan-ui/utils'
import type { ExtractPropTypes } from 'vue'

export type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu'

export const useTooltipTriggerProps = buildProps({
  ...popperTriggerProps,
  disabled: Boolean,
  trigger: {
    type: definePropType<Arrayable<TooltipTriggerType>>([String, Array]),
    default: 'hover',
  },
  triggerKeys: {
    type: definePropType<string[]>(Array),
    default: () => [EVENT_CODE.enter, EVENT_CODE.space],
  },
} as const)

export type TooltipTriggerProps = ExtractPropTypes<
  typeof useTooltipTriggerProps
>
