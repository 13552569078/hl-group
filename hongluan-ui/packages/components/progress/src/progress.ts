
import type { SVGAttributes, ExtractPropTypes, PropType } from 'vue'

export type ProgressFuncType = (percentage: number) => string
export type StackType = {
  percentage: number
  type: string
  striped: boolean
  indicating: boolean
  active: boolean
  format: ProgressFuncType
}
export type ProgressColor = string | Array<string | { color: string; percentage: number; }> | ProgressFuncType
export interface IProgressProps {
  percentage?: number
  type?: string
  format: ProgressFuncType
  striped: boolean
  active: boolean
  indicating: boolean
  showText: boolean
  showAs: string
  stack: StackType[]
  text: string
  strokeWidth: string
  trackColor: string
  strokeLinecap: NonNullable<SVGAttributes['stroke-linecap']>
  width?: number
  color: ProgressColor
  align: string
}

export const progressProps = {
  percentage: {
    type: Number,
    default: 0,
    validator: (val: number): boolean => val >= 0 && val <= 100,
  },
  type: String,
  format: {
    type: Function as PropType<ProgressFuncType>,
    default: (percentage: number): string => `${percentage}%`,
  },
  striped: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  indicating: {
    type: Boolean,
    default: false,
  },
  showText: {
    type: Boolean,
    default: true,
  },
  round: Boolean,
  showAs: {
    type: String,
    default: '',
    validator: (val: string): boolean => ['', 'line', 'stack', 'circle', 'dashboard'].indexOf(val) > -1,
  },
  stack: {
    type: Array as PropType<StackType[]>,
    default: () => [],
    validator: (val: Array<{ percentage: number; }>): boolean => {
      let invalid = false,
        sum = 0
      val.forEach(n => {
        if (n.percentage < 0 || n.percentage > 100) {
          invalid = true
        }
        sum += n.percentage
      })
      if (sum > 100) {
        invalid = true
      }
      return !invalid
    },
  },
  text: {
    type: String,
    default: '',
  },
  strokeWidth: {
    type: String,
  },
  trackColor: {
    type: String,
  },
  strokeLinecap: {
    type: String as PropType<IProgressProps['strokeLinecap']>,
    default: 'round' as IProgressProps['strokeLinecap'],
  },
  color: {
    type: [String, Array, Function] as PropType<ProgressColor>,
    default: '',
  },
  align: {
    type: String,
  },
}

export type ProgressProps = ExtractPropTypes<typeof progressProps>
