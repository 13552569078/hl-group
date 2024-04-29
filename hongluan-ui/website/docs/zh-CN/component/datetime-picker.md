# DateTimePicker 日期时间选择器

为`hl-date-picker`设置`type`属性为`datetime`，即可在同一个选择器里同时进行日期和时间的选择。快捷选项的使用方法与 Date Picker 相同。

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

:::demo-fs DateTimePicker 由 时间 和 日期 选择器派生而来，相关属性可参考文档说明。

datetime-picker/basic

:::

## 日期和时间范围

:::demo-fs 设置`type`为`datetimerange`即可选择日期和时间范围

datetime-picker/datetimerange

:::

## 默认的起始与结束时刻

:::demo-fs 使用`datetimerange`进行范围选择时，在日期选择面板中选定起始与结束的日期，默认会使用该日期的`00:00:00`作为起始与结束的时刻；通过选项`default-time`可以控制选中起始与结束日期时所使用的具体时刻。`default-time`接受一个数组，其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。

datetime-picker/default-time

:::

## Attributes

| 参数                  | 说明     | 类型    | 可选值  | 默认值              |
| --------------------- | ------ | ------- | ------------ | ---------- |
| model-value / v-model | 绑定值，如果是数组，需要长度为2 | Date / number / string / Array        | —   | —          |
| readonly              | 完全只读   | boolean     | — | false               |
| disabled              | 禁用      | boolean     | —   | false               |
| editable              | 文本框可输入    | boolean    | —   | true                |
| clearable             | 是否显示清除按钮     | boolean    | —  | true                |
| size                  | 输入框尺寸    | string    | sm/lg | lg               |
| placeholder           | 非范围选择时的占位内容     | string     | —  | —                   |
| start-placeholder     | 范围选择时开始日期的占位内容    | string     | —  | —                   |
| end-placeholder       | 范围选择时结束日期的占位内容    | string     | — | —                   |
| time-arrow-control    | 是否使用箭头进行时间选择     | boolean        | — | false               |
| type                  | 显示类型   | string    | year/month/date/week/ datetime/datetimerange/daterange   | date   |
| format                | 显示在输入框中的格式    | string     | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi)  | YYYY-MM-DD HH:mm:ss |
| value-format          | 可选，绑定值的格式。不指定则绑定值为 Date 对象 | string   | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi)  | —                   |
| popper-class          | DateTimePicker 下拉框的类名  | string      | —  | —                   |
| range-separator       | 选择范围时的分隔符     | string  | -   | '-'                 |
| default-value         | 可选，选择器打开时默认显示的时间       | Date    | 可被`new Date()`解析  | —                   |
| default-time          | 选中日期后的默认具体时刻     | Date / 范围选择时：Date[]                         | 非范围选择时：Date 对象；范围选择时：数组，长度为 2，每项值为 Date 对象，第一项指定开始日期的时刻，第二项指定结束日期的时刻。不指定会使用时刻 `00:00:00` | —     |
| name                  | 原生属性 | string   | —  | —                   |
| fill                  | 填充样式     | boolean    | —  | false               |
| unlink-panels         | 在范围选择器里取消两个日期面板之间的联动       | boolean      | —  | false               |
| shortcuts             | 设置快捷选项，需要传入数组对象   | object[{ text: string, value: date / function }]  | —  | — |
| disabled-date         | 设置禁用状态，参数为当前日期，要求返回 Boolean | Function  | — | —                   |
| cell-class-name       | 设置日期的 className  | Function(Date)      | —  | —                   |
| thin | 单薄、无边框、无背景样式 | boolean | - | false |
| id                    | input输入框id属性值 | string / array(string) | 日期选择 `id="my-date"`，日期范围选择 `:id="['my-range-start', 'my-range-end']"`  | -           |
| teleported            | 下拉框节点是否添加到body上 | boolean         | —  | true |

## Slots

| 方法名 | 说明              | 参数 |
| ------ | ----------------- | ---- |
| icon  | 自定义图标 | —    |

## Events

| Event Name | Description             | Parameters |
| ---------- | ----------------------- | ---------- |
| change     | 用户确认选定的值时触发  | 组件绑定值 |
| blur       | 当 input 失去焦点时触发 | (e: FocusEvent)   |
| focus      | 当 input 获得焦点时触发 | (e: FocusEvent)   |
| calendar-change | 选中日历日期后会执行的回调，只有当 `datetimerange` 才生效 | [Date, Date] |
| visible-change  | 日期选择器显示或者隐藏时触发                | true / false |

## Methods

| 方法名 | 说明              | 参数 |
| ------ | ----------------- | ---- |
| focus  | 使 input 获取焦点 | —    |

## Slots

| Name            | 说明         |
| --------------- | ------------ |
| range-separator | 自定义分隔符 |
