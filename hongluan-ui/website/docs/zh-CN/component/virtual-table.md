# VirtualTable 虚拟表格

VirtualTable 是基于SimpleTable封装的，用以展示大规模数据的表格。除了下面注意的几点外，SimpleTable的功能同样支持。

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

<blockquote>
<h5>虚拟表格的几个注意事项：</h5>
<ul>
  <li class="m-b-sm"><strong class="text-danger">特别注意：在处理展开行以及树形结构时，虚拟表格会直接修改传入的data值（加行，加行属性等），请注意此点！</strong></li>
  <li class="m-b-sm">由于虚拟表格在处理展开行以及树形结构时会修改data值，使用者进行表格操作时：例如删除行，增加行，<strong class="text-primary">需要一并处理被修改后的数据</strong>。所以，建议虚拟表格只用来展示大规模属性，而不进行数据操作</li>
  <li class="m-b-sm"><code>height</code>与<code>item-size</code>属性需要设置值，不支持表格行动态高度</li>
  <li class="m-b-sm">不支持<code>expand-row-keys</code>与<code>default-expand-all</code>属性</li>
  <li>不支持拖拽表头改变列宽</li>
</ul>
</blockquote>

## 基本

:::demo-fs

virtual-table/basic

:::

## 动态加载数据

可以设置 `total` 属性值大于实际的 `data` 数组长度，然后利用 `item-rendered` 事件动态加载数据

:::demo-fs

virtual-table/loading

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
| show-header  | 是否显示表头                | boolean | -                                     | true   |
| size         | 表格大小                    | string  | sm / md / lg                          | -      |
| highlight-current-row | 是否要高亮当前行    | boolean  | -     | false      |
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
| height         | 表格即视窗高度                    | number / string  | -                          | 300      |
| item-size         | ***行高，固定值，单位像素。***                    | number  | -                          | 48      |
| total         | 数据总条数                    | number  | -                          | -      |
| scrollbar-always-on         | 是否一直显示滚动条                    | boolean  | -                          | false      |
| cache         | 列表上，下缓存的数量                    | number  | -                          | 2      |
| cols         | 列配置，参见下表                    | array  | -                          | -      |

## cols

| 参数           | 说明                                       | 类型    | 可选值            | 默认值 |
| -------------- | ------------------------------------------ | ------- | ----------------- | ------ |
| title          | 表格标题                                   | string  |                   |        |
| prop           | 表格列属性名称                             | string  |                   |        |
| showTooltip    | 是否显示 tooltip，需要配合列 width 值使用  | boolean |                   | false  |
| tooltipProps   | tooltip 属性，参考 Popover 组件            | object  |                   |        |
| align          | 水平对齐方式                                   | string  | left/center/right | left   |
| width          | 列宽                                       | string  |                   | -      |
| fixed          | 固定列                                     | string / object  | left / right / { position: string; distance: string; }        | -      || slotName       | 列 slot 名称，默认参数为 row，请参考示例   | string  | -                 | -      |
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
| item-rendered | 行动态渲染事件 | cacheStart, cacheEnd, visibleStart, visibleEnd，表格数据的索引值 |

## Methods

| 方法名 | 说明                            | 参数 |
| ------ | ------------------------------- | ---- |
| toggleColumn  | 显示/隐藏列 | index, show（show可选）    |
| setCurrentRow  | 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态 | row    |
| clearTooltip  | 隐藏tooltip | -    |

## Slots

|   name  | 说明           |
| ------- | -------------- |
| empty   | 无数据时的提示 |
| unknown   | 表格数据为null或者undefined时，自定义内容 |
| foot   | 表尾 |
| loading   | 定制动态加载表格行的内容，参数rowIndex |

