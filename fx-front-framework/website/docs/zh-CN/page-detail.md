# PageDetail 主页面表格详情组件

## 基本用法

:::demo-fs

page-detail/basic

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| detailOpt | 详情卡片配置项 |   PageDetailOption   |  PageDetailOption |

## detailOpt 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 详情卡片标题 | string  | string  | 基本信息  |
| imageOpt | 照片详情 | {show?: boolean title?: string list?: string[] }  | {show?: boolean title?: string list?: string[] }  |   |
| data | 数据 | Indexable  | Indexable  |   |
| cols | 列表项 | {label?: string key?: string slot?: string}  | {label?: string key?: string slot?: string}  |   |

