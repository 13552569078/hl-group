# Chart 大屏图表（柱状，线，饼等）

## 折线图

:::demo-fs-dark

v-chart/line-chart

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| seriesData         | 类目及series配置                   | array<{label: string; key: string; itemStyle: object (详情参考echarts的series-line.itemStyle) }>  | -                          | -      |
| chartData         | 数据                   | array<{xValue: string（x轴数据）; [key: string]: string \| number （y轴数据，key为legend的key的值） }>  | -                          | -      |
| x-axis   | x轴设置，参见echarts文档                   | object  | -     |  -     |
| y-axis   | y轴设置，参见echarts文档                   | object  | -     |  -     |
| grid   | 直角坐标系内绘图网格设置，参见echarts文档                   | object  | -     |  { top: '20', left: '0', right: '0', bottom: '40', containLabel: true }    |
| legend   | 图例组件设置，参见echarts文档               | object  | -     |  -     |
| tooltip   | 提示框组件设置，参见echarts文档               | object  | -     |  -     |
| dataZoom   | 用于区域缩放，参见echarts文档               | array  | -     |  -     |

## 柱状图

:::demo-fs-dark

v-chart/column-chart

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| chartData         | 数据                   | array<{label: string; value: number}>  | -                          | -      |
| bar-width   | 宽度                    | number  | -     | 16     |
| bar-color   | 颜色                    | string / array  | -     |  ['#2EF4FF', 'rgba(44,218,249,0.17)']     |
| background-color   | 背景色                   | string  | -     |  'rgba(56,75,103,0.16)'     |
| scroll-count   | 每次滚动个数                   | number  | -     |  4     |
| show-count   | 显示个数                   | number  | -     |  Number.MAX_SAFE_INTEGER     |
| interval   | 滚动间隔时间，单位毫秒                   | number  | -     |  5000     |
| x-axis   | x轴设置，参见echarts文档                   | object  | -     |  -     |
| y-axis   | y轴设置，参见echarts文档                   | object  | -     |  -     |
| tooltip   | 提示框组件设置，参见echarts文档               | object  | -     |  -     |

## 饼状图

:::demo-fs-dark

v-chart/pie-chart

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| chartData         | 数据                   | array<{label: string; value: number; color: string}>  | -                          | -      |
| legend   | legend配置                    | object{gap: string}  | -     | {gap: 'var(--sm)'}     |
| radius   | 环大小                    | string[]  | -     | ['20%', '70%']     |
| title   | 标题，在饼图中心显示                    | string  | -     |  -     |
| fullTitle   | 标题，完全自定义；参见echarts文档 title                   | object  | -     |  -     |
| show-label   | 是否显示右侧legend                   | boolean  | -     |  true     |
| tooltip   | 提示框组件设置，参见echarts文档               | object  | -     |  -     |

## Rose饼状图

:::demo-fs-dark

v-chart/rose-pie-chart

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| chartData         | 数据                   | array<{label: string; value: number; color: string}>  | -                          | -      |
| legend   | legend配置                    | object{gap: string}  | -     | {gap: 'var(--sm)'}     |
| title   | 标题，在饼图中心显示                    | string  | -     |  -     |
| show-label   | 是否显示右侧legend                   | boolean  | -     |  true     |
| tooltip   | 提示框组件设置，参见echarts文档               | object  | -     |  -     |

## 百分比饼状图

:::demo-fs-dark

v-chart/proportion-pie-chart

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| chartData         | 数据                   | array<{label: string; value: number; color?: string;}>  |  color默认#1D2B3E      | -      |
| activeColor       | click时圆环颜色          | string | -                                            | rgba(113, 248, 252) |
| label1       | 外圈字体样式          | Object | -                                            | {} |
| label2       | 内圈字体样式          | Object | -                                            | {} |

## 横向滚动柱状图

:::demo-fs-dark

v-chart/scrolling-bar-chart

:::

:::demo-fs-dark

v-chart/scrolling-stack-bar-chart

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| chartData         | 数据                   | array<{label: string; value: number; color: string}>  | -                          | -      |
| title   | 标题，在饼图中心显示                    | string  | -     |  -     |
| show-label   | 是否显示右侧legend                   | boolean  | -     |  true     |
| label-formatter   | 标签自定义函数                   | (label: string) => string  | -     |  -     |
| value-formatter   | 值自定义函数                   | (value: number) => string  | -     |  -     |
| label-click   | label 点击事件，参数为当前点击的数据对象（如 {value: 55, label: '河流湖泊'}）                   | (barItem: Object) => void  | -     |  -     |

## 横向滚动柱状图(自定义label)

:::demo-fs-dark

v-chart/scrolling-list-chart

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| chartData         | 数据                   | array<{label: string; value: number; color: string}>  | -                          | -      |
| title   | 标题，在饼图中心显示                    | string  | -     |  -     |
| show-label   | 是否显示右侧legend                   | boolean  | -     |  true     |
| label-formatter   | 标签自定义函数                   | (label: string) => string  | -     |  -     |
| value-formatter   | 值自定义函数                   | (value: number) => string  | -     |  -     |

## 堆叠柱状图

:::demo-fs-dark

v-chart/stacked-bar-chart

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| legend         | 类目配置                   | array<{label: string; key: string; barWidth: number; itemStyle: object (详情参考echarts的series-line.itemStyle) }>  | -                          | -      |
| chartData         | 数据                   | array<{xValue: string（x轴数据）; [key: string]: string \| number （y轴数据，key为legend的key的值） }>  | -                          | -      |
| x-axis   | x轴设置，参见echarts文档                   | object  | -     |  -     |
| y-axis   | y轴设置，参见echarts文档                   | object  | -     |  -     |
| dataZoom   | 用于区域缩放，参见echarts文档               | array  | -     |  -     |


## 渐变象形柱图

:::demo-fs-dark

v-chart/spire-column-chart

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| chartData         | 数据                   | array<{label: string; value: number; color: string[]}>  | -                          | -      |


## 金字塔图

:::demo-fs-dark

v-chart/pyramid-chart

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| chartData         | 数据  | array<{label: string; value: number; color: string | string[]}>  | - | -      |

