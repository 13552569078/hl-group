import { buildProps, definePropType } from '@hongluan-ui/utils'
import { EVENT_CODE } from '@hongluan-ui/constants'
import { createCollectionWithScope } from '@hongluan-ui/components/collection'
import {
  useTooltipTriggerProps,
  useTooltipContentProps,
} from '@hongluan-ui/components/tooltip'
import type { Options } from '@popperjs/core'

import type { ComponentType } from '@hongluan-ui/constants'
import type { ButtonProps } from '@hongluan-ui/components/button'
import type { Placement } from '@hongluan-ui/components/popper'
import type { ComponentInternalInstance, ComputedRef } from 'vue'
import type { Nullable } from '@hongluan-ui/utils'

export interface IDropdownInstance {
  instance?: ComponentInternalInstance
  dropdownSize?: ComputedRef<string>
  handleClick?: () => void
  commandHandler?: (...arg: any[]) => void
  show?: () => void
  hide?: () => void
  trigger?: ComputedRef<string>
  hideOnClick?: ComputedRef<boolean>
  triggerElm?: ComputedRef<Nullable<HTMLButtonElement>>
}

export const dropdownProps = buildProps({
  trigger: useTooltipTriggerProps.trigger,
  effect: {
    ...useTooltipContentProps.effect,
    default: 'light',
  },
  popperAppendToBody: {
    type: Boolean,
    default: undefined,
  },
  teleported: useTooltipContentProps.teleported,
  type: {
    type: definePropType<ComponentType>(String),
  },
  placement: {
    type: definePropType<Placement>(String),
    default: 'bottom',
  },
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({}),
  },
  id: String,
  size: {
    type: String,
    default: '',
  },
  split: {
    type: definePropType<'button' | 'link' | ''>(String),
    default: '',
  },
  hideOnClick: {
    type: Boolean,
    default: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  showTimeout: {
    type: Number,
    default: 150,
  },
  hideTimeout: {
    type: Number,
    default: 150,
  },
  tabindex: {
    type: definePropType<number | string>([Number, String]),
    default: 0,
  },
  maxHeight: {
    type: definePropType<number | string>([Number, String]),
    default: '',
  },
  popperClass: {
    type: String,
    default: '',
  },
  popperOffset: {
    type: Number,
    default: 4,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'menu',
  },
  buttonProps: {
    type: definePropType<ButtonProps>(Object),
  },
} as const)

export const dropdownItemProps = buildProps({
  command: {
    type: [Object, String, Number],
    default: () => ({}),
  },
  disabled: Boolean,
  divider: Boolean,
  textValue: String,
} as const)

export const dropdownMenuProps = buildProps({
  onKeydown: { type: definePropType<(e: KeyboardEvent) => void>(Function) },
})

export const FIRST_KEYS = [
  EVENT_CODE.down,
  EVENT_CODE.pageDown,
  EVENT_CODE.home,
]

export const LAST_KEYS = [EVENT_CODE.up, EVENT_CODE.pageUp, EVENT_CODE.end]

export const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS]

const {
  HlCollection,
  HlCollectionItem,
  COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY,
} = createCollectionWithScope('Dropdown')

export {
  HlCollection,
  HlCollectionItem,
  COLLECTION_INJECTION_KEY as DROPDOWN_COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY as DROPDOWN_COLLECTION_ITEM_INJECTION_KEY,
}
