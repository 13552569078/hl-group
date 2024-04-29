# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

:::demo-fs 绑定`v-model`到一个`boolean`类型的变量。

switch/basic

:::

## 尺寸修饰

Switch 同其他表单类组件一样提供了 `sm` `md` `lg` 三种尺寸样式，默认为 `md` 尺寸

:::demo-fs

switch/size

:::

## 颜色

Switch 的颜色与状态颜色保持一致。可选值为`primary`、`success`、`warning`和`danger`。

:::demo-fs 可以使用`active-color`属性与`inactive-color`属性来设置开关的背景色。

switch/color

:::

## 扩展的 value 类型

设置`active-value`和`inactive-value`属性，接受`boolean`, `string`或`number`类型的值。

:::demo-fs

switch/value

:::

## 禁用状态

设置`disabled`属性可使 switch 变为禁用状态。

:::demo-fs

switch/disabled

:::

## 图标

`icon`属性可为 Switch 加上图标效果。你也通过 icon slot 来自定义设置。

:::demo-fs 注意 slot 里面必须用`i`标签包裹你的自定义内容

switch/icon

:::

## 阻止切换

:::demo-fs 设置`before-change`属性，若返回 false 或者返回 Promise 且被 reject，则停止切换。

switch/change

:::

## Attributes

| 参数                  | 说明    | 类型                      | 可选值          | 默认值  |
| --------------------- | ------------------ | ------------- | ------------------- | ------- |
| model-value / v-model | 绑定值，必须等于`active-value`或`inactive-value`，默认为`Boolean`类型       | boolean / string / number | —     | —       |
| disabled              | 是否禁用  | boolean                   | —        | false   |
| type                  | 颜色状态    | string                    | primary, warning, danger, success, info | —       |
| size                  | 尺寸   | string       | sm / lg         | —       |
| width                 | 自定义 switch 的宽度， width 和 size 不能同时使用  | string     | —   | -       |
| active-value          | switch 打开时的值 | boolean / string / number | —      | true    |
| inactive-value        | switch 关闭时的值   | boolean / string / number | —    | false   |
| active-color          | switch 打开时的背景色   | string   | —        | #409EFF |
| inactive-color        | switch 关闭时的背景色  | string      | —     | #C0CCDA |
| border-color          | switch 边框颜色   | string     | —      | —       |
| name                  | switch 对应的 name 属性    | string   | —    | —       |
| validate-event        | 改变 switch 状态时是否触发表单的校验    | boolean         | -       | true    |
| loading               | 加载状态，此状态下如果不设置 icon，会默认将 icon 设成 Loading    | boolean                   | -  | false   |
| before-change         | switch 状态改变前的钩子，返回 false 或者返回 Promise 且被 reject 则停止切换 | `() => Promise<boolean> \| boolean`     | —   | —       |

## Events

| 事件名称 | 说明                            | 回调参数   |
| -------- | ------------------------------- | ---------- |
| change   | switch 状态发生变化时的回调函数 | 新状态的值 |

## Methods

| 方法名 | 说明               | 参数 |
| ------ | ------------------ | ---- |
| focus  | 使 Switch 获取焦点 | -    |

## Slots

|   name  | 说明                                                                       |
| ------- | -------------------------------------------------------------------------- |
| icon    | icon 自定义，自定义将会使自动设置 loading icon 功能失效，参数：{ checked } |
