# List 列表

使用 List 组件即可创建一个简洁且漂亮的列表组件。

:::demo-fs

list/basic

:::

## Hover 样式

`hover` 属性可以使 item 在悬停时拥有背景效果，同时还有鼠标手势的变化来示意这是一个可点击的对象。

:::demo-fs

list/hover

:::

## 插槽

ListItem 组件提供 `prefix` 和 `suffix` 两个插槽来自定义展示在文本前后的附加内容。

:::demo-fs

list/slot

:::

## 边框样式

使用 `border` 属性可以设置不同的边框样式。

:::demo-fs

list/border

:::

## 间距样式

List 组件提供 `gap` 和 `item-gap` 属性来分别定义 ListItem 之间的间距和 ListItem 内部元素的间距。

:::demo-fs

list/gap

:::

## 缩进和融合属性

使用 `indent` 属性可以使 list-item 向下缩进一个像素`margin-bottom: -1px`，`marge` 属性可使得 ListItem 的圆角自动融合。

:::demo-fs List 组件使用 Group 组件来构建，所以继承了 Group 组件的部分特性

list/indent

:::

## 路由

`to` 属性可以设置要跳转的路由参数，使用方法可以参考vue-router的文档。

:::demo-fs

list/router

:::

## Attributes

| 参数    | 说明                                            | 类型    | 可选值                   | 默认值 |
| ------- | ----------------------------------------------- | ------- | ------------------------ | ------ |
| hover   | 为 list-item 设置悬停样式                       | boolean | -             | false  |
| indent  | 使 list-item 向下缩进 1px                       | boolean | -             | false  |
| merge   | 使 list-item 之间融合，以更加协调的展示圆角样式 | boolean | -             | false  |
| gap     | 设置 list-item 之间的间距                       | string  | 通用间距标签             | -      |
| item-gap | 设置 list-item 内部元素的间距                   | string  | 通用间距标签             | -      |
| border  | 设置 list-item 的边框样式                       | string  | bordered / border-x | -      |

### List Item Attributes

| 参数    | 说明                                                               | 类型          | 可选值 | 默认值 |
| ------- | ------------------------------------------------------------------ | ------------- | ------ | ------ |
| to      | 路由跳转对象，同 `vue-router` 的 `to`                              | string/object | —      | —      |
| replace | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录 | boolean       | —      | false  |

## List Item Slots

| Name  | Description |
| ----- | ----------- |
| —     | 内容        |
| prefix  | 前缀插槽 |
| suffix  | 后缀插槽 |