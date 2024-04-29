# Button 按钮

按钮组件也拥有统一的状态色，如：`primary`, `danger` 等。

::: warning
type为link类型的按钮将被废弃，请使用Link组件
:::

:::demo-fs

button/basic

:::

## 淡色按钮

当按钮附有状态色的情况下，你可以在加上 `effect="light"` 属性即可使它的颜色减淡。
:::demo-fs

button/color

:::

## 无填充按钮

`no-fill` 属性可使按钮默认为无填充样式。
:::demo-fs

button/no-fill

:::

## 按钮尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
:::demo-fs

button/size

:::

## 按钮形态

按钮可以设置不同的形态以满足不同的使用场景。
:::demo-fs

button/shape

:::

## 禁用状态

在Hongluan的交互原则中，无论是什么状态的按钮在禁用时都呈现以下灰色的状态，你可以使用`disabled`属性来定义按钮是否禁用。

:::demo-fs

button/disabled

:::

## 图标修饰

按钮内置了`icon`插槽，您可以使用 `@hongluan-ui/icons` 组件的图标集或者自定义 SVG 图标。`icon-position`属性可以设置图标的位置。当只有 icon 时，也可以直接嵌入 Icon 组件，而不用插槽

:::demo-fs 传入自定义图标时，使用 Icon 组件，这样可使得图标与按钮之间更为和谐。

button/icon

:::

## 对齐方式

`rational` 属性能使按钮图标和文字的排列方式更为合理。
:::demo-fs

button/rational

:::

## 按钮组

使用 Group 容器，来构建一个按钮组。

:::demo-fs 更多的分组组功能，请参考 Group 组件文档。

button/group

:::

## 与表单元素融合

`group` 容器不仅可以在按钮之间融合样式，还可以与其他表单元素相互融合。

:::demo-fs

button/form

:::

## 加载状态

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo-fs 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

button/loading

:::

## 拉伸按钮

使用 block 属性可以把按钮拉伸至与父元素等宽

:::demo-fs

button/block

:::

## Attributes

| 参数          | 说明                        | 类型             | 可选值                                             | 默认值 |
| ------------- | --------------------------- | ---------------- | -------------------------------------------------- | ------ |
| size          | 尺寸                        | string           | sm / md / lg                                       | —      |
| type          | 类型                        | string           | primary / success / warning / danger / info / link | —      |
| equal         | 是否方形按钮                | boolean          | —                                                  | false  |
| round         | 是否圆边按钮                | boolean          | —                                                  | false  |
| loading       | 是否加载中状态              | boolean          | —                                                  | false  |
| effect        | 主题颜色                    | string           | light                                              | -      |
| no-fill       | 无填充背景色                | boolean          | —                                                  | false  |
| block         | 是否拉伸至父元素 100%的宽度 | boolean          | —                                                  | false  |
| disabled      | 是否禁用状态                | boolean          | —                                                  | false  |
| icon-position | 图标的位置                  | string           | left / right                                       | —      |
| autofocus     | 是否默认聚焦                | boolean          | —                                                  | false  |
| native-type   | 原生 type 属性              | string           | button / submit / reset                            | button |

## Slots

| Name    | Description        |
| ------- | ------------------ |
| —       | 自定义内容         |
| icon    | 自定义图标         |
| loading | 自定义加载状态图标 |
