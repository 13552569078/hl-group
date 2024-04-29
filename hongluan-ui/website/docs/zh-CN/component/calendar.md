# Calendar 日历

显示日期

## 基本

:::demo-fs 设置 `value` 来指定当前显示的月份。如果 `value` 未指定，则显示当月。`value` 支持 `v-model` 双向绑定。

calendar/basic

:::

## 自定义内容

:::demo-fs 通过设置名为 `dateCell` 的 `slot` 来自定义日历单元格中显示的内容。在 `slot` 可以获取到 date（当前单元格的日期）, data（包括 type，isSelected，day 属性）。详情解释参考下方的 API 文档。

calendar/slot

:::

## 自定义范围

:::demo-fs 设置 `range` 属性指定日历的显示范围。开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。

calendar/range

:::

## 自定义头部

:::demo-fs 通过设置名为 `header` 的 `slot` 来自定义日历头部显示的内容。在 `slot` 可以获取到 date（当前单元格的日期）。详情解释参考下方的 API 文档。

calendar/header

:::

## 国际化

默认语言是中文 (Chinese), 如需使用其他语言, 请参考 [ConfigProvider](#/zh-CN/component/config-provider)

注意：时间日期相关的语言配置如 (月份名, 每周第一天是周几等) 也是在国际化里配置。同时需要引入dayjs相关的语言包`import 'path/to/dayjs/locale/zh-cn'`

## Attributes

| 参数                  | 说明   | 类型        | 可选值 | 默认值 |
| --------------------- | ------ | ------ | ---- | ---- |
| model-value / v-model | 绑定值 | Date        | —      | —      |
| range                 | 时间范围，包括开始时间与结束时间。开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。 | [Date]Array | —      | —      |


## Methods

| 方法名     | 说明     | 参数                                                    |
| ---------- | -------- | ------------------------------------------------------- |
| selectDate | 切换日期 | today / prev-month / next-month / prev-year / next-year |


## Slots

| 名称 | 说明   |
| ---- | --------------- |
| date-cell    | { type, isSelected, day, date }，`type` 表示该日期的所属月份，可选值有 prev-month，current-month，next-month；`isSelected` 标明该日期是否被选中；`day` 是格式化的日期，格式为 yyyy-MM-dd；`date` 是单元格的日期 |
| header    | { date }，`date` 是月份信息 |
