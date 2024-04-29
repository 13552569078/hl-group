import { isString } from '@vue/shared'
import { UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'
import { isValidComponentSize, isValidComponentType } from '@hongluan-ui/utils'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize, ComponentType } from '@hongluan-ui/constants'
import type Input from './input.vue'

export type InputAutoSize = { minRows?: number; maxRows?: number; } | boolean

export const inputProps = {
  /**
   * @description native input id
   */
  id: {
    type: String,
    default: undefined,
  },
  /**
   * @description binding value
   */
  modelValue: {
    type: [String, Number, Object] as PropType<string | number | null | undefined>,
    default: '',
  },
  nativeType: {
    type: String,
    default: 'text',
  },
  /**
   * @description input box size
   */
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  /**
   * @description control the resizability
   */
  resize: {
    type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>,
    validator: (val: string) => ['none', 'both', 'horizontal', 'vertical'].includes(val),
  },
  rows: {
    type: Number,
    default: 3,
  },
  /**
   * @description whether textarea has an adaptive height
   */
  autosize: {
    type: [Boolean, Object] as PropType<InputAutoSize>,
    default: false as InputAutoSize,
  },
  /**
   * @description native input autocomplete
   */
  autocomplete: {
    type: String,
    default: 'off',
  },
  /**
   * @description type of input
   */
  type: {
    type: String as PropType<ComponentType>,
    validator: isValidComponentType,
  },
  /**
   * @description format content
   */
  formatter: {
    type: Function,
  },
  /**
   * @description parse content
   */
  parser: {
    type: Function,
  },
  /**
   * @description placeholder
   */
  placeholder: {
    type: String,
  },
  /**
   * @description native input form
   */
  form: {
    type: String,
  },
  /**
   * @description whether to disable
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description native input readonly
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * @description native input readonly
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description toggleable password input
   */
  showPassword: {
    type: Boolean,
    default: false,
  },
  /**
   * @description word count
   */
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  /**
   * @description native input aria-label
   */
  label: {
    type: String,
    default: undefined,
  },
  /**
   * @description container role, internal properties provided for use by the picker component
   */
  containerRole: {
    type: String,
    default: undefined,
  },
  /**
   * @description input tabindex
   */
  tabindex: {
    type: [String, Number],
    default: 0,
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  round: {
    type: Boolean,
    default: false,
  },
  fill: {
    type: Boolean,
    default: false,
  },
  thin: {
    type: Boolean,
    default: false,
  },
  /**
   * @description input or texearea element style
   */
  inputStyle: {
    type: Object,
    default: () => ({}),
  },
}
export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  // NOTE: when autofill by browser, the keydown event is instanceof Event, not KeyboardEvent
  // relative bug report https://github.com/element-plus/element-plus/issues/6665
  keydown: (evt: KeyboardEvent | Event) => evt instanceof Event,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
}
export type InputEmits = typeof inputEmits
export type InputInstance = InstanceType<typeof Input>
