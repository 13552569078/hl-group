# SimpleTable 简单表格

SimpleTable 是一款非常轻量的表格组件。

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

:::demo-fs

simple-table/basic

:::

## 边框样式

`border` 属性可为表格加上设置边框样式

:::demo-fs

simple-table/border

:::

## 间距设置

`padding` 属性可为表格加上设置不同的间距尺寸， 同时`cell-padding` 可设置TD的间距尺寸

:::demo-fs

simple-table/padding

:::

## 悬停样式 Hover

`hover` 属性可以在悬停在某一行时，呈现背景色。

:::demo-fs

simple-table/hover

:::

## 条纹样式

`stripe`属性可以创建条纹的表格，以便区分出不同行的数据。

:::demo-fs stripe 还接收 `even` 或者 `odd` 属性来设置条纹显示的顺序。默认为 `odd` 奇数

simple-table/stripe

:::

## 尺寸修饰

`size` 属性可以设置表格的尺寸。

:::demo-fs

simple-table/size

:::

## 拖拽改变列宽

`resize` 属性设置为 `true`，可以拖拽表格头的列，从而改变列宽。

:::demo-fs

simple-table/resize

:::

## 列表样式

`list` 可以将传统的表格呈现成列表的状态。

:::demo-fs-dark 列表样式会为每一行表格加上圆角，你也可以自定义每一行的间距，例如：`gap="var(--xs)"`

simple-table/list

:::

## 固定表头

为 SimpleTable 组件加上 `fixed-header` 属性可以使表头固定在顶端。

:::demo-fs

simple-table/fixed-header

:::


## 固定列

为某一列增加 `fixed` 属性可以使它固定，同时你可以传递 `left` `right` 来控制它固定在什么地方。例如 `fixed: 'left'`。`fixed` 属性还可以为 `object` 类型，详细控制 `fixed` 的距离。

:::demo-fs

simple-table/fixed-column

:::

## 固定行

通过 `cellStyle` 属性还可以实现固定行效果。

:::demo-fs

simple-table/fixed-row

:::

## 固定头和列

表头和列可以同时设置固定。

:::demo-fs

simple-table/fixed-all

:::

## 下拉加载更多

配合 Scrollbar 组件可实现下拉加载更多。

:::demo-fs

simple-table/load-more

:::

## 移除表头

`show-header` 属性可以移除表头，让其展示为一个纯列表样式。

:::demo-fs

simple-table/header

:::

## 排序

可以通过连续点击相同的排序图标恢复默认排序。如果想自定义列头，但仍然使用默认排序图标，在非setup语法下从 SimpleTable 组件中解构出 SortableIcon 组件；setup语法请参考如下源码。

:::demo-fs 列中可以设置sortable属性，值为：` true / false / 'descending' / 'ascending' ` ，并通过监听sort-change事件处理数据排序

simple-table/sortable

:::

## 筛选

如果想自定义列头，但仍然使用默认排序图标，在非setup语法下从 SimpleTable 组件中解构出 FilterIcon 组件；setup语法请参考如下源码。

:::demo-fs 列中可以设置 `filter` 对象，提供 `slotName`（必选）、`placement`（参考Popover文档）、`popperClass` 属性。slot中提供 `close` 方法用来手工关闭弹出框。

simple-table/filter

:::

## 高亮行

选择单行数据时使用色块表示。

:::demo-fs SimpleTable 组件提供了单选的支持， 只需要配置`highlight-current-row`属性即可实现单选。 之后由`current-change`事件来管理选中时触发的事件，它会传入 currentRow，oldCurrentRow。

simple-table/highlight

:::

## 展开行

当行内容过多并且不想显示横向滚动条时，可以使用 SimpleTable 展开行功能。可以定义多列同时展开。

:::demo-fs 通过设置 expand 对象 和 slot 可以开启展开行功能。expand有两个属性：`slotName`，`hideLabel`，hideLabel默认为false

simple-table/expand

:::

## 树形数据与懒加载

