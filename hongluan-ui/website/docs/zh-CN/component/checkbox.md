# Checkbox 复选框

使用完全重构的 Checkbox 组件来创建一致的跨浏览器和跨设备的复选框。

:::demo-fs 在 Checkbox 组件中定义`v-model`绑定变量，单一的 Checkbox 组件中，默认绑定变量的值会是`boolean`，选中为`true`。

checkbox/basic

:::

## 尺寸修饰

Checkbox 同其他表单类组件一样提供了 `sm` `md` `lg` 三种尺寸样式，默认为 `md` 尺寸

:::demo-fs

checkbox/size

:::

## 状态颜色

Checkbox 的颜色与状态颜色保持一致。可选值为`primary`、`success`、`warning`、`danger`、`info`。

:::demo-fs

checkbox/color

:::

## Fill 颜色

使用 fill 属性，可以使 Checkbox 呈现为填充样式。
:::demo-fs

checkbox/fill

:::

## 圆形复选框

为复选框加上 `round` 属性，即可将它们变成圆形，并且拥有 `radio` 相似的外观。

:::demo-fs

checkbox/round

:::

## 禁用状态

为复选框设置`disabled`属性后呈灰色禁用，即便你为它设置了状态颜色也依然不起作用。

:::demo-fs

checkbox/disabled

:::

## 复选框组

单选框组提供了一个 `gap` 来自定义元素之间的边距，例如：`gap="0"`，默认为 12px

CheckboxGroup 容器能将多个复选框管理为一组，只需为它的`v-model`绑定`Array`类型的变量即可。

:::demo-fs Checkbox 组件的`label`属性是对应的值，当复选框无介绍内容时也可充当它的介绍。`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。复选框组还提供了一个 `gap` 来自定义元素之间的边距，例如：`gap="0"`，默认为 12px

checkbox/group

:::

## 不确定状态

`indeterminate` 属性用以表示复选框的不确定状态，一般用于实现全选的效果。

:::demo-fs

checkbox/indeterminate

:::

## 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

:::demo-fs

checkbox/minmax

:::

## 自定义样式

只要在 Checkbox 组件中设置`custom`属性即可，它接受一个`Boolean`，`true`为自定义样式。
:::demo-fs 你可以根据 Checkbox 组件提供的 `is-checked` `is-focus` `is-disabled`的样式名称来自定义设计。

checkbox/custom

:::

## Attributes

| 参数    | 说明  | 类型      | 可选值      | 默认值  |
| ------ | ----- | ----------| ------ | ------- |
| model-value / v-model | 绑定值 | string / number / boolean          | —     | —       |
| label                 | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效） | string / number / boolean / object | —   | —       |
| true-label            | 选中时的值  | string / number                    | —    | —       |
| false-label           | 没有选中时的值   | string / number  | —     | —       |
| disabled              | 是否禁用 | boolean  | —   | false   |
| name                  | 原生 name 属性 | string  | —   | —       |
| checked               | 当前是否勾选| boolean  | —   | false   |
| indeterminate         | 设置 indeterminate 状态，只负责样式控制 | boolean  | —   | false   |
| size                  | 尺寸修饰   | string | sm, md, lg  | md      |
| round                 | 圆形多选  | boolean    | —    | false   |
| type                  | 颜色状态  | string| info, primary, warning, danger, success | primary |
| show-label            | 是否显示 Label 属性的文本内容   | boolean  | -   | true    |
| fill                  | 填充样式 | boolean    | -    | false   |
| validate-event| 是否触发表单验证  | boolean   | -     | true  |

## Events

| 事件名称 | 说明                     | 回调参数   |
| -------- | ------------------------ | ---------- |
| change   | 当绑定值变化时触发的事件 | 更新后的值 |

## Checkbox Group Attributes

| 参数                  | 说明                           | 类型    | 可选值                                  | 默认值  |
| --------------------- | ------------------------------ | ------- | --------------------------------------- | ------- |
| model-value / v-model | 绑定值                         | array   | —                                       | []      |
| disabled              | 是否禁用                       | boolean | —                                       | false   |
| min                   | 可被勾选的 checkbox 的最小数量 | number  | —                                       | —       |
| max                   | 可被勾选的 checkbox 的最大数量 | number  | —                                       | —       |
| custom                | 自定义样式                     | boolean | —                                       | false   |
| round                 | 圆形多选                       | boolean | —                                       | false   |
| type                  | 颜色状态                       | string  | info, primary, warning, danger, success | primary |
| gap                   | 间距                           | string  | -                                       | sm      |
| fill                  | 填充样式                       | boolean | -                                       | false   |
| label                 | 屏幕阅读器标签                           | string  | —                      | —       |
| validate-event| 是否触发表单验证  | boolean   | -     | true  |

## Checkbox Group Events

| 事件名称 | 说明                     | 回调参数   |
| -------- | ------------------------ | ---------- |
| change   | 当绑定值变化时触发的事件 | 更新后的值 |
