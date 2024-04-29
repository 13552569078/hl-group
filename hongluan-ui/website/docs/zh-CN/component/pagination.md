# Pagination 分页

当数据量过多时，使用分页分解数据。

:::demo-fs 设置`layout`，表示需要显示的内容，用逗号分隔，布局元素会依次显示。`prev`表示上一页，`next`为下一页，`pager`表示分页指示器的列表，除此以外还提供了`jumper`和`total`，`size`和特殊的布局符号`->`，`->`后的元素会靠右显示，`jumper`表示跳页元素，`total`表示总条目数，`size`用于设置每页显示的页码数量。

pagination/basic

:::

## 设置最大页码按钮数

通过`pager-count`属性可以设置最大页码按钮数。

:::demo-fs 默认情况下，当总页数超过 7 页时 Pagination 会折叠多余的页码按钮。

pagination/pager-count

:::

## 尺寸修饰

通过`size`属性可以设置分页的尺寸。

:::demo-fs 它的尺寸与`button`、`input`等form表单元素的尺寸保持一致

pagination/size

:::

## 间隔

通过`gap`属性可以设置分页元素的间隔。

:::demo-fs `pager-gap` 属性可以设置分页指示器直接的间隔

pagination/gap

:::

## Line 样式

在空间有限的情况下，可以使用简单的小型分页。

:::demo-fs

pagination/line

:::

## 满宽与排列方式

使用 `block` 属性会使分页组件变为块级样式。

:::demo-fs

pagination/block

:::

## 排列方式

使用 `align` 属性能够设置分页组件的排列方式。

:::demo-fs

pagination/align

:::

## 附加功能

根据使用需求，你可以添加其他的功能模块，还可以通过自定义元素和 `align` 属性来布局一个两端对齐的分页组件。

:::demo-fs 此例是一个完整的用例，使用了`size-change`和`current-change`事件来处理页码大小和当前页变动时候触发的事件。`page-sizes`接受一个整型数组，数组元素为展示的选择每页显示个数的选项，`[100, 200, 300, 400]`表示四个选项，每页显示 100 个，200 个，300 个或者 400 个。

pagination/extra

:::

## 当只有一页时隐藏分页

当只有一页时，通过设置 `hide-on-single-page` 属性来隐藏分页。

:::demo-fs

pagination/single-page

:::

## Attributes

| 参数                | 说明   | 类型     | 可选值   | 默认值                                 |
| ------------------- | ------------- | -------- | ----------------- | ----------------- |
| line                | 是否使用线条分页样式  | boolean  | —   | false   |
| align               | 分页组件的排列方式| string   | `left`, `center`, `right`, `around`, `between`     | left   |
| size                | 设置分页组件的尺寸   | string   | `sm`, `md`, `lg` | md      |
| page-size           | 每页显示条目个数，支持 v-model 双向绑定| number   | —   | 10    |
| gap                 | 设置分页元素之间的间隙  | string  | —  | -     |
| pager-gap                | 设置分页指示器之间的间隙  | string  | —    | -                                  |
| total               | 总条目数 | number   | —       | —                                      |
| page-count          | 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性 | Number   | —     | —     |
| pager-count         | 分页指示器按钮的数量，当总页数超过该值时会折叠  | number   | 大于等于 5 且小于等于 21 的奇数 | 7   |
| current-page        | 当前页数，支持 v-model 双向绑定符  | number   | —   | 1     |
| layout              | 组件布局，子组件名用逗号分隔  | string   | `sizes`, `prev`, `pager`, `next`, `jumper`, `total`, `slot` | 'prev, pager, next, jumper, total' |
| page-sizes          | 每页显示个数选择器的选项设置 | number[] | —    | [10, 20, 30, 40, 50, 100]              |
| popper-class        | 每页显示个数选择器的下拉框类名 | string   | —     | —                                      |
| prev-text           | 替代图标显示的上一页文字 | string   | —      | —                                      |
| next-text           | 替代图标显示的下一页文字 | string   | —      | —                                      |
| disabled            | 是否禁用  | boolean  | —    | false       |
| hide-on-single-page | 只有一页时是否隐藏  | boolean  | —     | -       |
| block               | 块级样式   | boolean  | —        | false     |


<blockquote class="m-t-md">

***组件现在会检查一些不合理的用法，如果发现分页器未显示，可以核对是否违反以下情形：***

- total 和 page-count 必须传一个，不然组件无法判断总页数；优先使用 page-count;
- 如果传入了 current-page 必须监听 current-page 变更的事件（onUpdate:currentPage）；否则分页切换不起作用；
- 如果传入了 page-size，且布局包含 page-size 选择器（即 layout 包含 sizes），必须监听 page-size 变更的事件（onUpdate:pageSize），否则 page-size 切换不起作用；

</blockquote>


## Events

| 事件名称       | 说明                               | 回调参数 |
| -------------- | ---------------------------------- | -------- |
| size-change    | pageSize 改变时会触发              | 每页条数 |
| current-change | currentPage 改变时会触发           | 当前页   |
| prev-click     | 用户点击上一页按钮改变当前页后触发 | 当前页   |
| next-click     | 用户点击下一页按钮改变当前页后触发 | 当前页   |

<blockquote class="m-t-md">

***以上事件不推荐使用（但由于兼容的原因仍然支持，在以后的版本中将会被删除）；如果要监听 current-page 和 page-size 的改变，使用 v-model 双向绑定是个更好的选择。***

</blockquote>

## Slots

| name | 说明                                      |
| ---- | ----------------------------------------- |
| —    | 自定义内容，需要在 `layout` 中列出 `slot` |
| prev-icon    | 自定义prev图标 |
| next-icon    | 自定义next图标 |
