import { NOOP } from '@vue/shared'
import {
  isString,
  isObject,
  isValidComponentSize,
} from '@hongluan-ui/utils'
import { useTooltipContentProps } from '@hongluan-ui/components/tooltip'
import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'

import type { ExtractPropTypes, PropType } from 'vue'
import type { Awaitable } from '@hongluan-ui/utils'
import type { Placement } from '@hongluan-ui/components/popper'
import type { ComponentSize } from '@hongluan-ui/constants'
import type Autocomplete from './autocomplete.vue'

export type AutocompleteData = Record<string, any>[]

export type AutocompleteFetchSuggestionsCallback = (
  data: AutocompleteData
) => void
export type AutocompleteFetchSuggestions =
  | ((
    queryString: string,
    cb: AutocompleteFetchSuggestionsCallback
  ) => Awaitable<AutocompleteData> | void)
  | AutocompleteData

export const autocompleteProps = {
  valueKey: {
    type: String,
    default: 'value',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  debounce: {
    type: Number,
    default: 300,
  },
  placement: {
    type: String as PropType<Placement>,
    validator: (val: string): boolean => {
      return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'].includes(val)
    },
    default: 'bottom-start',
  },
  fetchSuggestions: {
    type: [Function, Array] as PropType<AutocompleteFetchSuggestions>,
    default: NOOP,
  },
  popperClass: {
    type: String,
    default: '',
  },
  triggerOnFocus: {
    type: Boolean,
    default: true,
  },
  selectWhenUnmatched: {
    type: Boolean,
    default: false,
  },
  hideLoading: {
    type: Boolean,
    default: false,
  },
  popperAppendToBody: {
    type: Boolean,
    default: undefined,
  },
  label: {
    type: String,
  },
  teleported: useTooltipContentProps.teleported,
  highlightFirstItem: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  disabled: Boolean,
  fill: Boolean,
  thin: Boolean,
  popperOffset: {
    type: Number,
    default: 4,
  },
  fitInputWidth: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: String,
    default: 'dropdown',
  },
}

export const autocompleteEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  [INPUT_EVENT]: (value: string) => isString(value),
  [CHANGE_EVENT]: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  select: (item: Record<string, any>) => isObject(item),
}

export type AutocompleteProps = ExtractPropTypes<typeof autocompleteProps>
export type AutocompleteEmits = typeof autocompleteEmits
export type AutocompleteInstance = InstanceType<typeof Autocomplete>
