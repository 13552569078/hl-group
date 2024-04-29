# Group 组

Group 是鸿鸾中最具有特点的功能之一，它更多用于页面元素的布局构造，当然不仅如此。

## 基本使用

通常我们将元素与元素的组合用`<div>`包裹起来，此时不妨尝试将它们放到一个`group`组里。

:::demo-fs 为了更好的对子元素进行样式控制，Group 组件会自动为子元素增加 `.group-item` 类。

group/basic

:::

## Block

默认的 Group 组件是 `display:inline-flex` 属性。你可以使用 `block` 将其设置为块元素。

:::demo-fs

group/block

:::

## 换行

使用`wrap`类可以使组元素超出`group`宽度时自动换行

:::demo-fs 你也可以通过插入一行宽度为 100%的 div 来使元素强制换行

group/wrap

:::

## 排列方式

为 Group 组件设置 `dir="horizontal"` 或 `dir="vertical"` 属性即可改变它们的排列方式。

:::demo-fs

group/dir

:::

## 融合

增加 merge 属性可使组内成员非常友好的融合。哪怕组内成员拥有各自的边距和圆角也能被正确的处理。

:::demo-fs 使用 `deep-merge` 可以使带有`merge-item`类的组成员的深度融合，无论它的上面嵌套了多少层的 dom 结构。

group/merge

:::

## 缩进

缩进标签 `indent` 用于缩减组成员之间的距离，你可以直观的看到融合的元素会自动减去相连接的边框。

:::demo-fs 推荐使用`gap`属性来设置间隙，因为`indent`使用的是`margin:`属性所以它们会受到 dom 渲染顺序的影响。如下：

group/indent

:::

## 间隙

使用`gap`[原生属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-gap)来设置组成员的间隙。

:::demo-fs `gap` 属性同时设置了横向和纵向的间隙，你也可以单独设置`gap-x=""`和`gap-y=""` 属性

group/gap

:::

## 对齐方式

为 Group 组件设置 `align` 属性即可改变组成员的对齐方式。

:::demo-fs

group/align

:::

:::tip
为 `align` 设置 `items-left` , `items-right` 等对齐样式，即可改变子元素的横向排列方式，参考 [Flex 弹性布局](#/zh-CN/style/flex)
:::

## 自适应

为 Group 组件增加 `full` 属性，可使组和组内成员都拉伸至父元素的宽度或高度。

:::demo-fs 为 `full`属性传入 `full-x` 或者 `full-y` 可以单独设置它的拉伸方向

group/full

:::

## 静态组成员

赋予组成员 `.static` 类，可将组成员设置成静态，这样它就不会根据宽度而变化了。

:::demo-fs

group/static

:::

## 组嵌套

组里面还可以再嵌套组，这样可以构造更加复杂的布局。使用`deep-merge`属性，还可使它们的下级节点之间还保持相互融合。

:::demo-fs

group/nested

:::

## Size

`size` 属性可以统一设置子组件中支持 size 属性的值。

:::demo-fs

group/size

:::

## Disabled

`disabled` 属性可以统一设置子组件中支持 disabled 属性的值。

:::demo-fs

group/disabled

:::

## Fill

`fill` 属性可以统一设置子组件中支持 fill 属性的值。

:::demo-fs

group/fill

:::

## Attributes

| 参数       | 说明               | 类型             | 可选值                                   | 默认值     |
| ---------- | ------------------ | ---------------- | ---------------------------------------- | ---------- |
| dir        | 排列方向           | string           | horizontal / vertical                    | horizontal |
| align      | 对齐方式           | string           | 参考 [Flex 弹性布局](#/zh-CN/style/flex) |            |
| merge      | 融合               | boolean          | -                                        | false      |
| deep-merge | 深度融合           | boolean          | -                                        | false      |
| static     | 静态               | boolean          | —                                        | false      |
| indent     | 边距缩进           | boolean / string | 自定义缩进尺寸                           | false      |
| gap        | 间隙               | string           | —                                        | -          |
| gap-x      | 横向间隙           | string           | —                                        | -          |
| gap-y      | 纵向间隙           | string           | —                                        | -          |
| full       | 拉伸至父元素的尺寸 | boolean / string | full-x (横向拉伸) / full-y (纵向拉伸)    | false      |
| wrap       | 换行               | boolean          | —                                        | false      |
| block      | 转换为块元素       | boolean          | —                                        | false      |
| size       | 尺寸               | string           | 参考子组件支持 size 属性的值             | -          |
| disabled   | 禁用状态           | boolean          | 参考子组件支持 disabled 属性的值         | false      |
| fill       | 填充状态           | boolean          | 参考子组件支持 fill 属性的值             | false      |
