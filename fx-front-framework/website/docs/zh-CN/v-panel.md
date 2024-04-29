# Panel 大屏面板


## 基本用法

:::demo-fs-dark

v-panel/basic

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title         | 标题                   | string  | -                          | -      |
| body-height   | 内容区高度                    | string  | -     | -      |
| collapsable   | 操作条是否配置可展开操作                    | boolean  | -     | -      |
| sizes   | 操作条是否配置面板不同大小选项                   | string[]  | -     | -      |
| default-size   | 面板默认大小                   | string  | -     | -      |
| action-bar-dir   | 操作条位置                   | string[]  | left / right    | right    |

## Slots
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| -   | 默认内容插槽 | - |
| title   | 自定义标题 | - |
| action   | 自定义操作区域 | - |

## Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| size-change | 点击大小事件 | sizes中传入的值 |
| collapse-change | 展开收起事件 | boolean |

