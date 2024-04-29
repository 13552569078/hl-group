export interface PieChartData {
  label: string
  value: number
  isHide?: boolean
  color: string
  labelLine?: {
    show: boolean
    lineStyle: {
      color: string
    }
  }
  itemStyle?: { color: string; }
}
