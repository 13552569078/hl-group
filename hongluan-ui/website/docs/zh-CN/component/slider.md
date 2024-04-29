# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

:::demo-fs 通过设置绑定值自定义滑块的初始值

slider/basic

:::

## 离散值

选项可以是离散的

:::demo-fs 改变`step`的值可以改变步长，通过设置`show-stops`属性可以显示间断点

slider/stops

:::

## 状态色

Slider 也支持状态色

:::demo-fs

slider/color

:::

## 范围选择

支持选择某一数值范围

:::demo-fs 设置`range`即可开启范围选择，此时绑定值是一个数组，其元素分别为最小边界值和最大边界值

slider/range

:::

## 竖向模式

:::demo-fs 设置`vertical`可使 Slider 变成竖向模式，此时必须设置高度`height`属性

slider/vertical

:::

## 展示标记

:::demo-fs 设置 `marks` 属性可以展示标记

slider/marks

:::

## Attributes

| 参数                  | 说明    | 类型            | 可选值             | 默认值 |
| --------------------- | ----------- | --------------- | ------------------ | ------ |
| model-value / v-model | 绑定值  | number          | —                  | 0      |
| min                   | 最小值   | number          | —                  | 0      |
| max                   | 最大值  | number          | —                  | 100    |
| disabled              | 是否禁用  | boolean         | —                  | false  |
| step                  | 步长  | number          | —                  | 1      |
| show-stops            | 是否显示间断点  | boolean         | —                  | false  |
| show-tooltip          | 是否显示 tooltip | boolean         | —                  | true   |
| format-tooltip        | 格式化 tooltip message | function(value) | —                  | —      |
| range                 | 是否为范围选择   | boolean         | —                  | false  |
| vertical              | 是否竖向模式    | boolean         | —                  | false  |
| height                | Slider 高度，竖向模式时必填  | string          | —                  | —      |
| label                 | 屏幕阅读器标签  | string          | —                  | —      |
| debounce              | 输入时的去抖延迟，毫秒，仅在`show-input`等于 true 时有效    | number          | —     | 300    |
| tooltip-class         | tooltip 的自定义类名  | string          | —         | —      |
| marks                 | 标记， key 的类型必须为 number 且取值在闭区间 `[min, max]` 内，每个标记可以单独设置样式 | object   | —      | —      |
| range-start-label     | 当为`range`时, 屏幕阅读器读取的范围开始标签     | string   | —     | —       |
| range-end-label       | 当为`range`时, 屏幕阅读器读取的范围结束标签  | string          | —       | —       |
| format-value-text     | 为屏幕阅读器格式化 `aria-valuenow` 属性值   | function(value) | —     | —       |
| validate-event| 是否触发表单验证  | boolean   | -     | true  |
| placement             | 提示框位置 | string          | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top     |

## Events

| 事件名称 | 说明                                               | 回调参数   |
| -------- | -------------------------------------------------- | ---------- |
| change   | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | 改变后的值 |
| input    | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） | 改变后的值 |
