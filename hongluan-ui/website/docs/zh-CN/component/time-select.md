# TimeSelect 时间选择

用于选择或输入日期

可用时间范围是 00:00-23:59

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

## 固定时间点

提供几个固定的时间点供用户选择

:::demo-fs 使用 HlTimeSelect 标签，然后通过start、end和step指定起始时间，结束时间和步长。

time-select/basic

:::

## 时间格式

使用 `format` 属性来控制时间格式 (小时以及分钟)。

在 [这里](https://day.js.org/docs/en/display/format#list-of-all-available-formats) 查看 Day.js 支持的所有格式。

:::warning

注意大小写

:::

:::demo-fs

time-select/time-formats

:::

## 固定时间范围

如果先选中了开始（或结束）时间，则结束（或开始）时间的状态也将会随之改变。

:::demo-fs

time-select/time-range

:::

## Attributes

| 参数             | 说明    | 类型               | 可选值   | 默认值     |
| --------------------- | -------------- | ------------------ | ------------------ | ----------- |
| model-value / v-model | 选中项绑定值                                            | string             | —    | —           |
| disabled              | 禁用状态                           | boolean            | —   | false       |
| editable              | 文本框可输入                            | boolean            | —  | true        |
| clearable             | 是否显示清除按钮                             | boolean            | —  | true        |
| size                  | 输入框尺寸                                            | string             | large / default / small                                                                | default     |
| placeholder           | 非范围选择时的占位内容                          | string             | —     | —           |
| name                  | 原生属性                        | string             | —   | —           |
| effect                | 主题，内置了 dark / light 两种主题          | string             | string  | light       |
| start                 | 开始时间                                               | string             | — | 09:00       |
| end                   | 结束时间                                                | string             | —  | 18:00       |
| step                  | 间隔时间                                               | string             | —  | 00:30       |
| min-time              | 最早时间点，早于该时间的时间段将被禁用 | string             | —  | 00:00       |
| max-time              | 最晚时间点，晚于该时间的时间段将被禁用 | string             | —   | —           |
| format                | 设置时间格式                                       | string             | 详见 [格式表示](https://day.js.org/docs/en/display/format#list-of-all-available-formats) | HH:mm       |
| teleported            | 下拉框节点是否添加到body上 | boolean         | —  | true |

## Events

| 事件名 | 说明                           | 回调参数                |
| ---------- | ------------------------------------- | ------------------------- |
| change     | 用户确认选定的值时触发 | val，组件绑定值 |
| blur       | 在组件 Input 失去焦点时触发            | (event: FocusEvent)        |
| focus      | 在组件 Input 获得焦点时触发           | (event: FocusEvent)        |

## Methods

| 方法名 | 说明               | 参数 |
| ------ | ------------------------- | ---------- |
| focus  | 使 input 获取焦点 | —          |
| blur   | 使 input 失去焦点  | —          |

## Slots

| 名称        | 说明               |
| ----------- | -------------------------- |
| prefix | 自定义前缀图标                                                |
