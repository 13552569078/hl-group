# TimePicker 时间选择器

TimePicker 组件可以选择任意时间。

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

:::demo-fs 通过 `disabledHours` `disabledMinutes` 和 `disabledSeconds` 限制可选时间范围。

time-picker/basic

:::

## 任意时间范围

添加`is-range`属性即可选择时间范围，同样支持`arrow-control`属性。

:::demo-fs

time-picker/is-range

:::

## Attributes

| 参数                  | 说明     | 类型     | 可选值   | 默认值   |
| --------------------- | --------- | ------------- | -------- | -------- |
| model-value / v-model | 绑定值，如果是数组，需要长度为2 | Date / number / string / Array        | —   | —          |
| readonly              | 完全只读  | boolean  | —   | false    |
| disabled              | 禁用  | boolean   | —    | false    |
| editable              | 文本框可输入   | boolean    | —  | true     |
| clearable             | 是否显示清除按钮   | boolean  | —   | true     |
| size                  | 输入框尺寸  | string | sm / lg    | —        |
| placeholder           | 非范围选择时的占位内容   | string   | —  | —        |
| start-placeholder     | 范围选择时开始日期的占位内容 | string   | —   | —        |
| end-placeholder       | 范围选择时开始日期的占位内容  | string  | —  | —        |
| is-range              | 是否为时间范围选择 | boolean  | —  | false    |
| arrow-control         | 是否使用箭头进行时间选择   | boolean   | —   | false    |
| popper-class          | TimePicker 下拉框的类名   | string    | —  | —        |
| range-separator       | 选择范围时的分隔符 | string  | -   | '-'      |
| format                | 显示在输入框中的格式   | string  | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi)   | HH:mm:ss |
| value-format          | 可选，绑定值的格式。不指定则绑定值为 Date 对象 | string  | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi) | —        |
| default-value         | 可选，选择器打开时默认显示的时间 | Date(TimePicker) / string(TimeSelect)  | 可被`new Date()`解析(TimePicker) / 可选值(TimeSelect)  | —        |
| name                  | 原生属性  | string   | —   | —        |
| fill                  | 填充样式   | boolean  | —   | false    |
| disabled-hours        | 禁止选择部分小时选项   | function    | —   | -        |
| disabled-minutes      | 禁止选择部分分钟选项  | function(selectedHour)  | —    | -        |
| disabled-seconds      | 禁止选择部分秒选项  | function(selectedHour, selectedMinute) | —   | -        |
| thin                  | 单薄、无边框、无背景样式  | boolean   | -   | false    |
| id                    | input 输入框 id 属性值   | string / array(string)  | 日期选择 `id="my-date"`，日期范围选择 `:id="['my-range-start', 'my-range-end']"` | -        |
| teleported            | 下拉框节点是否添加到body上 | boolean         | —  | true |

## Slots

| 方法名 | 说明       | 参数 |
| ------ | ---------- | ---- |
| icon   | 自定义图标 | —    |

## Events

| 事件名         | 说明                         | 参数         |
| -------------- | ---------------------------- | ------------ |
| change         | 用户确认选定的值时触发       | 组件绑定值   |
| blur           | 当 input 失去焦点时触发      | 组件实例     |
| focus          | 当 input 获得焦点时触发      | 组件实例     |
| visible-change | 日期选择器显示或者隐藏时触发 | true / false |

## Methods

| 方法名 | 说明              | 参数 |
| ------ | ----------------- | ---- |
| focus  | 使 input 获取焦点 | —    |
| blur   | 使 input 失去焦点 | —    |
| handleOpen  | 打开时间选择器弹窗  | —          |
| handleClose | 关闭时间选择器弹窗 | —          |
