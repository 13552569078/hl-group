# DatePicker 日期选择器

以「日」为基本单位，基础的日期选择控件

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

:::demo-fs 基本单位由`type`属性指定。通过`shortcuts`配置快捷选项，禁用日期通过 `disabled-date` 设置，传入函数

date-picker/basic

:::

## 其他日期单位

通过扩展基础的日期选择，可以选择周、月、年或多个日期

:::demo-fs

date-picker/type

:::

## 选择日期范围

可在一个选择器中便捷地选择一个时间范围

:::demo-fs 在选择日期范围时，默认情况下左右面板会联动。如果希望两个面板各自独立切换当前月份，可以使用`unlink-panels`属性解除联动。

date-picker/daterange

:::

## 选择月份范围

可在一个选择器中便捷地选择一个月份范围

:::demo-fs 在选择月份范围时，默认情况下左右面板会联动。如果希望两个面板各自独立切换当前年份，可以使用`unlink-panels`属性解除联动。

date-picker/monthrange

:::

## 默认值

如果用户没有选择日期，那默认展示当前日的月份。你可以使用 `default-value` 来设置成其他的日期。

如果类型是 `daterange`, `default-value` 则会设置左边窗口的默认值。

:::demo-fs

date-picker/default-value

:::

## 日期格式

使用`format`指定输入框的格式。使用`value-format`指定绑定值的格式。默认情况下，组件接受并返回`Date`对象。

:::warning
请注意大小写
:::

:::demo-fs 在 [这里](https://day.js.org/docs/zh-CN/display/format) 查看 Day.js 支持的 format 参数。

date-picker/format

:::

## 默认显示日期

在选择日期范围时，指定起始日期和结束日期的默认时刻。

:::demo-fs 选择日期范围时，默认情况下，起始日期和结束日期的时间部分均为当天的 0 点 0 分 0 秒。通过`default-time`可以分别指定二者的具体时刻。`default-time`接受一个数组，第一个值控制起始日期的时刻，第二个值控制结束日期的时刻。

date-picker/default-time

:::

## 自定义单元格内容


:::demo-fs

date-picker/custom-content

:::

`slot` 参数详情：

```ts
interface DateCell {
  column: number
  customClass: string
  disabled: boolean
  end: boolean
  inRange: boolean
  row: number
  selected: Dayjs
  isCurrent: boolean
  isSelected: boolean
  start: boolean
  text: number
  timestamp: number
  date: Date
  dayjs: Dayjs
  type: 'normal' | 'today' | 'week' | 'next-month' | 'prev-month'
}
```

## Attributes

| 参数                  | 说明    | 类型    | 可选值  | 默认值     |
| --------------------- | ------- | ------- | ---------- | ---------- |
| model-value / v-model | 绑定值，如果是数组，需要长度为2 | Date / number / string / Array        | —   | —          |
| readonly              | 完全只读  | boolean | — | false      |
| disabled              | 禁用   | boolean | —  | false      |
| editable              | 文本框可输入   | boolean  | —   | true       |
| clearable             | 是否显示清除按钮  | boolean      | —    | true       |
| size                  | 输入框尺寸  | string   | sm/lg  | large      |
| placeholder           | 非范围选择时的占位内容   | string   | —  | —          |
| start-placeholder     | 范围选择时开始日期的占位内容 | string  | —  | —          |
| end-placeholder       | 范围选择时结束日期的占位内容  | string   | —  | —          |
| type                  | 显示类型  | string  | year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange   | date       |
| format                | 显示在输入框中的格式  | string  | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi)  | YYYY-MM-DD |
| popper-class          | DatePicker 下拉框的类名  | string   | —   | —          |
| range-separator       | 选择范围时的分隔符    | string  | —   | '-'        |
| default-value         | 可选，选择器打开时默认显示的时间 | Date    | 可被`new Date()`解析  | —          |
| default-time          | 范围选择时选中日期所使用的当日内具体时刻       | Date[]   | 数组，长度为 2，第一项指定开始日期的时刻，第二项指定结束日期的时刻，不指定会使用时刻 `00:00:00` | —    |
| value-format          | 可选，绑定值的格式。不指定则绑定值为 Date 对象 | string  | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi) | —          |
| id                    | input输入框id属性值 | string / array(string) | 日期选择 `id="my-date"`，日期范围选择 `:id="['my-range-start', 'my-range-end']"`  | -           |
| name                  | 原生属性  | string  | —   | —          |
| fill                  | 填充样式   | boolean    | —  | false      |
| unlink-panels         | 在范围选择器里取消两个日期面板之间的联动       | boolean   | —    | false      |
| validate-event        | 输入时是否触发表单的校验   | boolean  | -   | true       |
| shortcuts             | 设置快捷选项，需要传入数组对象   | object[{ text: string, value: date / function }] | —    | —          |
| disabled-date         | 设置禁用状态，参数为当前日期，要求返回 Boolean | Function   | —   | —          |
| thin | 单薄、无边框、无背景样式 | boolean | - | false |
| teleported            | 下拉框节点是否添加到body上 | boolean         | —  | true |

## Slots

| 方法名 | 说明              | 参数 |
| ------ | ----------------- | ---- |
| default         | 自定义单元格内容            |
| icon  | 自定义图标 | —    |

## Events

| 事件名称 | 说明                    | 回调参数   |
| -------- | ----------------------- | ---------- |
| change   | 用户确认选定的值时触发  | 组件绑定值 |
| blur     | 当 input 失去焦点时触发 | 组件实例   |
| focus    | 当 input 获得焦点时触发 | 组件实例   |
| calendar-change | 选中日历日期后会执行的回调，只有当 `daterange` 才生效 | [Date, Date] |
| panel-change    | 点击导航按钮时触发  | `(date, mode, view)`      |
| visible-change  | 日期选择器显示或者隐藏时触发                | true / false |

## Methods

| 方法名 | 说明              | 参数 |
| ------ | ----------------- | ---- |
| focus  | 使 input 获取焦点 | focusStartInput    |
| handleOpen  | 打开日期选择器弹窗  | —          |
| handleClose | 关闭日期选择器弹窗 | —          |
