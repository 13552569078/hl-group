# Panel 面板

面板通常由头部、主体和脚注组成。Hongluan 中的面板大多数用做提示框、通知、对话框或当作勾勒内容区域的容器，当然不仅如此。

## 基本样式

Panel 组件包括 header、body、footer 三个 slot, body 是为默认 slot

:::demo-fs

panel/basic

:::

## 无边框样式

`borderless` 属性会使 Panel 组件变成无边框状态，同时它们直接的间距也会产生变化。

:::demo-fs `outlineless` 属性可以移除 Panel 外侧轮廓的边框

panel/borderless

:::

## 圆角属性

`radius` 属性会改变 Panel 组件的圆角样式

:::demo-fs

panel/radius

:::

## 间距属性

`padding` 属性会改变 Panel 组件的间距尺寸。`body-padding` 单独控制 body 的间距，优先级高于 `padding`。

:::demo-fs

panel/padding

:::

## 自定义类名

`header-class`，`body-class` 和 `footer-class` 属性允许你向对应的`header`，`body`，`footer` 增加自定义类

:::demo-fs

panel/class

:::

## 简单形态

Panel 组件允许移除 `header`和`footer` 结构，这样你可以更灵活的定义它的用途。

:::demo-fs

panel/simple

:::

## 可扩展的 Header

`header` 插槽可以的承载你的自定义元素和组件，你甚至不需要定义样式。

:::demo-fs 在 header 的 slot 中提供了的 `panel-header-left`，`panel-title`，`panel-header-right` 三个布局样式。

panel/header

:::

## 高级功能

`panel` 提供 `收起` 和 `全屏` 功能。你可以使用按钮来控制它们。

:::demo-fs 可以设置 fullscreen 为 `object` 类型，初始化全屏的 Panel 位置

panel/advanced

:::

## 自适应Body区域

你可以为 `panel` 设置 `full-body` 属性，可使其 `panel-body` 根据`panel`的高度自动伸长

:::demo-fs 你可以加上带有scroll属性的结构来使内容在面板内滚动，它可根据`panel`的高度自动适应而无需设置滚动区域的高度。

panel/full-body

:::

## Attributes

| 参数           | 说明                                  | 类型                                                                        | 可选值 | 默认值 |
| -------------- | --------------- | ------------------ | ------ | ------ |
| borderless     | 是否无边框                            | boolean   | —      | false  |
| outlineless    | 是否无轮廓边框                        | boolean | —      | false  |
| radius         | 圆角                                  | string| —      | \$xxs  |
| padding        | 间距                                  | string| —      | \$lg   |
| body-padding   | body 间距                             | string  | —      | \$lg   |
| footer-padding | footer 间距                           | string  | —      | \$lg   |
| header-class   | 为 header 添加自定义类名              | string   | —      | -      |
| header-style   | 为 header 添加自定义样式              | string   | —      | -      |
| body-class     | 为 body 添加自定义类名                | string | —      | -      |
| body-style   | 为 body 添加自定义样式              | string   | —      | -      |
| footer-class   | 为 footer 添加自定义类名              | string  | —      | -      |
| footer-style   | 为 footer 添加自定义样式              | string   | —      | -      |
| fullscreen     | 全屏模式                              | boolean / object{top: string; left: string; bottom: stirng; right: string;} | —      | false  |
| collapsed      | 收起模式，全屏模式下收起无效          | boolean   | —      | false  |
| full-body   | 可使其 panel-body 根据panel的高度自动伸长 | boolean  | —      | false  |

## Slots

| name   | 说明             |
| ------ | ---------------- |
| —      | Panel 主体的内容 |
| header | Panel 头部的内容 |
| footer | Panel 脚注的内容 |
