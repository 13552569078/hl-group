# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

:::demo-fs 在 Form 组件中，每一个表单域由一个 FormItem 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker

form/basic

:::

:::tip
W3C 标准中有如下[规定](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)：

即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 From 组件上添加 `@submit.native.prevent`。
:::

## 垂直表单

当你没有设置`width` 属性时，form组件默认把标题和表单元素分行放置。

:::demo-fs 也可以通过设置 `width` 属性为`100%` `block` 或者 `col-24`来实现整行的效果。

form/vertical

:::

## 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

:::demo-fs 设置 `inline` 属性可以让表单域变为行内的表单域

form/inline

:::

## 对齐方式

根据具体目标和制约因素，选择最佳的标签对齐方式。

:::demo-fs 通过设置 `label-position` 属性可以改变表单域标签的位置，并且对齐方式也支持响应式标签例如：`xl:items-right`

form/position

:::

## 表单验证

在表单验证尽可能让用户更早地发现并纠正错误的输入。

:::demo-fs Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可。校验规则参见 [async-validator](https://github.com/yiminghe/async-validator)

form/validate

:::

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

:::demo-fs

form/rule

:::

:::tip
自定义校验 callback 必须被调用。 更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。
***如果Webpack5报async_validator不是一个构造函数类似的错误，请在alias配置中增加如下配置：`"async-validator": "async-validator/dist-web/index.js",`***
:::

## 动态增减表单项

:::demo-fs 除了在 Form 组件上一次性传递所有的验证规则外还可以在单个的表单域上传递属性的验证规则

form/dynamic

:::

## 数字类型验证

:::demo-fs 数字类型的验证需要在 `v-model` 处加上 `.number` 的修饰符，这是 `Vue` 自身提供的用于将绑定值转化为 `number` 类型的修饰符。

form/number

:::

## 表单内组件尺寸控制

通过设置 Form 上的 `size` 属性可以使该表单内所有可调节大小的组件继承该尺寸。FormItem 也具有该属性。

:::demo-fs 如果希望某个表单项或某个表单组件的尺寸不同于 Form 上的`size`属性，直接为这个表单项或表单组件设置自己的`size`即可。

form/size

:::

## 可访问性

当只有一个输入框（或者Select，Checkbox等相关控件）在 `FormItem` 里时，表单项的标签将会自动附加到Input上。当有多个输入框时，表单项将会根据[WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/)规范，赋予 `role` 属性为[group](https://www.w3.org/TR/wai-aria/#group) 。在这种情况下，你需要自己附加标签到相应的输入框。

:::demo-fs

form/accessibility

:::


## 利用Grid组件创建多列表单

使用鸿鸾强大的栅格系统，可创造出更多丰富且响应式的表单布局

:::demo-fs 本示例使用class类名将 Form 组件构建成一个 Row， 并将其辅于栅格系统的特性。

form/grid

:::

## Attributes

| 参数                    | 说明  | 类型         | 可选值         | 默认值 |
| ----------------------- | --------- | ------------ | -------------- | ------ |
| model                   | 表单数据对象  | Record\<string, any\>       | —              | —      |
| rules                   | 表单验证规则 | FormRules       | —              | —      |
| inline                  | 行内表单模式 | boolean      | —              | false  |
| label-position          | 表单域标签的位置，水平（left,center,right）和垂直（top,middle,bottom）方向    | string/array | left/center/right/top/middle/bottom | -      |
| width                   | 表单域标签以及表单元素的宽度，还可以使用 Grid 中提供的响应式类（col-\*）   | string/array | —              | —      |
| label-suffix            | 表单域标签的后缀 | string       | —              | —      |
| label-prefix            | 表单域标签的前缀 | string       | —              | —      |
| hide-required-asterisk  | 是否隐藏必填字段的标签旁边的红色星号| boolean      | —              | false  |
| require-asterisk-position | 红色星号位置 | string | left / right               | left  |
| show-message            | 是否显示校验错误信息| boolean      | —              | true   |
| validate-on-rule-change | 是否在 `rules` 属性改变后立即触发一次验证  | boolean      | —              | true   |
| size                    | 用于控制该表单内组件的尺寸 | string       | sm / lg        | —      |
| gap                     | 设置每个 FormItem 的垂直间距。由于Form采用Flex布局，所以只有Form下的直接子FormItem才起作用  | string       | 规范化尺寸标签 / 自定义尺寸        | —      |
| item-gap                | 设置 FormItem 下的 label 和 content 之间的间距，你也可以单独设置`item-gap-x`或`item-gap-y`  | string       | 规范化尺寸标签 / 自定义尺寸        | —      |
| disabled                | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效  | boolean      | —              | false  |
| fill | 填充样式 | boolean | - | false |
| scroll-to-error         | 当验证失败时，是否滚动到错误表单项  | boolean   | false   |

## Rules

| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| trigger    | 验证触发方式 | string | blur / change   | —    |

## Methods

| 方法名        | 说明                                                                                                                                                                 | 参数                                                                       |
| ------------- | ------------------ | ----------------- |
| validate      | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | `(callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>`                              |
| validateField | 对部分表单字段进行校验的方法| `(props?: Arrayable<FormItemProp>, callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>` |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果    | `(props?: Arrayable<FormItemProp>) => void`   |
| scrollToField | 滚动到指定表单字段 | `(prop: FormItemProp) => void`                                                     |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果 | `(props?: Arrayable<FormItemProp>) => void`   |

## Events

| 事件名称 | 说明                   | 回调参数                                                   |
| -------- | ---------------------- | ---------------------------------------------------------- |
| validate | 任一表单项被校验后触发 | (prop: FormItemProp, isValid: boolean, message: string) => void |

## Form Item Attributes

| 参数           | 说明   | 类型         | 可选值      | 默认值 |
| -------------- | --------- | ------------ | ---------- | ------ |
| prop           | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string       | 传入 Form 组件的 `model` 中的字段 | —      |
| label          | 标签文本  | string       | —  | —      |
| label-position | 表单域标签的位置，水平（left,center,right）和垂直（top,middle,bottom）方向   | string/array | right/left/top   | - |
| width          | 表单域标签以及表单元素的宽度，还可以使用 Layout 中提供了响应式类（col-\*）。 | string/array | —   | —      |
| required       | 是否必填，如不设置，则会根据校验规则自动生成 | boolean      | —   | false  |
| rules    | 表单验证规则, 具体配置见下表, 更多内容参考[async-validator](https://github.com/yiminghe/async-validator) | FormItemRule \| FormItemRule[] | — | — |
| error          | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息    | string       | —  | —      |
| show-message   | 是否显示校验错误信息| boolean      | —   | true   |
| size           | 用于控制该表单域下组件的尺寸  | string       | sm / lg    | -      |
| offset         | 当你未设置label的时候，可以使用offset控制form-content的偏移，具体参考Grid组件的使用方式| string       |  | -      |
| gap            | 设置 form-item 下的 form-label 和 form-content 之间的间距，优先级高于item-gap  | string       | 规范化尺寸标签 ≈/ 自定义尺寸        | —      |

#### FormItemRule

| Name      | Description                     | Type                 | Default |
| --------- | ------------------------------- | -------------------- | ------- |
| trigger | 验证触发方式 | blur / change | —       |

## Form Item Slots

| name  | 说明                                           |
| ----- | ---------------------------------------------- |
| —     | Form Item 的内容 |
| label | 自定义标签显示. 参数为 { label } |
| error | 自定义表单校验信息的显示方式，参数为 { error } |

## Form Item Methods

| 方法名        | 说明                                                 | 参数 |
| ------------- | ---------------------------------------------------- | ---- |
| resetField    | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | () => void   |
| clearValidate | 移除该表单项的校验结果                               | () => void   |
