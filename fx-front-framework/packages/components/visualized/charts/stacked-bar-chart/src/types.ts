export interface StackBarLegendItem {
  label: string
  key: string
  barWidth?: number
  // series-line.itemStyle
  itemStyle?: {
    color?: any
  }
}

export interface StackBarChartDataItem {
  xValue: string // x轴数据
  [key: string]: string | number // y轴数据，key为LegendItem.key的值
}
