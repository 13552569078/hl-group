export interface LineSeriesDataItem {
  label: string
  key: string
  // series-line.itemStyle
  itemStyle?: {
    color?: any
  }
  areaStyleColor?: string[]
}

export interface LineChartDataItem {
  xValue: string // x轴数据
  [key: string]: string | number // y轴数据，key为LegendItem.key的值
}
