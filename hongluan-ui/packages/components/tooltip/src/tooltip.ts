import { buildProps } from '@hongluan-ui/utils'
import { createModelToggleComposable } from '@hongluan-ui/hooks'
import { popperArrowProps, popperProps } from '@hongluan-ui/components/popper'
import { useTooltipContentProps } from './content'
import { useTooltipTriggerProps } from './trigger'
import type Tooltip from './tooltip.vue'

import type { ExtractPropTypes } from 'vue'

export const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle,
} = createModelToggleComposable('visible' as const)


export const useTooltipProps = buildProps({
  ...popperProps,
  ...useTooltipModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps,
  ...popperArrowProps,
  showArrow: {
    type: Boolean,
    default: true,
  },
})

export const tooltipEmits = [
  ...useTooltipModelToggleEmits,
  'before-show',
  'before-hide',
  'show',
  'hide',
  'open',
  'close',
]

export type TooltipProps = ExtractPropTypes<typeof useTooltipProps>
export type TooltipInstance = InstanceType<typeof Tooltip>
