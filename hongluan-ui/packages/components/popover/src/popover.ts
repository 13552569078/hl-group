import { buildProps, definePropType, isBoolean } from '@hongluan-ui/utils'
import {
  useTooltipContentProps,
  useTooltipTriggerProps,
} from '@hongluan-ui/components/tooltip'
import type { Arrayable } from '@hongluan-ui/utils'
import { dropdownProps } from '@hongluan-ui/components/dropdown'

import type { TooltipTriggerType } from '@hongluan-ui/components/tooltip'
import type { ExtractPropTypes, PropType } from 'vue'
import type Popover from './popover.vue'

export const popoverProps = buildProps({
  trigger: {
    type: definePropType<Arrayable<TooltipTriggerType>>([String, Array]),
    default: 'click',
  },
  triggerKeys: useTooltipTriggerProps.triggerKeys,
  placement: dropdownProps.placement,
  disabled: useTooltipTriggerProps.disabled,
  visible: useTooltipContentProps.visible,
  transition: useTooltipContentProps.transition,
  popperOptions: dropdownProps.popperOptions,
  tabindex: dropdownProps.tabindex,
  appendToBody: { type: Boolean, default: undefined },
  content: useTooltipContentProps.content,
  popperStyle: useTooltipContentProps.popperStyle,
  popperClass: useTooltipContentProps.popperClass,
  outsideIgnore: useTooltipContentProps.outsideIgnore,
  enterable: {
    ...useTooltipContentProps.enterable,
    default: true,
  },
  effect: {
    ...useTooltipContentProps.effect,
    default: 'light',
  },
  teleported: useTooltipContentProps.teleported,
  title: String,

  width: {
    type: [String, Number],
  },
  offset: {
    type: Number,
    default: undefined,
  },
  showAfter: {
    type: Number,
    default: 0,
  },
  hideAfter: {
    type: Number,
    default: 200,
  },
  autoClose: {
    type: Number,
    default: 0,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
  persistent: {
    type: Boolean,
    default: true,
  },
  tooltip: {
    type: Boolean,
    default: false,
  },
  'onUpdate:visible': {
    type: Function as PropType<(visible: boolean) => void>,
  },
} as const)
export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export const popoverEmits = {
  'update:visible': (value: boolean) => isBoolean(value),
  'before-enter': () => true,
  'before-leave': () => true,
  'after-enter': () => true,
  'after-leave': () => true,
}
export type PopoverEmits = typeof popoverEmits

export type PopoverInstance = InstanceType<typeof Popover>
