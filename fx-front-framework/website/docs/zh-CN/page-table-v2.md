# PageTableV2 表格面板


## 基本用法

:::demo-fs

page-table-v2/basic

:::

## 多选操作

:::demo-fs

page-table-v2/selection

:::

## 单选操作

:::demo-fs

page-table-v2/selectionSingle

:::

## Tabs表格

:::demo-fs

page-table-v2/tabs

:::

## 自定义表格

保留搜索条件以及分页，自定义表格展现形式

:::demo-fs

page-table-v2/custom

:::

## 无数据

:::demo-fs

page-table-v2/nodata

:::

## 无搜索工具

:::demo-fs

page-table-v2/nosearchbar

:::


## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| table-props | 绑定到内部SimpleTable组件的属性，可选值参考SimpleTable组件 | object  | -  | -  |
| cols         | 列配置，参见下表                    | array  | -                          | -      |
| table-data   | 表格数据                    | object  | -     | -      |
| data-fetcher   | 表格查询方法               | function({ pageSize, currentPage, params, setTotal }) / string  | - | -      |
| search-items   | 搜索列表,参照hongluan-business-ui/data-filter|table-searchbar 数据过滤器 | object  | -  | -      |
| selection-actions   | 多选操作，参照hongluan-business-ui/simple-table-list/toolbar/action/actions 简单表格| array  | -   | -      |
| default-pagination   | 默认分页（假数据希望有分页数据，可以设置total）| object  |   -   |  { pageSize:10, currentPage:1, total: 0 } |
| no-data-image   | 无数据的默认图片 | string  |   -   |  - |
| show-tool-bar   | 是否显示工具栏 | boolean  |   true/false   |  true |
| tabs   | 多个表格Tab |  { label: string; name: string; default: boolean; }[] |   -   |  [] |
| show-adv-search   | 显示高级搜索 |  boolean |   -   |  true |
| is-multiple-select   | 是否多选模式 |  boolean |   -   |  true |

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
| <自定义>          | 除已用的'toolbar-extra-before','toolbar-extra-after','selectionCol', 'tableSelection', 'customExpand', 'tableIndex', 'action'这些，其他任意命名  |


## headerSlotName
| 值           | 说明                                       |
| -------------- | ------------------------------------------ |
| selectionCol          | 多选操作                                   |


## Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| selected-row-keys | 表格多选操作回调, 返回的是id数组 | keys |
| sort-change | 字段排序发生变更事件 | prop, sort|
| tab-change | Tab切换事件 | 当前Tab name|
| clear-tags | Tag标签的清除事件 | 返回值为TagItem[]|

## Methods
| 方法名称 | 说明 | 参数 |
|---------- |-------- |---------- |
| refresh | 用于列表操作后重新刷新列表，分页和参数保留 | - |
| reset | 用于重置当前列表，参数保留，currenPage重置为1 | - |
| setSeletedRowKeys | 用于手动设置「行」的选中状态；用于把表格作为选择工具时，回显已选的数据 | - |

## Slots
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| customExpand   | 展开插槽，根据cols中slotName配合使用 | row |
| toolbar-extra-before   | 操作左边插槽，可参照simple-table-list使用 | - |
| toolbar-extra-after   | 操作右边插槽，可参照simple-table-list使用 | - |
| header-top   | 表格工具栏上方插槽 | - |


