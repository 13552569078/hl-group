# Tabs 标签页

Tabs 用于分隔内容上有关联但属于不同类别的数据集合。

:::demo-fs Tabs 组件提供了标签功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

tabs/basic

:::

## Line 样式

只需要设置 `type` 属性为 `line` 就可以使标签改变为线条风格。

:::demo-fs

tabs/line

:::

## Button 样式

只需要设置 `type` 属性为 `button` 就可以使标签改变为按钮风格。

:::demo-fs

tabs/button

:::

## Padding属性

`nav-padding` 属性可以设置标签的两侧填充尺寸，它只接收`字符串` 类型。

:::demo-fs

tabs/padding

:::


## Gap属性

`gap` 属性可以设置标签之间的距离，它只接收`字符串` 类型。

:::demo-fs

tabs/gap

:::


## 标签高度设置

`nav-height` 属性可以改变标签的高度。它只接收`字符串` 类型。

:::demo-fs

tabs/nav-height

:::


## 内容区高度设置

`pane-height` 属性可以设置内容区的高度。它只接收`字符串` 类型。

:::demo-fs

tabs/pane-height

:::


## 位置

可以通过 `tab-position` 设置标签的位置

:::demo-fs 标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`

tabs/position

:::

## 自定义标签页

可以通过具名 `slot` 来实现自定义标签页的内容

:::demo-fs

tabs/slot

:::

## 动态增减标签页

增减标签页按钮只能在标签样式的标签页下使用

:::demo-fs

tabs/editable

:::

## 自定义增加标签页触发器

:::demo-fs

tabs/pane

:::

## Attributes

| 参数                 | 说明   | 类型          | 可选值                | 默认值              |
| -------------------- | ----------- | ------- | --------------------- | ------------------- |
| model-value / v-model | 绑定值，选中标签的 name   | string / number   | —  | 第一个标签的 name |
| type                 | 风格类型| string  | line                  | 显示为线条样式      |
| nav-height           | 标签的高度| string  | —                     | -               |
| nav-padding          | 标签的填充尺寸| string | —                     | -               |
| gap                  | 标签的间隔尺寸 | string   | —                     | -               |
| pane-height          | 内容的高度  | string  | —                     | -               |
| closable             | 标签是否可关闭  | boolean    | —                     | false               |
| show-pane            | 是否显示内容  | boolean  | —                     | true               |
| addable              | 标签是否可增加  | boolean   | —                     | false               |
| editable             | 标签是否同时可增加和关闭  | boolean   | —                     | false               |
| tab-position         | 标签所在位置  | string   | top/right/bottom/left | top                 |
| stretch              | 标签的宽度是否自撑开  | boolean   | -                     | false               |
| before-leave         | 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。 | Function(activeName, oldActiveName) | —     | — |

## Events

| 事件名称   | 说明                                    | 回调参数              |
| ---------- | --------------------------------------- | --------------------- |
| tab-click  | tab 被选中时触发                        | 被选中的标签 tab 实例 |
| tab-change | `activeName`改变时触发                 | (name: `TabPaneName`)                                               |
| tab-remove | 点击 tab 移除按钮后触发                 | 被删除的标签的 name   |
| tab-add    | 点击 tabs 的新增按钮后触发              | —                     |
| edit       | 点击 tabs 的新增按钮或 tab 被关闭后触发 | (targetName, action)  |

## Tab Pane Attributes

| 参数     | 说明   | 类型    | 可选值 | 默认值      |
| -------- | ----- | ------- | ------ | ------- |
| label    | 标签标题  | string  | —      | —    |
| disabled | 是否禁用  | boolean | —      | false   |
| name     | 与标签绑定值 value 对应的标识符，表示标签别名 | string / number  | —      | 该标签在标签列表中的顺序值，如第一个标签则为'1' |
| closable | 标签是否可关闭  | boolean | —      | false  |
| lazy     | 标签是否延迟渲染   | boolean | —      | false    |
