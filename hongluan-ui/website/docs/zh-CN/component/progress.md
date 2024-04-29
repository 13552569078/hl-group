# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 基础用法

:::demo-fs 添加`percentage`属性即可，表示进度条对应的百分比，**必填**，必须在 0-100。通过 `format` 属性来指定进度条文字内容。

progress/basic

:::

## 进度条状态

添加`type`属性设置进度条当前状态。

:::demo-fs

progress/type

:::

## 阶段颜色

可以通过 `color` 设置进度条不同阶段的颜色，`color` 可以接受颜色字符串，函数和数组。

:::demo-fs

progress/color

:::

## 条纹状

添加`striped`属性设置条纹状, 添加`active`属性设置滚动条纹。

:::demo-fs

progress/striped

:::

## 脉冲状

添加`indicating`属性设置静态脉冲状, 添加`active`属性设置脉冲状。

:::demo-fs

progress/indicating

:::

## 堆叠状

添加属性`show-as`值为`stack`时变为堆叠状，用 `stack` 传参。

:::demo-fs 可选值：`percentage`,`type`,`striped`,`indicating`,`active`,`format` 等属性

progress/show-as

:::

## 线条样式

设置属性`show-as`为 `line` 样式即可展现一种新的形态

:::demo-fs

progress/line

:::

## 对齐方式

设置属性`align`为 `left` `center` `right` 样式即可改变进度条的对齐方式

:::demo-fs

progress/align

:::

## 环形进度条

Progress 组件可通过 `show-as` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。

:::demo-fs

progress/circle

:::

## 仪表盘形进度条

通过 `show-as="dashboard"`属性来指定使用仪表盘形进度条。

:::demo-fs

progress/dashboard

:::

## 自定义内容

通过默认插槽添加自定义内容。

:::demo-fs

progress/slot

:::

## Attributes

| 参数         | 说明   | 类型   | 可选值   | 默认值 |
| ------------ | ---------------- | --------- | ---- | ------ |
| percentage   | 百分比  | number  | 0-100                             | 0      |
| show-as      | 进度条展现形式  | string   | stack / circle / dashboard / line | —      |
| stroke-width | 进度条的高度   | string    | —                                 | —      |
| type         | 进度条当前状态    | string    | success / warning / error         | —      |
| color        | 进度条颜色（会覆盖状态颜色）(show-as 为 stack 时不可用) | string/function/array     | —     |        |
| track-color  | 进度条轨道颜色   | string    | —     |        |
| show-text    | 是否显示进度条文字内容   | boolean  | —    | true   |
| format       | 指定进度条文字内容   | function(percentage)   | —     | —      |
| text         | 指定进度条描述文字，主要用在 line=true 时，显示左侧文字 | string   | —     | —      |
| stack        | 指定进度条集合（只在 show-as 为 stack 时可用）  | array[{percentage, type, striped, indicating, active, format}] | —  | —      |
| align        | 进度条对齐方式   | string | left / center / right             | left   |

## Slots

| name    | 说明  |
| ------- | ---------------- |
| default | 自定义内容，参数默认为 { percentage, text }，show-as=stack 时{percentage, type, striped, indicating, active, format} |
