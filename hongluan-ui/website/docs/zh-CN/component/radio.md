# Radio 单选框

用于在多个备选项中选中单个状态。若选项过多，建议使用 Select 选择器。

:::demo-fs 要使用 Radio 组件，只需要设置`v-model`绑定变量，选中意味着变量的值为相应 Radio `label`属性的值，`label`可以是`string`、`number`或`boolean`。

radio/basic

:::

## 尺寸修饰

Radio 同其他表单类组件一样提供了 `sm` `md` `lg` 三种尺寸样式，默认为 `md` 尺寸

:::demo-fs

radio/size

:::

## 状态颜色

:::demo-fs Radio 的颜色与状态颜色保持一致。可选值为`primary`、`success`、`warning`、`danger` 和 `info`。

radio/color

:::

## Fill 颜色

:::demo-fs 使用 fill 属性，可以使 Radio 呈现为填充样式。

radio/fill

:::

## 禁用状态

只要在 Radio 组件中设置`disabled`属性即可，它接受一个`boolean`，`true`为禁用。

:::demo-fs

radio/disabled

:::

## 单选框组

单选框组提供了一个 `gap` 来自定义元素之间的边距，例如：`gap="0"`，默认为 12px

:::demo-fs 结合 RadioGroup 组件和子组件 Radio 可以实现单选组，在 RadioGroup 中绑定`v-model`，在 Radio 中设置好`label`即可，无需再给每一个 Radio 绑定变量，另外，还提供了`change`事件来响应变化，它会传入一个参数`value`。

radio/group

:::

## 组排列

单选框组还提供了一个 `dir` 属性用来设置它的排列方式。

:::demo-fs 支持 默认的 `horizontal` 横向排列 和 `vertical` 纵向排列。

radio/dir

:::

## 自定义样式

只要在 Radio 组件中设置`custom`属性即可，它接受一个`boolean`，`true`为自定义样式。
:::demo-fs 你可以根据 Radio 组件提供的 `is-checked` `is-focus` `is-disabled`的样式名称来自定义设计。

radio/custom

:::

## Attributes

| 参数      | 说明        | 类型       | 可选值        | 默认值 |
| ------- | ------- | ------------ | ----------- | ------ |
| model-value / v-model | 绑定值 | string / number / boolean | —   | —      |
| label                 | Radio 的 value                | string / number / boolean | —   | —      |
| disabled              | 是否禁用                      | boolean                   | — | false  |
| size                  | 尺寸修饰                      | string                    | sm, md, lg  | md     |
| custom                | 自定义样式                    | boolean                   | —  | false  |
| type                  | 颜色状态                      | string                    | info, primary, warning, danger, success | —      |
| name                  | 原生 name 属性    | string                    | —  | —      |
| show-label            | 是否显示 Label 属性的文本内容 | boolean                   | -                                       | true   |
| fill                  | 填充样式                      | boolean                   | -  | false  |


## Events

| 事件名称 | 说明                   | 回调参数              |
| -------- | ---------------------- | --------------------- |
| change   | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

## Radio Group Attributes

| 参数            | 说明       | 类型                      | 可选值                                  | 默认值  |
| --------------- | ---------- | ------------------------- | --------------------------------------- | ------- |
| value / v-model | 绑定值     | string / number / boolean | —                                       | —       |
| disabled        | 是否禁用   | boolean                   | —                                       | false   |
| custom          | 自定义样式 | boolean                   | —                                       | false   |
| type            | 颜色状态   | string                    | info, primary, warning, danger, success | primary |
| gap             | 间距       | string                    | -                                       | sm      |
| fill            | 填充样式   | boolean                   | -                                       | false   |
| validate-event| 是否触发表单验证  | boolean   | -     | true  |

## Radio Group Events

| 事件名称 | 说明                   | 回调参数              |
| -------- | ---------------------- | --------------------- |
| change   | 绑定值变化时触发的事件 | 选中的 Radio label 值 |
