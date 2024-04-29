# InputNumber 计数器

计数器由 Group 容器和子成员 Button， Input 组件组成。所以它也拥有这些组件的样式。

:::demo-fs 在 InputNumber 组件中使用`v-model`绑定变量即可，变量的初始值即为默认值。

input-number/basic

:::

:::tip
当输入非法字符串时，input的事件将会发出NaN值，而不是抛出错误
:::


## 禁用状态

`disabled`属性接受一个`boolean`，设置为`true`即可禁用整个组件，如果你只需要控制数值在某一范围内，可以设置`min`属性和`max`属性，不设置时，最小值为 0。

:::demo-fs

input-number/disabled

:::

## 步数

允许定义递增递减的步数控制，设置`step`属性可以控制步长，接受一个`number`。

:::demo-fs

input-number/step

:::

## 严格步数

`step-strictly`属性接受一个`boolean`。如果这个属性被设置为`true`，则只能输入步数的倍数。

:::demo-fs

input-number/strictly

:::

## 精度

设置 `precision` 属性可以控制数值精度，接受一个 `number`。

:::demo-fs `precision` 的值必须是一个非负整数，并且不能小于 `step` 的小数位数。

input-number/precision

:::

## 尺寸

额外提供了 `sm`、`lg`以及默认 三种尺寸的数字输入框

:::demo-fs

input-number/size

:::

## 按钮位置

设置 `controls-position` 属性可以控制按钮位置。

:::demo-fs

input-number/controls

:::

## 自定义前后图标以及增减图标

通过`prefix`，`suffix`，`icon-increase`，`icon-decrease` slot实现。

:::demo-fs

input-number/icon

:::

## Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|----------|-------------- |----------|--------------------------------  |-------- |
| model-value / v-model | 绑定值         | number / undefined | — | - |
| min      | 设置计数器允许的最小值 | number | — | -Infinity |
| max      | 设置计数器允许的最大值 | number | — | Infinity |
| step     | 计数器步长           | number   | — | 1 |
| step-strictly | 是否只能输入 step 的倍数 | boolean   | — | false |
| precision| 数值精度             | number   | — | — |
| size     | 计数器尺寸           | string   | lg/sm  |  |
| readonly   | 原生input readonly属性   | boolean                | —               | false       |
| disabled | 是否禁用计数器        | boolean | — | false |
| controls | 是否使用控制按钮        | boolean | — | true |
| controls-position | 控制按钮位置 | string | initial/left/right/inner | initial |
| name | 原生属性 | string | — | — |
| label | 输入框关联的label文字 | string | — | — |
| placeholder | 输入框默认 placeholder | string | - | - |
| merge | 融合input-number表单元素 | boolean | - | false |
| deep-merge | 深度融合input-number表单元素 | boolean | - | false |
| indent | 缩进input-number表单元素 | boolean、string | - | false |
| gap | 间隙 | string | - | false |
| round | 圆形样式 | string | - | false |
| fill | 填充样式 | boolean | - | false |
| dir        | 排列方向           | string           | horizontal / vertical                    | horizontal |
| value-on-clear   | 当输入框为空时，应设置的值    | string / number / null | min/max         | -     |
| validate-event| 是否触发表单验证  | boolean   | -     | true  |

## Slots

| name | 说明 |
|------|--------|
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
| icon-decrease | 自定义减少图标 |
| icon-increase | 自定义增加图标 |

## Events

| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| change | 绑定值被改变时触发 | currentValue: number \| NaN, oldValue: number \| NaN |
| blur | 在组件 Input 失去焦点时触发 | (event: FocusEvent) |
| focus | 在组件 Input 获得焦点时触发 | (event: FocusEvent) |

## Methods

| 方法名 | 说明                  | 参数 |
| ------ | --------------------- | ---- |
| focus  | 使组件 Input 获取焦点 | -    |
| blur   | 使组件 Input 失去焦点 | —    |