支持树类型的数据的显示。 当 row 中包含 children 字段时，被视为树形数据。 渲染树形数据时，必须要指定 row-key。支持子节点数据异步加载。 设置 Table 的加载函数 load 。 通过指定 row 中的hasChildren字段来指定哪些行是包含子节点。 children与hasChildren都可以通过 `tree-props` 配置。`first-column-index` 属性用来设置展开行为所作用的列。

:::demo-fs 当children字段有数组值时，将会忽略hasChildren字段。***需要异步加载数据时，一定要谨慎设置`default-expand-all`属性为true值***

simple-table/tree

:::

## 合并行或列

多行或多列共用一个数据时，可以合并行或列。

:::demo-fs 通过给 table 传入span-method方法可以实现合并行或列， 方法的参数是一个对象，里面包含当前行 row、当前列 column、当前行号 rowIndex、当前列号 columnIndex 四个属性。 该函数可以返回一个包含两个元素的数组，第一个元素代表 rowspan，第二个元素代表 colspan。 也可以返回一个键名为 rowspan 和 colspan 的对象。

simple-table/span-method

:::

## 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

:::demo-fs 通过`cols` 的 `children` 属性嵌套实现多级表头

simple-table/multi-header

:::

## 表尾合计行

若表格展示的是各类数字，可以在表尾显示各列的合计。

:::demo-fs 可以通过自定义 `foot` slot实现

simple-table/foot

:::

## 隐藏列

`toggleColumn` 方法支持对列的隐藏或者显示操作。

:::demo-fs 暂不支持对多级表头以及存在合并单元格的表格进行操作

simple-table/hide-column

:::

## 空数据

:::demo-fs

simple-table/empty

:::

## 未知数据

:::demo-fs 在传递的数据为 `null` 或者 `undefined` 时，可以自定义 `unknown` slot

simple-table/unknown

:::

## Attributes

| 参数         | 说明                        | 类型    | 可选值                                | 默认值 |
| ------------ | ---------------------------------- | ------- | ------------------------------------- | ------ |
| row-key      | 行数据的 Key，用来优化 SimpleTable 的渲染。***如果表格数据标识符不是id字段，请一定要设置此值***          | string / function(row)\: string  | - |  id      |
| border       | 为表格设置边框样式          | string  | borderless/bordered/border-x/border-y |        |
| padding      | 设置表格两端的 padding 尺寸 | string  | 通用尺寸标签/自定义尺寸               |        |
| cell-padding      | 设置Td的 padding 尺寸 | string  | 通用尺寸标签/自定义尺寸               |        |
| gap          | list模式下，设置表格行间距 | string  | css尺寸               |        |
| gap-x        | list模式下，设置表格行横向间距 | string  | css尺寸               |        |
| gap-y        | list模式下，设置表格行纵向间距 | string  | css尺寸               |        |
| hover        | 表格悬停效果                | boolean |                                       |        |
| stripe       | 表格条纹效果                | boolean / string | true / false / odd / even                                      | false  |
| list         | 列表样式                    | boolean |                                       | false  |
| auto-height  | 使Th和Td的高度变为auto       | boolean |                                       | false  |
| fixed-header | 固定表头                    | boolean |                                       | -      |
| fixed-footer | 固定表尾                    | boolean |                                       | -      |
| show-header  | 是否显示表头                | boolean | -                                     | true   |
| size         | 表格大小                    | string  | sm / md / lg                          | -      |
| resize         | 是否可以拖拽表头改变列宽                    | boolean  | -                          | false      |
| scroll-container         | 设置固定列时，如果滚动容器不是表格的直接父元素或者Scrollbar组件，需要设置此属性，用以支持滚动时固定列阴影效果                    | string / HTMLElement  | -                          | -      |
| highlight-current-row | 是否要高亮当前行    | boolean  | -     | false      |
| expand-row-keys | 默认展开，同时适用行展开与树展开。行展开时用行rowKey+slotName作为唯一标识符；树展开时使用rowKey作为唯一标识符。***数组值一定是字符串。***    | array  | -     | -      |
| default-expand-all | 是否默认展开所有行，当 SimpleTable 包含展开行存在或者为树形表格时有效    | boolean  | -     | false      |
| row-class-name | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。    | function({ row, rowIndex }) / string  | -     | -      |
| row-style | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。    | function({ row, rowIndex }) / object  | -     | -      |
| cell-class-name | 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。    | function({ row, column, rowIndex, columnIndex }) / string  | -     | -      |
| cell-style | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。    | function({ row, column, rowIndex, columnIndex }) / object  | -     | -      |
| header-row-class-name  | 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。  | function({ row, rowIndex }) / string  | -  | -      |
| header-row-style         | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。  | function({ row, rowIndex }) / object  | -  | -      |
| header-cell-class-name         | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。  | function({ row, column, rowIndex, columnIndex }) / string  | -  | -      |
| header-cell-style         | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。  | function({ row, column, rowIndex, columnIndex }) / object  | -  | -      |
| span-method         | 合并行或列的计算方法  | function({ row, column, rowIndex, columnIndex })  | -  | -      |
| first-column-index         | 树形展开操作作用的列  | number  | -  | 0      |
| tree-props         | 渲染嵌套数据的配置选项                    | object  | -                          | `{ hasChildren: 'hasChildren', children: 'children' }`      |
| load         | 加载子节点数据的函数，函数第二个参数包含了节点的层级信息                    | function(row, treeNode, resolve)  | -                          | -      |
| cols         | 列配置，参见下表                    | array  | -                          | -      |

