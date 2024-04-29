# Alert 警告

用于页面中展示重要的提示信息。

:::demo-fs Alert 组件提供四种主题，由`type`属性指定，默认值为`info`。

alert/basic

:::

## light 颜色

当 Alert 组件附有状态色的情况下，你可以在加上 `effect="light"` 属性即可使它的颜色减淡。

:::demo-fs

alert/light

:::

## 自定义关闭按钮

自定义关闭按钮为文字或其他符号。

:::demo-fs 在 Alert 组件中，你可以设置是否可关闭，关闭按钮的文本以及关闭时的回调函数。`closable`属性决定是否可关闭，接受`boolean`，默认为`true`。你可以设置`close-text`属性来代替右侧的关闭图标，注意：`close-text`必须为文本。设置`close`事件来设置关闭时的回调。

alert/close

:::

## 带有 icon

表示某种状态时提升可读性。

:::demo-fs 通过设置`show-icon`属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。

alert/icon

:::

## 边框样式

:::demo-fs 通过设置`dashed`属性来设置虚线边框。

alert/border

:::

## 带有辅助性文字介绍

包含标题和内容，解释更详细的警告。

:::demo-fs 除了必填的`title`属性外，你可以设置`description`属性来帮助你更好地介绍，我们称之为辅助性文字。辅助性文字只能存放单行文本，会自动换行显示。

alert/description

:::

## 带有 icon 和辅助性文字介绍

:::demo-fs 同时具有 icon 和辅助性文字。

alert/icon-description

:::

## 自定义内容

:::demo-fs

alert/slot

:::

## Attributes

| 参数        | 说明                               | 类型    | 可选值                     | 默认值 |
| ----------- | ---------------------------------- | ------- | -------------------------- | ------ |
| title       | 标题                               | string  | —                          | —      |
| type        | 类型                               | string  | success/warning/info/error | info   |
| effect      | 样式主题                           | string  | light                      | -      |
| description | 辅助性文字。也可通过默认 slot 传入 | string  | —                          | —      |
| closable    | 是否可关闭                         | boolean | —                          | true   |
| close-text  | 关闭按钮自定义文本                 | string  | —                          | —      |
| show-icon   | 是否显示图标                       | boolean | —                          | false  |
| dashed   | dashed样式                       | boolean | —                          | false  |

## Slots

| Name  | Description |
| ----- | ----------- |
| —     | 描述        |
| icon  | 自定义 icon |
| title | 标题的内容  |

## Events

| 事件名称 | 说明                    | 回调参数 |
| -------- | ----------------------- | -------- |
| close    | 关闭 alert 时触发的事件 | —        |
