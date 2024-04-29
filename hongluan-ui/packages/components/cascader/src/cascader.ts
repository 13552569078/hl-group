import { CommonProps } from '@hongluan-ui/components/cascader-panel'
import { isBoolean, isValidComponentSize } from '@hongluan-ui/utils'
import { useTooltipContentProps } from '@hongluan-ui/components/tooltip'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'

import type { PropType } from 'vue'
import type {
  CascaderNode,
  CascaderValue,
} from '@hongluan-ui/components/cascader-panel'
import type { ComponentSize } from '@hongluan-ui/constants'

export const cascaderProps = {
  ...CommonProps,
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  placeholder: String,
  disabled: Boolean,
  clearable: Boolean,
  filterable: Boolean,
  filterMethod: {
    type: Function as PropType<(node: CascaderNode, keyword: string) => boolean>,
    default: (node: CascaderNode, keyword: string) => node.text.includes(keyword),
  },
  separator: {
    type: String,
    default: ' / ',
  },
  showAllLevels: {
    type: Boolean,
    default: true,
  },
  collapseTags: Boolean,
  collapseTagsTooltip: {
    type: Boolean,
    default: false,
  },
  debounce: {
    type: Number,
    default: 300,
  },
  beforeFilter: {
    type: Function as PropType<(value: string) => boolean | Promise<any>>,
    default: () => true,
  },
  popperClass: {
    type: String,
    default: '',
  },
  block: {
    type: Boolean,
    default: false,
  },
  popperAppendToBody: {
    type: Boolean,
    default: undefined,
  },
  teleported: useTooltipContentProps.teleported,
  fill: Boolean,
  popperOffset: {
    type: Number,
    default: 4,
  },
  tagType: { type: String, default: '' },
  validateEvent: {
    type: Boolean,
    default: true,
  },
}

export const cascaderEmits = {
  [UPDATE_MODEL_EVENT]: (val: CascaderValue) => !!val,
  [CHANGE_EVENT]: (val: CascaderValue) => !!val,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  visibleChange: (val: boolean) => isBoolean(val),
  expandChange: (val: CascaderValue) => !!val,
  removeTag: (val: CascaderNode['valueByOption']) => !!val,
}

// Type name is taken(cascader-panel/src/node), needs discussion
// export type CascaderProps = ExtractPropTypes<typeof cascaderProps>

export type CascaderEmits = typeof cascaderEmits
