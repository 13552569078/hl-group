import { UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'
import { isArray } from '@hongluan-ui/utils'
import { groupProps } from '@hongluan-ui/components/group'

import type { ExtractPropTypes, PropType } from 'vue'
import type checkboxGroup from './checkbox-group.vue'
import type { CheckboxValueType } from './checkbox'

export type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[]

export const checkboxGroupProps = {
  /**
   * @description binding value
   */
  modelValue: {
    type: Array as PropType<CheckboxGroupValueType>,
    default: () => [],
  },
  bold: Boolean,
  custom: Boolean,
  round: Boolean,
  /**
   * @description minimum number of checkbox checked
   */
  min: {
    type: Number,
    default: undefined,
  },
  /**
   * @description maximum number of checkbox checked
   */
  max: {
    type: Number,
    default: undefined,
  },
  ...groupProps,
  id: {
    type: String,
    default: undefined,
  },
  /**
   * @description label for screen reader
   */
  label: {
    type: String,
    default: undefined,
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
}

export const checkboxGroupEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxGroupValueType) => isArray(val),
  change: (val: CheckboxValueType[]) => isArray(val),
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkboxGroupEmits
export type CheckboxGroupInstance = InstanceType<typeof checkboxGroup>
