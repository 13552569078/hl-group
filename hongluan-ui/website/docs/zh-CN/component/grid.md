# Grid 栅格系统

Hongluan 使用了 `24列` 栅格系统，通过对 `row` 和 `col` 组件的定义，即可轻松创造出丰富的响应式布局

## 基础布局

使用 `span` 属性来为每一个 `col` 设置比例 例如 `span="col-12"`

:::demo-fs `24 列` 栅格表示你可以将宽度拆分为 24 列，24 为 100%、12 为 50%、6 为 25%，依此类推。所以你可以将 `col-*`设置为 1-24 的任意数值，例如：`col-5`

grid/basic

:::

## 响应式

你可以为每个成员 `col` 赋予响应窗口尺寸的标签，例如 `span="md:col-12"`, 并且可以多同时设置多个响应式个标签。

:::demo-fs 响应式尺寸有 `sm` `md` `lg` `xl` `xxl` , 参考页尾的窗口响应对照表

grid/response

:::

## 均等分布列

当你未设置 `col` 比例的时候，它们的宽度将被均等分配，同时也支持响应式尺寸例如： `md:col` `lg:col` 等

:::demo-fs 所有自动布局类的栅格系统如：Grid 自动网格布局 和 Flow 自动流布局 都需要为 Col 组件设置`span="col"`属性。

grid/col

:::

## 偏移

你可以使用 `offset` 属性来偏移某个 `col` 列，例如 `offset="offset-8"`

:::demo-fs `offset` 拥有跟 `col` 一样的宽度比例设定和响应式的特性。例如：`md:offset-8`

grid/offset

:::

## 间隙设置

使用 [Hongluan 规范化尺寸](#/zh-CN/style/sizing)来设置 `col` 之间的间隙, 例如为 Row 组件增加 `gap="var(--md)"` 属性

:::demo-fs 同时还可以使用 `gap-x` 和 `gap-y` 属性来单独设置横向和纵向间隙。`gap`属性允许你传递任意的尺寸单位。

grid/gap

:::

## 横向对齐

`align` 属性可改变子元素的排列方式，例如 `align="items-center"`

:::demo-fs

grid/align-h

:::

## 纵向对齐

为 `align` 属性指定 `items-top` , `items-middle` , `items-bottom` 即可改变子元素的纵向排列方式。

:::demo-fs

grid/align-v

:::

:::tip
 为 `align` 设置 `items-left` , `items-top` 等对齐样式，即可改变子元素的横向排列方式，参考 [Flex 弹性布局](#/zh-CN/style/flex)
:::

## Grid 自动网格布局

网格布局（Grid）是目前最为强大的 CSS 布局方案。

:::demo-fs 同样，`count-*` 也支持相同的响应式尺寸，例如： `xl:count-3`,

grid/count

:::

### 排列顺序

`dir` 属性可以设置网格的排列顺序，例如 `dir="vertical"`

:::demo-fs dir 支持的参数有： 横向排序 `vertical` 和 纵向排序 `horizontal`

grid/dir

:::

### 跨度设置

Col 组件的 `span` 属性，支持传入跨度例如：`.col-span-*`，同时也支持传入多个响应式跨度标签

:::demo-fs 可以设置跨行`.row-span-*`和跨列`.col-span-*`也允许同时设置它们。同时跨度类也支持响应尺寸标签，例如 `lg:row-span-*`或`lg:col-span-*`

grid/span

:::

## Flow 流布局

流布局能够自动根据可用的空间插入元素。通常用于展现瀑布流的布局方案。

:::demo-fs `flow` 属性能够创建瀑布流式布局。 `count` 表示列数，可以设置成数字或者使用断点字符串设置。

grid/flow

:::

## Row Attributes

| 参数   | 说明                            | 类型          | 可选值                               | 默认值   |
| ------ | ------------------------------- | ------------- | ------------------------------------ | -------- |
| align  | 栅格的排列方式                  | string        | [参考 Flex 布局](#/zh-CN/style/flex) | -        |
| layout | 自动布局类型                    | string        | flow / grid                          | -        |
| count  | 自动布局列数                    | string/number |                                      | 1        |
| gap    | 同时设置 col 列的横向和纵向间距 | string        | 规范化尺寸/自定义数值                | -        |
| gap-x  | col 列的横向间距                | string        | 规范化尺寸/自定义数值                | -        |
| gap-y  | col 列的纵向间距                | string        | 规范化尺寸/自定义数值                | -        |
| dir    | 自动布局的排列方向              | string        | vertical / horizontal                | vertical |

## Col Attributes

| 参数   | 说明                                   | 类型                            | 可选值 | 默认值 |
| ------ | -------------------------------------- | ------------------------------- | ------ | ------ |
| span   | col 占据的格数                         | number/string                   | —      |        |
| offset | col 偏移的格数                         | number/string                   | —      |        |
| none   | auto                                   | number/object (例如： .col)     | —      | —      |
| sm     | `≥640px` 响应式栅格数或者栅格属性对象  | number/object (例如： .sm:col)  | —      | —      |
| md     | `≥768px` 响应式栅格数或者栅格属性对象  | number/object (例如： .md:col)  | —      | —      |
| lg     | `≥1024px` 响应式栅格数或者栅格属性对象 | number/object (例如： .lg:col)  | —      | —      |
| xl     | `≥1280px` 响应式栅格数或者栅格属性对象 | number/object (例如： .xl:col)  | —      | —      |
| xxl    | `≥1536px` 响应式栅格数或者栅格属性对象 | number/object (例如： .xxl:col) | —      | —      |
