import { CSSProperties } from 'vue'

export interface ScrollingListChartData {
  value: number | ScrollingListChartData[]
  label: string
  barStyle?: Record<string, unknown>
  valueStyle?: CSSProperties
  labelStyle?: CSSProperties
}
