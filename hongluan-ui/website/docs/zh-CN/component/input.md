## Input 输入框

通过鼠标或键盘输入内容，Input 为受控组件，它总会显示 Vue 绑定值。

:::demo-fs 通常情况下，应当处理 `input` 事件，并更新组件的绑定值（或使用`v-model`）。否则输入框内显示的值将不会改变。不支持 `v-model` 修饰符。

input/basic

:::

## 状态颜色

Input 的颜色与状态颜色保持一致。可选值为`primary`、`success`、`warning`、`danger`和`info`。

:::demo-fs 根据鸿鸾的交互原则：无论是哪种状态的输入框，在非 **焦点** 或 **激活** 状态时，都统一呈现为默认的状态。

input/color

:::

## Fill 颜色

使用 `fill` 属性，可以使 input 呈现为填充样式。

:::demo-fs

input/fill

:::

## Input 尺寸

输入框提供了与按钮相同的尺寸。以方便与 `group` 组，来搭配使用。默认尺寸为 `md`。

:::demo-fs

input/size

:::

## 拉伸输入框

使用`block`属性可以把输入框拉伸至与父元素的宽度

:::demo-fs

input/block

:::

## 椭圆样式

为 input 加上 `round` 属性，即可呈现为椭圆样式。
:::demo-fs

input/round

:::

## 单薄样式

为 input 加上 `thin` 属性，即可移除边框、背景色、填充等。
:::demo-fs

input/thin

:::

## 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件
:::demo-fs

input/disabled

:::

## 可清空的输入框

使用`clearable`属性即可得到一个可清空的输入框

:::demo-fs

input/clearable

:::

## 格式化

显示格式化后的值，使用 `formatter`属性, 通常和 `parser` 配合使用

:::demo-fs 货币显示

input/formatter

:::

## 密码输入框

使用`show-password`属性即可得到一个可切换显示隐藏的密码框

:::demo-fs

input/password

:::

## 带 "附标" 的输入框

可以通过 slot 来放置自定义内容，添加图标或者文字等。

:::demo-fs

input/slot

:::

## 文本域

通过将 `native-type` 属性的值设置 `textarea` 即可调用出文本域输入框。

:::demo-fs 使用`input-style`属性来为文本域传递高度的样式，还可通过 `rows` 属性来控制高度。

input/textarea

:::

## 自动高度

通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整。

:::demo-fs `autosize` 还可以设定为一个对象，指定最小行数和最大行数。

input/autosize

:::

## 输入长度限制

:::demo-fs  `maxlength` 和 `minlength` 属性，用来限制输入框的字符长度，其中字符长度是用 Javascript 的字符串长度统计的。对于类型为 `text` 或 `textarea` 的输入框，在使用 `maxlength` 属性限制最大输入长度的同时，可通过设置 `show-word-limit` 属性来展示字数统计。

input/length

:::

## Attributes

| 参数                 | 说明       | 类型             | 可选值             | 默认值 |
| -------------------- | ------------------- | ---------------- | -------------------------------- | ------ |
| native-type                 | 类型         | string           | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text   |
| model-value / v-model | 绑定值    | string / number  | —        | —      |
| maxlength            | 最大输入长度      | string / number           | —    | —      |
| minlength            | 原生属性，最小输入长度    | number           | —      | —      |
| show-word-limit      | 是否显示输入字数统计，只在 `native-type = "text"` 或 `native-type = "textarea"` 时有效                | boolean   | —   | false  |
| placeholder          | 输入框占位文本   | string           | —     | —      |
| clearable            | 是否可清空   | boolean          | —   | false  |
| formatter            | 制定输入框的格式（仅当`native-type = 'text'`时起作用）  | function(value: string / number): string | —    | —       |
| parser               | 指定从formatter中取到的input值（仅当`native-type = 'text'`时起作用）   | function(string): string                 | — | —       |
| show-password        | 是否显示切换密码图标    | boolean          | —    | false  |
| disabled             | 禁用     | boolean          | —    | false  |
| block                | 是否拉伸至父元素 100%的宽度        | boolean          | —  | false  |
| size                 | 输入框尺寸，只在 `native-type!="textarea"` 时有效      | string           | sm / lg | —      |
| rows                 | 输入框行数，只对 `native-type="textarea"` 有效     | number           | —    | 3      |
| autosize             | 自适应内容高度，只对 `native-type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | boolean / object | —   | false  |
| autocomplete         | 原生属性，自动补全       | string           | - | off    |
| auto-complete        | 下个主版本弃用   | string           | on, off| off    |
| name                 | 原生属性    | string           | —   | —      |
| readonly             | 原生属性，是否只读   | boolean          | —  | false  |
| round                | 圆形输入框，只在 `native-type!="textarea"` 时有效   | boolean          | —   | false  |
| max                  | 原生属性，设置最大值   | —                | —  | —      |
| min                  | 原生属性，设置最小值   | —                | —    | —      |
| step                 | 原生属性，设置输入字段的合法数字间隔    | —                | —   | —      |
| resize               | 控制是否能被用户缩放      | string           | none, both, horizontal, vertical    | —      |
| autofocus            | 原生属性，自动获取焦点    | boolean          | true, false | false  |
| type                | 颜色状态    | string           | info, primary, warning, danger, success  | —      |
| form                 | 原生属性  | string           | —   | —      |
| label                | 输入框关联的 label 文字    | string           | —   | —      |
| tabindex             | 输入框的 tabindex   | string / number           | -  | -      |
| validate-event       | 输入时是否触发表单的校验  | boolean          | -   | true   |
| input-style | input元素或textarea元素的style | object | - | {} |
| fill | 填充样式 | boolean | - | false |
| thin | 单薄、无边框、无背景样式 | boolean | - | false |


## Slots

| name   | 说明                                    |
| ------ | --------------------------------------- |
| prefix | 输入框头部内容，只对 `native-type="text"` 有效 |
| suffix | 输入框尾部内容，只对 `native-type="text"` 有效 |

## Events

| 事件名称 | 说明                                          | 回调参数                  |
| -------- | --------------------------------------------- | ------------------------- |
| blur     | 在 Input 失去焦点时触发                       | (event: FocusEvent)            |
| focus    | 在 Input 获得焦点时触发                       | (event: FocusEvent)            |
| change   | 输入框失去焦点或用户按下回车并且modelValue有更新时触发        | (value: string \| number) |
| input    | 在 Input 值改变时触发                         | (value: string \| number) |
| clear    | 在点击由 `clearable` 属性生成的清空按钮时触发 | —                         |

## Methods

| 方法名 | 说明                | 参数 |
| ------ | ------------------- | ---- |
| focus  | 使 input 获取焦点   | —    |
| blur   | 使 input 失去焦点   | —    |
| select | 选中 input 中的文字 | —    |
