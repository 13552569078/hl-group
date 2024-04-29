# PageTable 表格面板


## 基本用法

:::demo-fs

page-table/basic

:::

## 多选操作

:::demo-fs

page-table/selection

:::

## 无数据

:::demo-fs

page-table/nodata

:::

## 无搜索工具

:::demo-fs

page-table/nosearchbar

:::


## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| table-props | 绑定到内部SimpleTable组件的属性，可选值参考SimpleTable组件 | object  | -  | -  |
| scrollbar-props | 绑定到内部Scrollbar组件的属性，可选值参考Scrollbar组件 | object | -- | -- |
| cols         | 列配置，参见下表                    | array  | -                          | -      |
| table-data   | 表格数据                    | object  | -     | -      |
| data-fetcher   | 表格查询方法               | function({ pageSize, currentPage, params, setTotal }) / string  | - | -      |
| search-items   | 搜索列表,参照hongluan-business-ui/data-filter|table-searchbar 数据过滤器 | object  | -  | -      |
| searcher   | 右侧input搜索输入框属性，可自定义name/placeholder | object  | -  | {name: 'searchName',placeholder: '请输入搜索条件'} |
| search-placement   | 搜索列表位置，不传的话根据搜索条件searchItems个数，不超过4个在顶部，超过4个在右侧 | string  | top/right  | - |
| selector-col-count   | 配合searchPlacement: top 使用，设置布局 | string  |  -  | 'count-xl-2 count-lg-2 count-md-1' |
| right-search-height   | 右边高级搜索的最大高度| string  | -   | 500px      |
| selection-actions   | 多选操作，参照hongluan-business-ui/simple-table-list/toolbar/action/actions 简单表格| array  | -   | -      |
| default-pagination   | 默认分页（假数据希望有分页数据，可以设置total）| object  |   -   |  { pageSize:10, currentPage:1, total: 0 } |
| no-data-image   | 无数据的默认图片 | string  |   -   |  - |
| show-col-config   | 是否显示列动态显示按钮 | boolean  |   true/false   |  true |
| show-search-bar   | 是否显示搜索工具 | boolean  |   true/false   |  true |

## cols

| 参数           | 说明                                       | 类型    | 可选值            | 默认值 |
| -------------- | ------------------------------------------ | ------- | ----------------- | ------ |
| prop           | 表格列属性名称                             | string  |                   |        |
| showTooltip    | 是否显示 tooltip，需要配合列 width 值使用  | boolean |                   | false  |
| tooltipProps   | tooltip 属性，参考 Popover 组件            | object  |                   |        |
| align          | 水平对齐方式                                   | string  | left/center/right | left   |
| width          | 列宽                                       | string  |                   | -      |
| fixed          | 固定列                                     | string  | left/right        | -      |
| slotName       | 列 slot 名称，参见下表   | string  | -                 | -      |
| headerSlotName | 列头 slot 名称，默认参数为 col，参见下表 | string  | -                 | -      |
| expand         | 展开列设置,目前固定slotName: "customExpand" | object{ slotName: string }  |  -  | -      |

## slotName
| 值           | 说明                                       |
| -------------- | ------------------------------------------ |
| tableIndex          | 序号                                   |
| tableSelection          | 多选插槽  |
| action          | 操作列  |
| <自定义>          | 除已用的'searchbar-suffix','searchbar-prefix', 'toolbar-extra-before','toolbar-extra-after','selectionCol', 'tableSelection', 'customExpand', 'tableIndex', 'action'这些，其他任意命名  |


## headerSlotName
| 值           | 说明                                       |
| -------------- | ------------------------------------------ |
| selectionCol          | 多选操作                                   |


## Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| selected-row-keys | 表格多选操作回调, 返回的是id数组 | keys |
| sort-change | 字段排序发生变更事件 | prop, sort|

## Methods
| 方法名称 | 说明 | 参数 |
|---------- |-------- |---------- |
| refresh | 用于列表操作后重新刷新列表，分页和参数保留 | - |
| reset | 用于重置当前列表，参数保留，currenPage重置为1 | - |

## Slots
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| customExpand   | 展开插槽，根据cols中slotName配合使用 | row |
| searchbar-prefix   | 搜索框左边插槽，可参照simple-table-list使用 | - |
| toolbar-extra-before   | 操作左边插槽，可参照simple-table-list使用 | - |
| toolbar-extra-after   | 操作右边插槽，可参照simple-table-list使用 | - |