## cols

| 参数           | 说明                                       | 类型    | 可选值            | 默认值 |
| -------------- | ------------------------------------------ | ------- | ----------------- | ------ |
| columnKey      | 列key，如果动态切换表格列，需要设置此值。否则列宽会计算错误   | string  |     |        |
| title          | 表格标题                                   | string  |                   |        |
| prop           | 表格列属性名称                             | string  |                   |        |
| showTooltip    | 是否显示 tooltip，需要配合列 width 值使用  | boolean |                   | false  |
| tooltipProps   | tooltip 属性，参考 Popover 组件            | object  |                   |        |
| align          | 水平对齐方式                                   | string  | left/center/right | left   |
| width          | 列宽                                       | string  |                   | -      |
| min-width          | 最小列宽                                       | string  |                   | -      |
| max-width          | 最大列宽                                       | string  |                   | -      |
| fixed          | 固定列                                     | string / object  | left / right / { position: string; distance: string; }        | -      || slotName       | 列 slot 名称，默认参数为 `row, column, rowIndex, columnIndex` 请参考示例   | string  | -                 | -      |
| headerSlotName | 列头 slot 名称，默认参数为 col，请参考示例 | string  | -                 | -      |
| sortable       | 是否为排序列 | boolean / string  | true / false / 'ascending' / 'descending'   | -      |
| filter         | 列筛选设置 | object{ slotName: string, placement: string, popperClass: string }  |  -  | -      |
| expand         | 展开列设置 | object{ slotName: string, hideLabel: boolean }  |  -  | -      |
| children       | 子列信息 |  array |  -  | -      |
| formatter       | 用来格式化内容 |  function(row, column, cellValue, rowIndex, columnIndex) |  -  | -      |

## Events

| 事件名称   | 说明           | 回调参数                            |
| ---------- | -------------- | ----------------------------------- |
| row-click  | 行单击事件     | row, rowIndex, event                |
| cell-click | 单元格单击事件 | row, col, rowIndex, colIndex, event |
| sort-change | 排序事件 | prop, sort |
| current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow |
| expand | 展开事件 | expanded, rowkey, slotName |
| tree-expand | 树展开事件 | expanded, row |

## Methods

| 方法名 | 说明                            | 参数 |
| ------ | ------------------------------- | ---- |
| toggleExpand  | 展开/折叠行。由于每行可能有多个展开，所以需要传递需要展开的slotName | rowKey, slotName    |
| toggleExpandTree  | 展开树 | row    |
| toggleColumn  | 显示/隐藏列 | index, show（show可选）    |
| setCurrentRow  | 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态 | row    |
| clearTooltip  | 隐藏tooltip | -    |

## Slots

|   name  | 说明           |
| ------- | -------------- |
| empty   | 无数据时的提示 |
| unknown   | 表格数据为null或者undefined时，自定义内容 |
| more   | 下拉加载时，自定义内容 |
| foot   | 表尾 |
