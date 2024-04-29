# Selector 高级选择器

Selector 是一款可高度自定义的下拉选择器。

## 树单选示例

:::demo-fs 下拉选择器配合树组件实现下拉单选树节点以及输入过滤功能。

selector/tree-single

:::

## 树多选示例

:::demo-fs 下拉选择器配合树组件实现下拉多选树节点以及输入过滤功能。

selector/tree-multiple

:::

## 表格示例

:::demo-fs 下拉选择器配合表格实现表格选择。

selector/table

:::

## 自定义视频以及图片列表

实现自定义选择内容，下面以图片和视频为例。

:::demo-fs

selector/custom

:::

:::tip
下拉框的宽度需要自定设置，默认会有一个最小宽度。但可以用 resize 事件参数中的 input 宽度为参考值进行设置，也可以设置固定宽度。
:::

:::tip
自定义 tag slot 参数为{ tag }，tag 数据类型为: `{key: string, text: unknown}`。当 tag 折叠时，key 值为'-1'；其余 tag key 值为随机数字。text 值为 setValue 方法传入的任意参数。
:::

:::warning
选择器并不负责处理 Form 表单的验证事件，需用户自定义处理
:::

## Attributes

| 参数                  | 说明     | 类型    | 可选值       | 默认值       |
| --------------------- | ---------- | ------- | ------------ | ------------ |
| size                  | 尺寸    | string  | md / lg / xs | md           |
| placeholder           | 输入框占位文本   | string  | —            | 请选择       |
| disabled              | 是否禁用   | boolean | —            | false        |
| clearable             | 是否支持清空选项  | boolean | —            | false        |
| show-all-levels       | 输入框中是否显示选中值的完整路径   | boolean | —            | true         |
| collapse-tags         | 多选模式下是否折叠 Tag   | boolean | -            | false        |
| collapse-tags-tooltip | 鼠标滑入折叠Tag时，是否显示所有折叠的Tag  | boolean    | —           | false      |
| separator             | 选项分隔符    | string  | —            | 斜杠' / '    |
| filterable            | 是否可搜索选项    | boolean | —            | —            |
| popper-class          | 自定义浮层类名  | string  | —            | —            |
| block                 | 是否拉伸至父容器宽度    | boolean | —            | false        |
| input-style           | input 元素的 style  | object  | -            | {}           |
| placement             | 下拉框弹出位置    | string  | 参考 popover | bottom-start |
| fallback-placements   | 下拉框弹出被选位置    | array  | 参考 popover | - |
| multiple              | 是否多选   | boolean | -            | false        |
| popper-offset                    | 出现位置的偏移量     | number         | —   | 4 |
| popper-append-to-body(deprecated) | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false。请使用teleported属性 | boolean | -            | false         |
| teleported | 是否将弹出框插入至 body 元素。 | boolean | -            | true         |
| fill | 填充样式 | boolean | - | false |
| thin | 单薄、无边框、无背景样式 | boolean | - | false |
| round | 圆形输入框| boolean | - | false |
| tag-type | 标签类型  | string                  | success/info/warning/danger | -    |

## Events

| 事件名称       | 说明                                                               | 回调参数                      |
| -------------- | ------------------------------------------------------------------ | ----------------------------- |
| blur           | 当失去焦点时触发                                                   | (event: Event)                |
| focus          | 当获得焦点时触发                                                   | (event: Event)                |
| input          | 可搜索时用户输入内容                                               | 输入的内容                    |
| visible-change | 下拉框出现/隐藏时触发                                              | 出现则为 true，隐藏则为 false |
| popper-visible | 下拉框出现时触发，后于 visible-change 触发                         |                               |
| remove-tag     | 在多选模式下，移除 Tag 时触发                                      | 移除的 Tag 对应的节点的值     |
| clear          | 点击清除 icon 时触发                                               |                               |
| resize         | 更新弹框样式时触发                                                 | 内部 input 框节点             |
| after-leave    | 弹框关闭时触发                                                     |                               |
| keyboard-down  | 点击键盘向下箭头时触发，可以在这个事件中对下拉框中的某个进行 focus |                               |

## Methods

| 方法名              | 说明                   | 参数                                                             |
| ------------------- | ---------------------- | ---------------------------------------------------------------- |
| setValue            | 设置选择器内容         | val 可以为任意类型或者任意数组类型。为数组时，自动切换成多选模式 |
| togglePopperVisible | 切换下拉框显示或者隐藏 | visible（true/false），可选                                      |

## Slots

| 名称   | 说明                                                    |
| ------ | ------------------------------------------------------- |
| -      | 自定义下拉框内容                                        |
| tag    | 自定义多选 tag 显示，参数为{ tag }，setValue 传入的内容 |
| collapse-tag    | collapse-tags-tooltip为`true`时，自定义多选 tag 在提示框中的显示，参数为{ tag }，setValue 传入的内容 |
| prefix | 自定义前缀                                              |
