import { CSSProperties } from 'vue'

export interface ScrollingBarChartData {
  value: number | ScrollingBarChartData[]
  label: string
  barStyle?: Record<string, unknown>
  valueStyle?: CSSProperties
  labelStyle?: CSSProperties
}
